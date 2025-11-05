# Resend 도메인 인증 가이드

## 문제
현재 Resend는 테스트 모드로 작동하고 있어서, 자신의 이메일 주소(`screenshotdrag@gmail.com`)로만 이메일을 보낼 수 있습니다.

## 해결 방법: 도메인 인증

베타 테스터들에게 이메일을 보내려면 `capturedrag.com` 도메인을 Resend에서 인증해야 합니다.

### 1단계: Resend Dashboard 접속
1. https://resend.com/dashboard 접속
2. 로그인

### 2단계: 도메인 추가
1. 좌측 메뉴에서 **Domains** 클릭
2. **Add Domain** 버튼 클릭
3. `capturedrag.com` 입력하고 **Add** 클릭

### 3단계: DNS 레코드 설정
Resend에서 제공하는 DNS 레코드를 추가해야 합니다:

#### 일반적으로 필요한 DNS 레코드:
1. **TXT 레코드** (도메인 인증용)
   - Name: `@` 또는 `capturedrag.com`
   - Value: Resend에서 제공하는 인증 값

2. **SPF 레코드** (이메일 발신 인증)
   - Type: TXT
   - Name: `@`
   - Value: `v=spf1 include:resend.com ~all`

3. **DKIM 레코드** (이메일 서명)
   - Type: TXT
   - Name: Resend에서 제공하는 DKIM 이름 (예: `resend._domainkey`)
   - Value: Resend에서 제공하는 DKIM 값

4. **DMARC 레코드** (선택사항, 권장)
   - Type: TXT
   - Name: `_dmarc`
   - Value: `v=DMARC1; p=none; rua=mailto:screenshotdrag@gmail.com`

### 4단계: DNS 레코드 확인
1. 도메인 관리자(예: GoDaddy, Namecheap, Cloudflare 등)에 접속
2. DNS 설정 페이지로 이동
3. Resend에서 제공한 레코드들을 모두 추가
4. DNS 전파를 위해 몇 분~몇 시간 대기 (일반적으로 5-30분)

### 5단계: Resend에서 도메인 인증 확인
1. Resend Dashboard → Domains로 돌아가기
2. 도메인 상태가 **Verified**로 변경될 때까지 대기
3. 인증 완료되면 초록색 체크 표시가 나타납니다

### 6단계: Edge Function 코드 업데이트
도메인 인증이 완료되면 `supabase/functions/send-beta-welcome-email/index.ts` 파일에서:

```typescript
// 변경 전
from: 'Capture Drag <onboarding@resend.dev>',

// 변경 후
from: 'Capture Drag <noreply@capturedrag.com>',
```

### 7단계: Edge Function 재배포
코드를 변경한 후 Supabase Dashboard에서 다시 배포하세요.

## 참고사항

### 임시 해결책 (테스트용)
- 현재는 `screenshotdrag@gmail.com`으로만 이메일 발송 가능
- 베타 테스트를 진행하려면 도메인 인증이 필수입니다

### DNS 레코드 확인 방법
```bash
# DNS 레코드 확인 (Windows)
nslookup -type=TXT capturedrag.com

# 또는 온라인 도구 사용
# https://mxtoolbox.com/SuperTool.aspx
```

### 문제 해결
- DNS 레코드가 전파되지 않으면 24-48시간까지 기다려보세요
- Resend Dashboard에서 "Verify" 버튼을 다시 클릭해보세요
- 도메인 제공업체의 DNS 설정 페이지에서 레코드가 올바르게 추가되었는지 확인하세요

