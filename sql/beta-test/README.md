# Beta Test SQL Scripts

베타 테스트 신청 시스템 전용 SQL 스크립트입니다.

## ⚠️ 중요

**이 SQL은 베타 테스트 시스템 전용입니다.**
**피드백 시스템 SQL과 섞이지 않도록 주의하세요.**

## 파일 목록

### `beta_applications_migration.sql`
베타 테스트 테이블(`beta_applications`)에 필요한 컬럼 추가:
- `nationality` (TEXT) - 사용자 국적
- `privacy_agreed` (BOOLEAN) - 개인정보 동의 여부
- `privacy_agreed_at` (TIMESTAMP) - 개인정보 동의 시간

### `delete_duplicate_emails.sql`
중복 이메일 레코드 삭제용 스크립트

### `delete_test_email.sql`
특정 테스트 이메일 삭제용 스크립트

## 실행 방법

1. Supabase Dashboard → SQL Editor 접속
2. **새 쿼리 탭 생성** (기존 피드백 시스템 쿼리와 분리)
3. 각 SQL 파일의 내용을 복사하여 실행

## 테이블 구조

### beta_applications
베타 테스트 신청자 정보를 저장하는 테이블입니다.

**주요 컬럼:**
- `email` (TEXT, UNIQUE) - 이메일 주소
- `occupation` (TEXT) - 직업
- `purpose` (TEXT) - 사용 목적
- `nationality` (TEXT) - 국적
- `privacy_agreed` (BOOLEAN) - 개인정보 동의 여부
- `privacy_agreed_at` (TIMESTAMP) - 개인정보 동의 시간
- `created_at` (TIMESTAMP) - 신청 시간

## 주의사항

- 피드백 시스템 SQL과 별도로 관리하세요
- 프로덕션 환경에서는 신중하게 실행하세요
- 테스트 후에는 반드시 검증 쿼리를 실행하세요

