-- Remove the old name column and add first_name and last_name
ALTER TABLE profiles
DROP COLUMN IF EXISTS name;

ALTER TABLE profiles
ADD COLUMN first_name text,
ADD COLUMN last_name text;