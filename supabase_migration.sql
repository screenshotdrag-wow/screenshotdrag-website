-- Add nationality column to beta_applications table
-- Run this SQL in Supabase Dashboard -> SQL Editor

ALTER TABLE beta_applications 
ADD COLUMN IF NOT EXISTS nationality TEXT;

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'beta_applications'
AND column_name = 'nationality';

