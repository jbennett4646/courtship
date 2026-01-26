-- Add wears_dresses column to profiles table
ALTER TABLE profiles ADD COLUMN wears_dresses text CHECK (wears_dresses IN ('Yes', 'No', 'Occasionally'));