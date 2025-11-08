# 이메일 발송 문제 해결 가이드

## 문제: 베타 테스트 폼 제출 후 환영 이메일이 오지 않음

### 1단계: 브라우저 콘솔 확인

1. 브라우저 개발자 도구 열기 (F12)
2. Console 탭 선택
3. 베타 테스트 폼 제출
4. 다음 메시지 확인:

**✅ 성공 메시지:**
```
Welcome email sent successfully: {id: "...", ...}
```

**❌ 에러 메시지:**
- `Failed to send welcome email. Status: 404` → Edge Function 미배포
- `Failed to send welcome email. Status: 500` → RESEND_API_KEY 미설정
- `Error sending welcome email:` → 네트워크 에러

### 2단계: Edge Function 배포 확인

**Supabase Dashboard에서 확인:**
1. Supabase Dashboard 접속
2. 왼쪽 메뉴 → **Edge Functions** 클릭
3. `send-beta-welcome-email` 함수가 있는지 확인
4. 없으면 배포 필요

**배포 방법 (Supabase CLI 사용):**
```bash
# Supabase CLI 설치 (없는 경우)
npm install -g supabase

# 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref gxavjkdewqfxacxabyoj

# Edge Function 배포
supabase functions deploy send-beta-welcome-email
```

### 3단계: RESEND_API_KEY 설정 확인

**Supabase Dashboard에서 확인:**
1. Supabase Dashboard 접속
2. 왼쪽 메뉴 → **Project Settings** 클릭
3. **Edge Functions** → **Secrets** 탭 선택
4. `RESEND_API_KEY`가 있는지 확인

**설정 방법:**
```bash
# Supabase CLI로 설정
supabase secrets set RESEND_API_KEY=your_resend_api_key_here
```

또는

**Supabase Dashboard에서:**
1. Project Settings → Edge Functions → Secrets
2. "Add new secret" 클릭
3. Name: `RESEND_API_KEY`
4. Value: Resend에서 발급받은 API 키 입력
5. Save

### 4단계: Edge Function 로그 확인

**Supabase Dashboard에서:**
1. Edge Functions → `send-beta-welcome-email` 클릭
2. **Logs** 탭 선택
3. 최근 로그 확인
4. 에러 메시지 확인

**예상 에러:**
- `RESEND_API_KEY is not set` → API 키 미설정
- `Email sending failed` → Resend API 에러
- `Domain not verified` → 도메인 미인증 (현재는 `onboarding@resend.dev` 사용 중)

### 5단계: Resend 도메인 확인

**현재 설정:**
- From: `onboarding@resend.dev` (테스트용)
- 프로덕션에서는 `noreply@capturedrag.com` 사용 예정

**Resend Dashboard에서 확인:**
1. https://resend.com/dashboard 접속
2. **Domains** 확인
3. 도메인 인증 상태 확인

### 해결 방법 요약

1. **Edge Function 미배포:**
   - `supabase functions deploy send-beta-welcome-email` 실행

2. **RESEND_API_KEY 미설정:**
   - Supabase Dashboard → Project Settings → Edge Functions → Secrets
   - `RESEND_API_KEY` 추가

3. **도메인 미인증:**
   - 현재는 `onboarding@resend.dev` 사용 (인증 불필요)
   - 프로덕션에서는 `capturedrag.com` 도메인 인증 필요

### 테스트

1. 페이지 새로고침
2. 베타 테스트 폼 제출
3. 브라우저 콘솔에서 성공 메시지 확인
4. 이메일 수신 확인 (스팸함도 확인)






