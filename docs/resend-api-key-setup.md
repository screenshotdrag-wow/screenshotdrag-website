# RESEND_API_KEY 설정 가이드

## 문제: 이메일 발송 실패 (Status: 500)

### 1단계: Resend API 키 발급

1. **Resend Dashboard 접속**
   - https://resend.com/dashboard 접속
   - 로그인 또는 회원가입

2. **API Keys 생성**
   - 왼쪽 메뉴 → **API Keys** 클릭
   - **Create API Key** 버튼 클릭
   - 이름 입력 (예: "Capture Drag Beta Test")
   - 권한 선택 (필요한 권한만)
   - **Create** 클릭
   - **⚠️ 중요: API 키를 복사해두세요! (한 번만 표시됩니다)**

### 2단계: Supabase에 API 키 설정

**방법 1: Supabase Dashboard 사용**
1. Supabase Dashboard 접속
2. 왼쪽 메뉴 → **Project Settings** 클릭
3. **Edge Functions** → **Secrets** 탭 선택
4. **Add new secret** 버튼 클릭
5. Name: `RESEND_API_KEY`
6. Value: Resend에서 복사한 API 키 붙여넣기
7. **Save** 클릭

**방법 2: Supabase CLI 사용 (선택사항)**
```bash
# Supabase CLI로 설정
supabase secrets set RESEND_API_KEY=your_resend_api_key_here
```

### 3단계: Edge Function 재배포 (필요한 경우)

API 키를 설정한 후 Edge Function이 자동으로 재시작되지만, 문제가 있으면:
1. Edge Functions → `send-beta-welcome-email` 클릭
2. **Deploy** 또는 **Redeploy** 클릭

### 4단계: 테스트

1. 페이지 새로고침
2. 베타 테스트 폼 제출
3. 브라우저 콘솔 확인:
   - ✅ `Welcome email sent successfully` → 성공
   - ❌ `Failed to send welcome email` → 다시 확인

### 5단계: Edge Function 로그 확인

문제가 계속되면:
1. Edge Functions → `send-beta-welcome-email` → **Logs** 탭
2. 최근 로그 확인:
   - `RESEND_API_KEY is not set` → API 키 미설정
   - `Email sending failed` → Resend API 에러
   - 기타 에러 메시지 확인

### 주의사항

- **API 키는 절대 공개하지 마세요!**
- **GitHub에 커밋하지 마세요!**
- **Supabase Secrets에만 저장하세요!**

### 현재 이메일 설정

- **From:** `onboarding@resend.dev` (테스트용)
- **프로덕션:** `noreply@capturedrag.com` (도메인 인증 필요)






