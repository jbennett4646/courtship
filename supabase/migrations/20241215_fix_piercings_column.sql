-- First, make sure the column exists and has the correct type
DO $$ 
BEGIN
    -- Drop the column if it exists
    ALTER TABLE profiles DROP COLUMN IF EXISTS piercings;
    
    -- Create the column with the correct enum type
    ALTER TABLE profiles ADD COLUMN piercings piercings_enum;
    
    -- Set a default value for existing rows
    UPDATE profiles SET piercings = 'No'::piercings_enum WHERE piercings IS NULL;
END $$;