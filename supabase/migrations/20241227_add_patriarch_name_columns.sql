-- Add patriarch name columns to profiles table
ALTER TABLE profiles
ADD COLUMN patriarch_name text,
ADD COLUMN family_name text;