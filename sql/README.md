# SQL Scripts

베타 테스트와 피드백 시스템용 SQL 스크립트를 분리하여 관리합니다.

## 디렉토리 구조

- `beta-test/` - 베타 테스트 신청 관련 SQL
- `feedback/` - 피드백 시스템 관련 SQL

## 베타 테스트 SQL

### `beta_applications_migration.sql`
베타 테스트 테이블(`beta_applications`)에 필요한 컬럼 추가:
- `nationality` (TEXT) - 사용자 국적
- `privacy_agreed` (BOOLEAN) - 개인정보 동의 여부  
- `privacy_agreed_at` (TIMESTAMP) - 개인정보 동의 시간

### `delete_duplicate_emails.sql`
중복 이메일 레코드 삭제용 스크립트

### `delete_test_email.sql`
특정 테스트 이메일 삭제용 스크립트

## 피드백 시스템 SQL

피드백 시스템 SQL은 별도로 관리됩니다. Supabase Dashboard의 기존 "SQL Feedbacks table with RLS and screenshot storage" 쿼리는 **건드리지 마세요**.

베타 테스트 SQL을 실행할 때는 **반드시 새로운 쿼리 탭**을 생성하여 실행하세요.

## 실행 방법

Supabase Dashboard → SQL Editor에서 각 SQL 파일을 실행하세요.

