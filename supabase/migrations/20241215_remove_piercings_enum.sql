-- First, convert the column to text to preserve existing data
ALTER TABLE profiles 
  ALTER COLUMN piercings TYPE text 
  USING piercings::text;

-- Drop all versions of the enum type that might exist
DROP TYPE IF EXISTS piercings_enum;
DROP TYPE IF EXISTS piercings_status;
DROP TYPE IF EXISTS piercing_status;