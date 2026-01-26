-- First, remove the existing physical_attributes column
ALTER TABLE profiles DROP COLUMN IF EXISTS physical_attributes;

-- Add new specific columns for physical attributes
ALTER TABLE profiles
ADD COLUMN eye_color text,
ADD COLUMN hair_color text,
ADD COLUMN distinctive_features text[];

-- Update existing profiles with sample data
UPDATE profiles
SET 
  eye_color = CASE 
    WHEN type = 'knight' THEN 'Blue'
    WHEN type = 'lady' THEN 'Hazel'
    ELSE 'Brown'
  END,
  hair_color = CASE 
    WHEN type = 'knight' THEN 'Dark'
    WHEN type = 'lady' THEN 'Auburn'
    ELSE 'Brown'
  END,
  distinctive_features = CASE 
    WHEN type = 'knight' THEN ARRAY['Chiseled jawline', 'Strong build', 'Noble bearing']
    WHEN type = 'lady' THEN ARRAY['Fair complexion', 'Graceful posture', 'Gentle demeanor']
    ELSE ARRAY['Pleasant appearance']
  END;

-- Create enum types for eye and hair colors to ensure data consistency
CREATE TYPE eye_color_enum AS ENUM (
  'Blue',
  'Green',
  'Brown',
  'Hazel',
  'Gray',
  'Other'
);

CREATE TYPE hair_color_enum AS ENUM (
  'Dark',
  'Brown',
  'Blonde',
  'Red',
  'Auburn',
  'Gray',
  'Other'
);

-- Convert columns to use enum types
ALTER TABLE profiles 
  ALTER COLUMN eye_color TYPE eye_color_enum 
  USING eye_color::eye_color_enum;

ALTER TABLE profiles 
  ALTER COLUMN hair_color TYPE hair_color_enum 
  USING hair_color::hair_color_enum;