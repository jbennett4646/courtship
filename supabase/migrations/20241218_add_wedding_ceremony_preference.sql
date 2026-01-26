-- Create enum type for wedding ceremony preferences
CREATE TYPE wedding_ceremony_type AS ENUM (
    'traditional_church_ceremony',
    'intimate_home_ceremony'
);

-- Add wedding_ceremony_preference column to profiles table
ALTER TABLE profiles 
ADD COLUMN wedding_ceremony_preference wedding_ceremony_type;

-- Add comment for documentation
COMMENT ON COLUMN profiles.wedding_ceremony_preference IS 'Preferred type of wedding ceremony (traditional church or intimate home ceremony)';