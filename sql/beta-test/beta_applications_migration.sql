-- ============================================
-- Beta Test Applications Table Migration
-- ============================================
-- Purpose: Add missing columns to beta_applications table for beta test registration
-- Table: beta_applications
-- 
-- IMPORTANT: This is ONLY for beta test system.
-- Do NOT mix with feedback system SQL.
-- ============================================

-- Add nationality column
-- Stores user's nationality/country for beta test participation
ALTER TABLE beta_applications 
ADD COLUMN IF NOT EXISTS nationality TEXT;

-- Add privacy_agreed column
-- Boolean flag indicating if user agreed to privacy policy
ALTER TABLE beta_applications 
ADD COLUMN IF NOT EXISTS privacy_agreed BOOLEAN DEFAULT false;

-- Add privacy_agreed_at column
-- Timestamp when user agreed to privacy policy
ALTER TABLE beta_applications 
ADD COLUMN IF NOT EXISTS privacy_agreed_at TIMESTAMP WITH TIME ZONE;

-- ============================================
-- Verification Query
-- ============================================
-- Run this to verify the columns were added successfully
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'beta_applications'
  AND column_name IN ('nationality', 'privacy_agreed', 'privacy_agreed_at')
ORDER BY column_name;

