-- Add new columns for traditional values and physical attributes
ALTER TABLE profiles
ADD COLUMN traditional_values text[] DEFAULT '{}',
ADD COLUMN height text,
ADD COLUMN body_type text,
ADD COLUMN physical_attributes text[] DEFAULT '{}';

-- Update existing profiles with sample data
UPDATE profiles
SET 
  traditional_values = CASE 
    WHEN type = 'knight' THEN ARRAY['Male leadership in household', 'Traditional marriage values', 'Family-first mindset']
    WHEN type = 'lady' THEN ARRAY['Biblical womanhood', 'Submissive to husband''s leadership', 'Home-centered life']
  END,
  height = CASE 
    WHEN type = 'knight' THEN '6''2"'
    WHEN type = 'lady' THEN '5''6"'
  END,
  body_type = CASE 
    WHEN type = 'knight' THEN 'Athletic and strong'
    WHEN type = 'lady' THEN 'Graceful and feminine'
  END,
  physical_attributes = CASE 
    WHEN type = 'knight' THEN ARRAY['Chiseled jawline', 'Dark hair', 'Blue eyes']
    WHEN type = 'lady' THEN ARRAY['Long auburn hair', 'Hazel eyes', 'Fair complexion']
  END;

-- Add row level security policies for the new columns
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create an enum type for body types if you want to restrict the values
CREATE TYPE body_type_enum AS ENUM (
  'Athletic and strong',
  'Broad-shouldered and fit',
  'Graceful and feminine',
  'Petite and elegant',
  'Tall and athletic',
  'Average build'
);

-- Add constraint to the body_type column (optional)
ALTER TABLE profiles 
  ALTER COLUMN body_type TYPE body_type_enum 
  USING body_type::body_type_enum;