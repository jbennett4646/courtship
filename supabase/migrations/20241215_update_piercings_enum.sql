-- First, make sure we drop any existing enum types
DROP TYPE IF EXISTS piercings_enum CASCADE;
DROP TYPE IF EXISTS piercings_status CASCADE;
DROP TYPE IF EXISTS piercing_status CASCADE;

-- Create the new enum type with exact specified values
CREATE TYPE piercings_enum AS ENUM ('Yes, ears only', 'Yes, multiple', 'No');

-- Convert the column to use the new enum type
ALTER TABLE profiles 
  ALTER COLUMN piercings TYPE piercings_enum 
  USING piercings::piercings_enum;