-- ============================================
-- Beta Test: Delete Specific Test Email
-- ============================================
-- Purpose: Safely delete a specific email from beta_applications table
-- Table: beta_applications
-- 
-- IMPORTANT: This is ONLY for beta test system.
-- Do NOT mix with feedback system SQL.
-- ============================================
-- Run this in Supabase Dashboard -> SQL Editor
-- Use a NEW query tab (separate from feedback system queries)

-- 1단계: 먼저 삭제할 레코드 확인 (반드시 실행해보세요!)
SELECT id, email, occupation, purpose, created_at 
FROM beta_applications 
WHERE email = 'caelitus22@naver.com'
ORDER BY created_at DESC;

-- 2단계: 확인 후 삭제 실행
-- 위 쿼리 결과가 맞는지 확인한 후 아래 주석을 해제하고 실행하세요
-- DELETE FROM beta_applications 
-- WHERE email = 'caelitus22@naver.com';

-- 또는 모든 테스트 레코드 삭제 (주의: 모든 데이터가 삭제됩니다!)
-- DELETE FROM beta_applications;

-- 삭제 후 확인
-- SELECT COUNT(*) FROM beta_applications;

