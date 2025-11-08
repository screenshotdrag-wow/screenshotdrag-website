# Resend 설정 확인 체크리스트

## ✅ 확인 사항

### 1. Resend Dashboard에서 도메인 상태 확인
1. https://resend.com/dashboard 접속
2. **Domains** 메뉴 클릭
3. `capturedrag.com` 도메인 확인:
   - 상태가 **Verified** (초록색 체크)인지 확인
   - 상태가 **Pending**이면 DNS 레코드 전파를 기다려야 함
   - 상태가 **Failed**이면 DNS 레코드를 다시 확인해야 함

### 2. API 키 권한 확인
1. Resend Dashboard → **API Keys** 메뉴
2. 현재 사용 중인 API 키 확인:
   - **Permissions**가 **Full Access** 또는 **Send emails**인지 확인
   - 만료일 확인 (만료되지 않았는지)
3. 새로 발급받은 API 키가 올바르게 복사되었는지 확인

### 3. Supabase Secrets 확인
1. Supabase Dashboard → **Project Settings** → **Edge Functions** → **Secrets**
2. `RESEND_API_KEY` 확인:
   - 값이 올바른지 확인 (앞뒤 공백 없이)
   - 새로 발급받은 API 키와 일치하는지 확인
3. **Save** 버튼 클릭 (변경사항이 있다면)

### 4. Edge Function 코드 확인
현재 코드에서 `from` 주소:
```typescript
from: 'Capture Drag <noreply@capturedrag.com>'
```

이 주소가:
- ✅ 도메인 인증된 도메인(`capturedrag.com`)을 사용하는지
- ✅ `noreply@` 부분이 실제로 사용 가능한지 (Resend에서 확인)

### 5. Edge Function 재배포
1. Supabase Dashboard → **Edge Functions** → `send-beta-welcome-email`
2. 코드 확인 (최신 코드인지)
3. **Deploy** 버튼 클릭
4. 배포 완료 후 로그 확인

### 6. 테스트
1. 베타 테스트 폼 제출
2. 브라우저 콘솔(F12)에서 에러 확인
3. Supabase Dashboard → Edge Functions → Logs에서 에러 확인

## 🔍 일반적인 문제

### 문제 1: "Domain not verified"
**해결:**
- Resend Dashboard에서 도메인 상태 확인
- DNS 레코드가 올바르게 설정되었는지 확인
- DNS 전파 대기 (최대 48시간)

### 문제 2: "Invalid API key"
**해결:**
- Resend에서 새 API 키 발급
- Supabase Secrets에 정확히 복사/붙여넣기 (공백 주의)
- Edge Function 재배포

### 문제 3: "From address not allowed"
**해결:**
- `from` 주소가 인증된 도메인을 사용하는지 확인
- `noreply@capturedrag.com`이 실제로 사용 가능한지 Resend에서 확인
- 필요시 다른 주소 사용 (예: `hello@capturedrag.com`)

## 📝 참고

Resend Dashboard에서 확인할 수 있는 정보:
- 도메인 상태
- API 키 목록 및 권한
- 이메일 발송 로그
- 에러 메시지






