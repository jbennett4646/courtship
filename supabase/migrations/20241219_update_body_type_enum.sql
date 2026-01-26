-- First, make sure we drop any existing enum type
DROP TYPE IF EXISTS body_type_enum CASCADE;

-- Create the new enum type with all values including "Obese"
CREATE TYPE body_type_enum AS ENUM (
  'Athletic and strong',
  'Broad-shouldered and fit',
  'Graceful and feminine',
  'Petite and elegant',
  'Tall and athletic',
  'Average build',
  'Obese'
);

-- Add or update the body_type column to use the new enum
ALTER TABLE profiles 
  ALTER COLUMN body_type TYPE body_type_enum 
  USING body_type::body_type_enum;