/*
  # Fix ambiguous quotation_number column reference

  1. Problem
    - The set_quotation_number trigger function has an ambiguous column reference
    - This causes errors when creating new quotations

  2. Solution
    - Drop and recreate the trigger function with proper column qualification
    - Use NEW.quotation_number to explicitly reference the table column
    - Ensure no variable naming conflicts

  3. Changes
    - Fix the set_quotation_number function to properly qualify column references
    - Maintain the auto-increment functionality for quotation numbers
*/

-- Drop the existing function to recreate it properly
DROP FUNCTION IF EXISTS set_quotation_number() CASCADE;

-- Create the corrected function with proper column qualification
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
                    WHEN q.quotation_number ~ '^QT[0-9]+$' 
                    THEN CAST(SUBSTRING(q.quotation_number FROM 3) AS INTEGER)
                    ELSE 0
                END
            ), 0
        ) + 1
        INTO next_number
        FROM quotations q
        WHERE q.created_by = NEW.created_by;
        
        -- Format the quotation number as QT001, QT002, etc.
        new_quotation_number := 'QT' || LPAD(next_number::TEXT, 3, '0');
        
        -- Set the quotation_number on the NEW record
        NEW.quotation_number := new_quotation_number;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
DROP TRIGGER IF EXISTS trigger_set_quotation_number ON quotations;

CREATE TRIGGER trigger_set_quotation_number
    BEFORE INSERT ON quotations
    FOR EACH ROW
    EXECUTE FUNCTION set_quotation_number();