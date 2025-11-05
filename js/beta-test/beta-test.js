/**
 * Beta Test Modal Functionality
 * Separated from main index.html for better code organization
 * 
 * This script handles:
 * - Beta test modal open/close
 * - Form submission to Supabase
 * - Email sending via Edge Function
 * - Duplicate email handling for development
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBetaTest);
    } else {
        initBetaTest();
    }

    function initBetaTest() {
        // Beta Test Modal functionality
        const betaTestBtn = document.getElementById('betaTestBtn');
        const betaModal = document.getElementById('betaModal');
        const betaModalClose = document.getElementById('betaModalClose');
        const betaModalOverlay = document.getElementById('betaModalOverlay');
        const betaForm = document.getElementById('betaForm');
        
        // Check if required elements exist
        if (!betaForm) {
            console.warn('Beta test form not found. Beta test functionality disabled.');
            return;
        }
        
        // Debug: Check if elements exist
        console.log('Beta Test Button:', betaTestBtn);
        console.log('Beta Modal:', betaModal);
        
        if (!betaTestBtn) {
            console.error('Beta Test Button not found!');
        }
        
        if (!betaModal) {
            console.error('Beta Modal not found!');
        }
        
        // Success Modal
        const successModal = document.getElementById('successModal');
        const successModalOverlay = document.getElementById('successModalOverlay');
        const successCloseBtn = document.getElementById('successCloseBtn');

        // Open beta modal
        if (betaTestBtn && betaModal) {
            betaTestBtn.addEventListener('click', function(e) {
                console.log('Beta Test Button clicked!', e);
                e.preventDefault();
                e.stopPropagation();
                if (betaModal) {
                    betaModal.classList.add('active');
                    betaModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                    console.log('Modal should be open now', betaModal.classList);
                } else {
                    console.error('Beta Modal is null!');
                }
            });
        }

        // Close beta modal
        function closeModal() {
            if (betaModal) {
                betaModal.classList.remove('active');
                betaModal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        }

        if (betaModalClose) {
            betaModalClose.addEventListener('click', closeModal);
        }
        if (betaModalOverlay) {
            betaModalOverlay.addEventListener('click', closeModal);
        }

        // Open success modal
        function showSuccessModal(formData) {
            closeModal();
            
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        // Close success modal
        function closeSuccessModal() {
            if (successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        if (successCloseBtn) {
            successCloseBtn.addEventListener('click', closeSuccessModal);
        }
        if (successModalOverlay) {
            successModalOverlay.addEventListener('click', closeSuccessModal);
        }

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (betaModal && betaModal.classList.contains('active')) {
                    closeModal();
                }
                if (successModal && successModal.classList.contains('active')) {
                    closeSuccessModal();
                }
            }
        });

        // Form submission
        if (betaForm) {
            betaForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Check if Supabase client is available
                if (typeof supabaseClient === 'undefined') {
                    console.error('Supabase client not found!');
                    alert('❌ System error: Database connection not available. Please refresh the page.');
                    return;
                }

                // Check if SUPABASE_URL and SUPABASE_ANON_KEY are available
                if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
                    console.error('Supabase configuration not found!');
                    alert('❌ System error: Configuration not available. Please refresh the page.');
                    return;
                }
                
                // Check privacy agreement
                const privacyAgree = document.getElementById('privacyAgree');
                if (!privacyAgree || !privacyAgree.checked) {
                    alert('Please agree to the collection and use of personal information.');
                    if (privacyAgree) privacyAgree.focus();
                    return;
                }
                
                // Check nationality
                const nationalityHidden = document.getElementById('nationality');
                const submitBtn = betaForm.querySelector('.beta-submit-btn');
                const originalText = submitBtn ? submitBtn.textContent : 'Submit Application';
                
                if (!nationalityHidden || !nationalityHidden.value) {
                    alert('Please select your nationality.');
                    const nationalitySelect = document.getElementById('nationalitySelect');
                    const nationalitySearch = document.getElementById('nationalitySearch');
                    if (nationalitySelect) nationalitySelect.classList.add('active');
                    if (nationalitySearch) nationalitySearch.focus();
                    return;
                }
                
                // Disable button and show loading
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Submitting...';
                }
                
                let result = null; // 변수 스코프를 위해 미리 선언
                let insertData = null;
                
                try {
                    const formData = new FormData(betaForm);
                    
                    // 기본 데이터 객체
                    const baseData = {
                        email: formData.get('email'),
                        occupation: formData.get('occupation'),
                        purpose: formData.get('purpose'),
                        user_agent: navigator.userAgent,
                        referrer_url: document.referrer || window.location.href
                    };
                    
                    // 선택적 필드들 (컬럼이 있을 경우에만 추가)
                    const optionalFields = {};
                    
                    // privacy_agreed 필드
                    if (privacyAgree) {
                        optionalFields.privacy_agreed = privacyAgree.checked;
                        if (privacyAgree.checked) {
                            optionalFields.privacy_agreed_at = new Date().toISOString();
                        }
                    }
                    
                    // nationality 필드
                    const nationalityValue = formData.get('nationality');
                    if (nationalityValue) {
                        optionalFields.nationality = nationalityValue;
                    }

                    // 모든 필드를 포함하여 시도
                    insertData = { ...baseData, ...optionalFields };
                    const { data: supabaseResult, error } = await supabaseClient
                        .from('beta_applications')
                        .insert([insertData])
                        .select();
                    
                    result = supabaseResult;

                    // 컬럼 관련 에러가 발생하면 선택적 필드 제거 후 재시도
                    let currentError = error;
                    if (currentError && (currentError.message?.includes('column') || currentError.code === '42703')) {
                        console.warn('일부 컬럼이 없습니다. 필수 필드만으로 재시도합니다.');
                        insertData = { ...baseData };
                        const retryResult = await supabaseClient
                            .from('beta_applications')
                            .insert([insertData])
                            .select();
                        
                        if (retryResult.error) {
                            currentError = retryResult.error;
                            result = null;
                        } else {
                            currentError = null;
                            result = retryResult.data;
                        }
                    }

                    if (currentError) {
                        console.error('Supabase error:', currentError);
                        
                        // Check if it's a duplicate email error (409 Conflict or 23505)
                        if (currentError.code === '23505' || currentError.code === 'PGRST116' || currentError.message?.includes('duplicate') || currentError.message?.includes('already exists')) {
                            // 개발/테스트 환경: 중복 이메일이어도 기존 레코드 삭제 후 재시도
                            const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('vercel.app');
                            
                            if (isDevelopment) {
                                console.warn('⚠️ Duplicate email detected. Attempting to delete and re-submit for testing...');
                                
                                try {
                                    // 기존 레코드 삭제 시도
                                    const { error: deleteError } = await supabaseClient
                                        .from('beta_applications')
                                        .delete()
                                        .eq('email', insertData.email);
                                    
                                    if (deleteError) {
                                        console.error('Failed to delete duplicate:', deleteError);
                                        alert('⚠️ This email has already been registered.\n\nTo test again, delete the record in Supabase Dashboard:\n\nSQL: DELETE FROM beta_applications WHERE email = \'' + insertData.email + '\';');
                                        if (submitBtn) {
                                            submitBtn.textContent = 'Submit Application';
                                            submitBtn.disabled = false;
                                        }
                                        return;
                                    }
                                    
                                    // 삭제 후 재시도
                                    console.log('Deleted duplicate, retrying insert...');
                                    const { data: retryResult, error: retryError } = await supabaseClient
                                        .from('beta_applications')
                                        .insert([insertData])
                                        .select();
                                    
                                    if (retryError) {
                                        throw retryError;
                                    }
                                    
                                    result = retryResult;
                                    currentError = null; // 에러 클리어
                                    console.log('Successfully re-inserted after deleting duplicate');
                                    // 아래 성공 처리 로직으로 계속 진행
                                } catch (retryErr) {
                                    console.error('Retry failed:', retryErr);
                                    alert('⚠️ Failed to re-submit after deleting duplicate.\n\nPlease delete the record manually in Supabase Dashboard:\n\nSQL: DELETE FROM beta_applications WHERE email = \'' + insertData.email + '\';');
                                    if (submitBtn) {
                                        submitBtn.textContent = 'Submit Application';
                                        submitBtn.disabled = false;
                                    }
                                    return;
                                }
                            } else {
                                // 프로덕션 환경: 일반적인 중복 에러 메시지
                                alert('⚠️ This email has already been registered for the beta test.\n\nPlease check your email for further instructions.');
                                if (submitBtn) {
                                    submitBtn.textContent = 'Submit Application';
                                    submitBtn.disabled = false;
                                }
                                return;
                            }
                        } else {
                            // 중복이 아닌 다른 에러
                            alert('❌ An error occurred. Please try again later.\n\nError: ' + currentError.message);
                            if (submitBtn) {
                                submitBtn.textContent = 'Submit Application';
                                submitBtn.disabled = false;
                            }
                            return;
                        }
                    }
                    
                    // 성공 처리 (중복 삭제 후 재시도 성공한 경우도 포함)
                    if (result && result.length > 0) {
                        console.log('Successfully submitted:', result);
                        
                        // 데이터가 성공적으로 저장되었음을 확인
                        const submittedData = {
                            email: insertData.email,
                            occupation: insertData.occupation,
                            purpose: insertData.purpose
                        };
                        
                        // Call Edge Function to send welcome email
                        try {
                            const emailResponse = await fetch(`${SUPABASE_URL}/functions/v1/send-beta-welcome-email`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                                },
                                body: JSON.stringify(submittedData)
                            });

                            if (emailResponse.ok) {
                                const responseData = await emailResponse.json();
                                console.log('Welcome email sent successfully:', responseData);
                            } else {
                                const errorText = await emailResponse.text();
                                const status = emailResponse.status;
                                let errorDetails = '';
                                try {
                                    const errorJson = JSON.parse(errorText);
                                    errorDetails = errorJson.message || errorJson.error || errorText;
                                } catch {
                                    errorDetails = errorText;
                                }
                                
                                console.error('Failed to send welcome email. Status:', status, 'Error:', errorDetails);
                                
                                // Edge Function이 배포되지 않았거나 설정되지 않은 경우 안내
                                if (status === 404) {
                                    console.error('❌ Edge Function not found. Please deploy the function to Supabase.');
                                    console.error('   Go to: Supabase Dashboard → Edge Functions → Deploy');
                                } else if (status === 500) {
                                    console.error('❌ Edge Function error. Possible causes:');
                                    console.error('   1. RESEND_API_KEY not set in Supabase Secrets');
                                    console.error('   2. Resend domain not verified (noreply@capturedrag.com)');
                                    console.error('   3. Check Edge Function logs in Supabase Dashboard');
                                    console.error('   Error details:', errorDetails);
                                }
                                // 이메일 발송 실패는 치명적이지 않으므로 계속 진행
                            }
                        } catch (emailError) {
                            console.error('Error sending welcome email:', emailError);
                            console.error('This might be due to:');
                            console.error('1. Edge Function not deployed to Supabase');
                            console.error('2. RESEND_API_KEY not set in Supabase secrets');
                            console.error('3. Network error or CORS issue');
                            // Don't block the user flow even if email fails
                        }
                        
                        // Show success modal with email preview
                        try {
                            showSuccessModal(submittedData);
                            // 성공적으로 모달 표시 후 폼 리셋 및 버튼 상태 복원
                            betaForm.reset();
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.textContent = originalText;
                            }
                        } catch (modalError) {
                            console.error('Error showing success modal:', modalError);
                            // 모달 표시 실패 시 간단한 성공 메시지 표시
                            alert('✅ Thank you for applying!\n\nWe will send you a welcome email with download instructions and your license key shortly.');
                            betaForm.reset();
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.textContent = originalText;
                            }
                        }
                        return; // 성공적으로 처리되었으므로 함수 종료
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    // 에러가 발생했지만 데이터가 저장되었을 수 있으므로 확인
                    if (result && result.length > 0) {
                        // 데이터가 저장되었으면 성공 메시지 표시
                        alert('✅ Thank you for applying!\n\nWe will send you a welcome email with download instructions and your license key shortly.');
                        betaForm.reset();
                    } else {
                        alert('❌ An unexpected error occurred. Please try again later.');
                    }
                } finally {
                    // Re-enable button
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }
                }
            });
        }
    }
})();

