# 이메일 발송 문제 해결 체크리스트

## 1단계: 브라우저 콘솔 확인

1. **브라우저 개발자 도구 열기** (F12)
2. **Console 탭** 선택
3. **베타 테스트 폼 제출**
4. **콘솔 메시지 확인:**

### ✅ 성공 메시지:
```
Welcome email sent successfully: {id: "...", ...}
```

### ❌ 에러 메시지 확인:
- `Failed to send welcome email. Status: 404` → Edge Function 미배포
- `Failed to send welcome email. Status: 500` → RESEND_API_KEY 미설정 또는 Resend API 에러
- `Error sending welcome email:` → 네트워크 에러

## 2단계: Supabase Dashboard 확인

### A. RESEND_API_KEY 설정 확인
1. Supabase Dashboard → **Project Settings**
2. **Edge Functions** → **Secrets** 탭
3. `RESEND_API_KEY`가 있는지 확인
4. **없으면 추가:**
   - **Add new secret** 클릭
   - Name: `RESEND_API_KEY`
   - Value: Resend에서 발급받은 API 키
   - **Save** 클릭

### B. Edge Function 로그 확인
1. Supabase Dashboard → **Edge Functions**
2. `send-beta-welcome-email` 함수 클릭
3. **Logs** 탭 선택
4. 최근 로그 확인:
   - `RESEND_API_KEY is not set` → API 키 미설정
   - `Email sending failed` → Resend API 에러
   - 기타 에러 메시지 확인

## 3단계: Resend API 키 발급 확인

1. **Resend Dashboard 접속**: https://resend.com/dashboard
2. **API Keys** 확인
3. API 키가 활성화되어 있는지 확인
4. 필요시 새 API 키 발급

## 4단계: 테스트

1. 페이지 새로고침 (Ctrl+Shift+R)
2. 베타 테스트 폼 제출
3. 콘솔에서 성공 메시지 확인
4. 이메일 수신 확인 (스팸함도 확인)

## 빠른 확인 방법

**브라우저 콘솔에서 다음 명령어 실행:**
```javascript
// Edge Function 호출 테스트
fetch('https://gxavjkdewqfxacxabyoj.supabase.co/functions/v1/send-beta-welcome-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <SUPABASE_ANON_KEY>'
  },
  body: JSON.stringify({ email: 'test@example.com' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

## 일반적인 문제 해결

### 문제 1: Status 500 에러
**원인:** RESEND_API_KEY 미설정
**해결:** Supabase Dashboard → Project Settings → Edge Functions → Secrets에 추가

### 문제 2: Status 404 에러
**원인:** Edge Function 미배포
**해결:** Supabase Dashboard → Edge Functions → Deploy

### 문제 3: 이메일은 발송되었지만 수신 안 됨
**원인:** 스팸함에 있거나 Resend 도메인 미인증
**해결:** 
- 스팸함 확인
- Resend Dashboard에서 발송 로그 확인
- 현재는 `onboarding@resend.dev` 사용 중 (인증 불필요)






