/*
  # Fix ambiguous quotation_number reference in database function

  1. Changes
    - Drop existing trigger first to remove dependency
    - Drop and recreate the quotation numbering function with proper column qualification
    - Recreate trigger for new quotations

  2. Function Updates
    - Use proper table aliases to avoid ambiguous column references
    - Qualify all column references with NEW. or table alias
    - Maintain existing quotation number format logic

  3. Notes
    - This fixes the "column reference 'quotation_number' is ambiguous" error
    - Preserves existing quotation numbering logic
*/

-- Drop existing trigger first to remove dependency
DROP TRIGGER IF EXISTS trigger_set_quotation_number ON quotations;

-- Now safely drop the function
DROP FUNCTION IF EXISTS set_quotation_number();

-- Recreate the function with proper column qualification
CREATE OR REPLACE FUNCTION set_quotation_number()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
    new_quotation_number TEXT;
BEGIN
    -- Only set quotation_number if it's not already provided
    IF NEW.quotation_number IS NULL OR NEW.quotation_number = '' THEN
        -- Get the next quotation number by finding the highest existing number
        SELECT COALESCE(
            MAX(
                CASE 
                    WHEN q.quotation_number ~ '^QUO-[0-9]+$' 
                    THEN CAST(SUBSTRING(q.quotation_number FROM 5) AS INTEGER)
                    ELSE 0
                END
            ), 0
        ) + 1
        INTO next_number
        FROM quotations q
        WHERE q.created_by = NEW.created_by;
        
        -- Format the quotation number
        new_quotation_number := 'QUO-' || LPAD(next_number::TEXT, 4, '0');
        
        -- Set the quotation number on the new row
        NEW.quotation_number := new_quotation_number;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
CREATE TRIGGER trigger_set_quotation_number
    BEFORE INSERT ON quotations
    FOR EACH ROW
    EXECUTE FUNCTION set_quotation_number();