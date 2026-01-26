ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_type_check;

ALTER TABLE profiles 
ADD CONSTRAINT profiles_type_check 
CHECK (type = ANY (ARRAY['knight'::text, 'lady'::text, 'patriarch'::text]));