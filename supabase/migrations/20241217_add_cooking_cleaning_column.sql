-- Create a new migration file
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE profiles
ADD COLUMN enjoys_cooking_cleaning VARCHAR(255) CHECK (enjoys_cooking_cleaning IN ('Yes', 'No', 'I am willing to learn'));

-- Add comment for the new column
COMMENT ON COLUMN profiles.enjoys_cooking_cleaning IS 'Indicates whether the user enjoys cooking and cleaning activities';