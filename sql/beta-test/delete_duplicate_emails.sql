-- Delete duplicate email entries from beta_applications table
-- Run this in Supabase Dashboard -> SQL Editor

-- Option 1: Delete all records (use with caution!)
-- DELETE FROM beta_applications;

-- Option 2: Delete specific email
-- Replace 'your-email@example.com' with the email you want to delete
DELETE FROM beta_applications 
WHERE email = 'your-email@example.com';

-- Option 3: Keep only the most recent entry for each email
-- This keeps the latest record for each email and deletes older duplicates
DELETE FROM beta_applications a
USING beta_applications b
WHERE a.email = b.email
  AND a.created_at < b.created_at;

-- Option 4: View all applications first (to see what you're deleting)
-- SELECT id, email, occupation, purpose, created_at 
-- FROM beta_applications 
-- ORDER BY created_at DESC;

-- Option 5: View duplicate emails only
-- SELECT email, COUNT(*) as count
-- FROM beta_applications
-- GROUP BY email
-- HAVING COUNT(*) > 1;

