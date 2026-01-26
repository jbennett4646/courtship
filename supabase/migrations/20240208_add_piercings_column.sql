-- Create enum type for piercings
CREATE TYPE piercing_status AS ENUM ('none', 'modest', 'multiple');

-- Add piercings column to profiles table
ALTER TABLE profiles 
ADD COLUMN piercings piercing_status DEFAULT 'none';

-- Add comment to describe the column
COMMENT ON COLUMN profiles.piercings IS 'Indicates the person''s piercing status: none (no piercings), modest (ears only), or multiple (various piercings)';