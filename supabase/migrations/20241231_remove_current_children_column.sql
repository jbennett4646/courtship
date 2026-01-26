-- Remove the current_children column as it's replaced by sons_count and daughters_count
ALTER TABLE profiles DROP COLUMN IF EXISTS current_children;