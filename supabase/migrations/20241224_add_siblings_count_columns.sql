-- Add new columns for brothers and sisters count
ALTER TABLE profiles
ADD COLUMN brothers_count INTEGER DEFAULT 0,
ADD COLUMN sisters_count INTEGER DEFAULT 0;

-- Update existing profiles with random values between 0 and 5 for both columns
UPDATE profiles 
SET 
    brothers_count = floor(random() * 6),
    sisters_count = floor(random() * 6)
WHERE brothers_count IS NULL OR sisters_count IS NULL;

-- Add check constraints to ensure non-negative values
ALTER TABLE profiles
ADD CONSTRAINT brothers_count_non_negative CHECK (brothers_count >= 0),
ADD CONSTRAINT sisters_count_non_negative CHECK (sisters_count >= 0);