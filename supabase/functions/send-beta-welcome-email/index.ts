import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

// Download links
const directDownloadLink = 'https://github.com/screenshotdrag-wow/ScreenshotDrag/releases/download/Beta_1.1/CaptureDrag-Beta-1.1-Setup.exe'
const tempLicenseKey = 'TRIAL-NR5K-ZZ78-0959'
const discordInviteLink = 'https://discord.gg/arwEfUDQ'

serve(async (req) => {
  try {
    const { email, occupation, purpose } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if RESEND_API_KEY is set
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables')
      return new Response(
        JSON.stringify({ 
          error: 'Email service not configured', 
          message: 'RESEND_API_KEY environment variable is missing. Please set it in Supabase Dashboard -> Project Settings -> Edge Functions -> Secrets.'
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Resend client
    const resend = new Resend(RESEND_API_KEY)

    // Log email attempt
    console.log('Attempting to send email to:', email)
    console.log('RESEND_API_KEY exists:', !!RESEND_API_KEY)

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: 'Capture Drag <onboarding@resend.dev>',
      to: email,
      subject: '[Capture Drag] Welcome to the Beta! (Download + 15-day License Key)',
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Capture Drag Beta</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.8;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .email-container {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 40px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 25px;
        }
        .intro-text {
            font-size: 16px;
            margin-bottom: 30px;
            color: #555;
        }
        .beta-info {
            background: #fff9e6;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🎉 Welcome to Capture Drag Beta!</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hello!</div>
            
            <p class="intro-text">
                Thank you for joining the Capture Drag beta test.
            </p>
            
            <p class="intro-text">
                <strong>Capture Drag</strong> was built to make the flow "capture → instantly drag → immediately use" as fast as technically possible.
            </p>
            
            <p class="intro-text">
                Our goal is to support multi-image drag across the majority of Windows apps.
            </p>
            
            <div class="beta-info">
                <strong>⏰ This beta runs for 15 days.</strong><br>
                Below is your download link and temporary license key.
            </div>

      <div style="background: linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%); border-left: 4px solid #667eea; padding: 20px; margin: 0 0 25px 0; border-radius: 8px;">

        <h2 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 20px;">📦 Download Beta Version</h2>

        <p style="color: #555555; margin: 0 0 15px 0; font-size: 15px;">Get the latest beta build:</p>

        <div style="margin: 15px 0; text-align: center;">

          <a href="${directDownloadLink}" style="display: inline-block; background: linear-gradient(135deg, #28a745, #20c997); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: bold; font-size: 15px;">Direct Download</a>

        </div>

        <p style="color: #666666; margin: 15px 0 0 0; font-size: 13px; text-align: center;">💡 Direct Download 버튼을 클릭하면 바로 설치파일이 다운로드됩니다!</p>

      </div>



      <div style="background: #fffbf0; border-left: 4px solid #ffc107; padding: 20px; margin: 0 0 25px 0; border-radius: 8px;">

        <h2 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 20px;">🔑 Your Temporary License Key</h2>

        <p style="color: #555555; margin: 0 0 10px 0; font-size: 15px;">Use this key to activate Pro features during the beta:</p>

        <div style="background: #ffffff; padding: 15px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 16px; color: #007bff; font-weight: bold; text-align: center; border: 2px dashed #ffc107;">${tempLicenseKey}</div>

        <p style="color: #666666; margin: 15px 0 0 0; font-size: 13px;">💡 This key is valid throughout the beta testing period.</p>

      </div>



      <div style="background: linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%); border-left: 4px solid #5865F2; padding: 20px; margin: 0 0 25px 0; border-radius: 8px;">

        <h2 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 20px;">💬 Join Our Discord Community</h2>

        <p style="color: #555555; margin: 0 0 15px 0; font-size: 15px;">Connect with other beta testers and get support:</p>

        <a href="${discordInviteLink}" style="display: inline-block; background: #5865F2; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: bold; font-size: 15px;">Join Discord</a>

      </div>

            <div class="warning-box" style="background: #ffe6e6; border-left: 4px solid #f44336; padding: 20px; margin: 30px 0; border-radius: 5px;">
                <strong style="color: #f44336; font-size: 18px;">⚠️ IMPORTANT: Installation Notice</strong><br><br>
                We have not purchased a code-signing certificate yet.<br><br>
                Because of that, Windows SmartScreen may show a red warning the first time you install.<br>
                <strong>(This is NOT a virus.)</strong><br><br>
                Click <strong>[More Info]</strong> → <strong>[Run anyway]</strong>.
            </div>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-size: 20px; color: #333;">Your Mission During the Beta</h3>
            <div class="mission-section" style="background: #e8f4f8; border-left: 4px solid #2196F3; padding: 20px; margin: 25px 0; border-radius: 5px;">
                <ul style="margin: 15px 0; padding-left: 25px;">
                    <li style="margin: 10px 0; line-height: 1.8;">Test multi-drag in various apps (Slack / Discord / Telegram / Chrome / PPT / Word / Explorer, etc.)</li>
                    <li style="margin: 10px 0; line-height: 1.8;">Find bugs / errors / crashes / UX discomforts</li>
                    <li style="margin: 10px 0; line-height: 1.8;">Give feedback on the built-in editor's basic features<br>(currently basic only: pen / text / crop / mosaic / blur)</li>
                </ul>
            </div>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-size: 20px; color: #333;">How to Submit Feedback</h3>
            <div class="feedback-section" style="background: #e8f4f8; border-left: 4px solid #2196F3; padding: 20px; margin: 25px 0; border-radius: 5px;">
                Click the <strong>💡lightbulb icon</strong> in the top-right corner of the app.<br>
                That opens the internal feedback window.
            </div>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-size: 20px; color: #333;">🎁 Reward</h3>
            <div class="reward-box" style="background: #e8f5e9; border-left: 4px solid #4CAF50; padding: 20px; margin: 30px 0; border-radius: 5px;">
                <strong style="color: #4CAF50; font-size: 18px;">Anyone who provides meaningful bugs or product improvement feedback<br>
                will receive a permanent license ($49 Windows Store coupon).</strong>
            </div>
            
            <p style="margin-top: 40px; font-size: 16px;">
                Thank you.<br>
                <strong style="color: #667eea;">Capture Drag Team</strong>
            </p>
        </div>
        
        <div class="footer" style="text-align: center; padding: 30px; background: #333; color: white;">
            <p style="margin: 5px 0;"><strong>Capture Drag</strong></p>
            <p style="margin: 5px 0;">© 2025 Capture Drag. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      // Provide helpful error messages
      let errorMessage = 'Unknown Resend API error'
      if (error.message) {
        errorMessage = error.message
      } else if (typeof error === 'object') {
        errorMessage = JSON.stringify(error)
      }
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Failed to send email', 
          details: error,
          message: errorMessage,
          hint: 'Check: 1) RESEND_API_KEY is set, 2) Domain is verified in Resend, 3) API key has correct permissions'
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Email sent successfully. Resend data:', data)
    return new Response(
      JSON.stringify({ 
        success: true, 
        data,
        message: 'Email sent successfully',
        emailId: data?.id || 'unknown'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
})
