-- Create a new migration file
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- First, drop the column if it exists to ensure clean state
ALTER TABLE profiles DROP COLUMN IF EXISTS work_preference;

-- Add the work_preference column with proper type and constraints
ALTER TABLE profiles
ADD COLUMN work_preference text CHECK (
    work_preference IN (
        'I believe a woman''s primary calling is to care for her home and family, and I prefer not to work outside the home',
        'I am open to working outside the home if it supports my family or husband''s leadership',
        'I believe women should have the freedom to pursue a career or work outside the home as they choose'
    )
);

-- Add comment for the new column
COMMENT ON COLUMN profiles.work_preference IS 'Indicates the user''s preference regarding work outside the home';

-- Update existing lady profiles with default values (optional)
UPDATE profiles 
SET work_preference = 'I believe a woman''s primary calling is to care for her home and family, and I prefer not to work outside the home'
WHERE type = 'lady' AND work_preference IS NULL;