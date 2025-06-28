/*
  # Fix quotation numbering system with format #QT0101A

  1. Changes
    - Drop existing trigger and function safely
    - Create new quotation numbering function
    - Migrate existing quotations to new format
    - Re-create trigger for new quotations

  2. Quotation Number Format
    - #QT = prefix
    - 0101 = customer number (4 digits, starting from 0101)
    - A = quotation sequence for that customer (A, B, C, etc.)

  3. Migration Strategy
    - Temporarily remove unique constraint
    - Assign customer numbers based on first quotation date
    - Process quotations in order to assign proper sequence letters
    - Restore unique constraint
*/

-- Drop existing trigger first to remove dependency
DROP TRIGGER IF EXISTS trigger_set_quotation_number ON quotations;

-- Now safely drop the function
DROP FUNCTION IF EXISTS set_quotation_number();

-- Temporarily drop the unique constraint to allow migration
ALTER TABLE quotations DROP CONSTRAINT IF EXISTS quotations_quotation_number_key;

-- Create function to get next quotation number for a customer
CREATE OR REPLACE FUNCTION get_next_quotation_number(customer_uuid uuid)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
    customer_number text;
    quotation_count integer;
    sequence_letter text;
    quotation_number text;
    max_customer_num integer;
BEGIN
    -- If no customer provided, generate a simple sequential number
    IF customer_uuid IS NULL THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(quotation_number FROM 4 FOR 4) AS integer)), 100) + 1
        INTO max_customer_num
        FROM quotations
        WHERE quotation_number ~ '^#QT[0-9]{4}[A-Z]+$';
        
        RETURN '#QT' || LPAD(max_customer_num::text, 4, '0') || 'A';
    END IF;

    -- Check if customer already has a number assigned
    SELECT SUBSTRING(quotation_number FROM 4 FOR 4)
    INTO customer_number
    FROM quotations 
    WHERE customer_id = customer_uuid 
    AND quotation_number ~ '^#QT[0-9]{4}[A-Z]+$'
    LIMIT 1;

    -- If customer doesn't have a number, assign the next available one
    IF customer_number IS NULL THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(quotation_number FROM 4 FOR 4) AS integer)), 100) + 1
        INTO max_customer_num
        FROM quotations
        WHERE quotation_number ~ '^#QT[0-9]{4}[A-Z]+$';
        
        customer_number := LPAD(max_customer_num::text, 4, '0');
    END IF;

    -- Count existing quotations for this customer with new format
    SELECT COUNT(*)
    INTO quotation_count
    FROM quotations
    WHERE customer_id = customer_uuid
    AND quotation_number ~ '^#QT[0-9]{4}[A-Z]+$';

    -- Convert count to letter (A=0, B=1, C=2, etc.)
    IF quotation_count >= 26 THEN
        -- For more than 26 quotations, use AA, AB, AC, etc.
        sequence_letter := CHR(65 + (quotation_count / 26) - 1) || CHR(65 + (quotation_count % 26));
    ELSE
        sequence_letter := CHR(65 + quotation_count);
    END IF;

    -- Construct final quotation number
    quotation_number := '#QT' || customer_number || sequence_letter;

    RETURN quotation_number;
END;
$$;

-- Create new trigger function to set quotation number
CREATE OR REPLACE FUNCTION set_quotation_number()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    -- Only set quotation number if it's not already provided or is empty
    IF NEW.quotation_number IS NULL OR NEW.quotation_number = '' THEN
        NEW.quotation_number := get_next_quotation_number(NEW.customer_id);
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create a temporary table to track customer number assignments during migration
CREATE TEMP TABLE customer_number_mapping (
    customer_id uuid PRIMARY KEY,
    customer_number text NOT NULL,
    quotation_count integer DEFAULT 0
);

-- Migrate existing quotations to new numbering format
DO $$
DECLARE
    quotation_record RECORD;
    new_number text;
    customer_num text;
    sequence_letter text;
    current_quotation_count integer;
    next_customer_number integer := 101; -- Start from 0101
BEGIN
    -- First, identify all unique customers and assign them numbers
    INSERT INTO customer_number_mapping (customer_id, customer_number)
    SELECT DISTINCT 
        customer_id,
        LPAD((ROW_NUMBER() OVER (ORDER BY MIN(created_at)) + 100)::text, 4, '0')
    FROM quotations 
    WHERE customer_id IS NOT NULL
    AND quotation_number !~ '^#QT[0-9]{4}[A-Z]+$'
    GROUP BY customer_id;

    -- Now process each quotation and assign new numbers
    FOR quotation_record IN 
        SELECT id, customer_id, quotation_number, created_at
        FROM quotations 
        WHERE quotation_number !~ '^#QT[0-9]{4}[A-Z]+$'
        ORDER BY customer_id, created_at
    LOOP
        IF quotation_record.customer_id IS NOT NULL THEN
            -- Get customer number from mapping
            SELECT customer_number INTO customer_num
            FROM customer_number_mapping
            WHERE customer_id = quotation_record.customer_id;
            
            -- Get current quotation count for this customer and increment
            UPDATE customer_number_mapping 
            SET quotation_count = quotation_count + 1
            WHERE customer_id = quotation_record.customer_id;
            
            -- Get the updated count
            SELECT quotation_count INTO current_quotation_count
            FROM customer_number_mapping
            WHERE customer_id = quotation_record.customer_id;
            
            -- Generate sequence letter (A=1, B=2, etc.)
            IF current_quotation_count > 26 THEN
                sequence_letter := CHR(65 + ((current_quotation_count - 1) / 26) - 1) || CHR(65 + ((current_quotation_count - 1) % 26));
            ELSE
                sequence_letter := CHR(65 + current_quotation_count - 1);
            END IF;
            
            new_number := '#QT' || customer_num || sequence_letter;
        ELSE
            -- Handle quotations without customer (use sequential numbering)
            new_number := '#QT' || LPAD(next_customer_number::text, 4, '0') || 'A';
            next_customer_number := next_customer_number + 1;
        END IF;
        
        -- Update the quotation with new number
        UPDATE quotations 
        SET quotation_number = new_number 
        WHERE id = quotation_record.id;
    END LOOP;
END $$;

-- Drop the temporary table
DROP TABLE customer_number_mapping;

-- Re-create the unique constraint
ALTER TABLE quotations ADD CONSTRAINT quotations_quotation_number_key UNIQUE (quotation_number);

-- Create trigger to automatically set quotation number for new quotations
CREATE TRIGGER trigger_set_quotation_number
    BEFORE INSERT ON quotations
    FOR EACH ROW
    EXECUTE FUNCTION set_quotation_number();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_quotations_number ON quotations USING btree (quotation_number);