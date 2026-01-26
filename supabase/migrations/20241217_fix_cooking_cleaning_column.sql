-- Drop the existing CHECK constraint first
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_enjoys_cooking_cleaning_check;

-- Change the column type to TEXT
ALTER TABLE profiles 
  ALTER COLUMN enjoys_cooking_cleaning TYPE TEXT,
  ADD CONSTRAINT profiles_enjoys_cooking_cleaning_check 
    CHECK (enjoys_cooking_cleaning IN ('Yes', 'No', 'I am willing to learn'));