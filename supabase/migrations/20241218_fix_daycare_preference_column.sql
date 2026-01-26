-- First drop the existing column if it exists
ALTER TABLE profiles DROP COLUMN IF EXISTS daycare_preference;

-- Then recreate it with the correct type
ALTER TABLE profiles ADD COLUMN daycare_preference text;

-- Add a comment explaining the column
COMMENT ON COLUMN profiles.daycare_preference IS 'User preference regarding using daycare services for children';