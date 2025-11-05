-- Add missing columns to beta_applications table
-- Run this SQL in Supabase Dashboard -> SQL Editor

-- Add nationality column
ALTER TABLE beta_applications 
ADD COLUMN IF NOT EXISTS nationality TEXT;

-- Add privacy_agreed column
ALTER TABLE beta_applications 
ADD COLUMN IF NOT EXISTS privacy_agreed BOOLEAN DEFAULT false;

-- Add privacy_agreed_at column (timestamp)
ALTER TABLE beta_applications 
ADD COLUMN IF NOT EXISTS privacy_agreed_at TIMESTAMP WITH TIME ZONE;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'beta_applications'
AND column_name IN ('nationality', 'privacy_agreed', 'privacy_agreed_at')
ORDER BY column_name;

