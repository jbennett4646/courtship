-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Add user_id column if it doesn't exist
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create new policies
CREATE POLICY "Profiles are viewable by everyone"
ON profiles FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);