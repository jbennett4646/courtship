-- Add skills column to profiles table
ALTER TABLE profiles
ADD COLUMN skills text[] DEFAULT '{}';

-- Update RLS policies to include the new column
CREATE POLICY "Users can update their own skills"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);