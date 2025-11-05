-- ============================================
-- Beta Test: RLS Policy for DELETE Operations
-- ============================================
-- Purpose: Allow DELETE operations for beta_applications table
-- Table: beta_applications
-- 
-- IMPORTANT: This is ONLY for beta test system.
-- Do NOT mix with feedback system SQL.
-- ============================================
-- Run this in Supabase Dashboard -> SQL Editor
-- Use a NEW query tab (separate from feedback system queries)

-- ============================================
-- Step 1: Check current RLS policies
-- ============================================
-- Run this first to see existing policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'beta_applications'
ORDER BY policyname;

-- ============================================
-- Step 2: Create DELETE policy (if needed)
-- ============================================
-- This allows anonymous users to delete their own records
-- Note: This is for beta testing only. In production, you may want to restrict this.

-- Option 1: Allow DELETE for any record (for beta testing only)
-- WARNING: This allows anyone to delete any record!
DROP POLICY IF EXISTS "Allow DELETE for beta testing" ON beta_applications;

CREATE POLICY "Allow DELETE for beta testing"
ON beta_applications
FOR DELETE
TO anon, authenticated
USING (true);

-- Option 2: Allow DELETE only for records matching the current user's email
-- This is more secure but requires knowing the email in advance
-- DROP POLICY IF EXISTS "Allow DELETE own records" ON beta_applications;
-- 
-- CREATE POLICY "Allow DELETE own records"
-- ON beta_applications
-- FOR DELETE
-- TO anon, authenticated
-- USING (true); -- Allow if email matches (you may need to adjust this based on your auth setup)

-- ============================================
-- Step 3: Verify the policy was created
-- ============================================
-- Run this to verify the DELETE policy exists
SELECT 
    policyname,
    cmd,
    roles
FROM pg_policies
WHERE tablename = 'beta_applications'
AND cmd = 'DELETE';

-- ============================================
-- Notes:
-- ============================================
-- 1. This policy allows DELETE operations for beta testing
-- 2. In production, you may want to restrict DELETE to authenticated users only
-- 3. Consider adding a condition to only allow DELETE of recent records (e.g., created within last 24 hours)
-- 4. After beta testing, you may want to remove or restrict this policy

