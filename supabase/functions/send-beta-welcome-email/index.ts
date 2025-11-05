import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "https://deno.land/x/resend@2.0.0/mod.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

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
    // Note: If using custom domain, verify it in Resend Dashboard first
    // For testing, use Resend's default domain: onboarding@resend.dev
    const { data, error } = await resend.emails.send({
      from: 'Capture Drag <onboarding@resend.dev>', // Change to noreply@capturedrag.com after domain verification
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
        .download-section, .key-section {
            background: #f8f9fa;
            border: 2px solid #667eea;
            border-radius: 10px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
        }
        .download-section h2, .key-section h2 {
            margin: 0 0 15px 0;
            font-size: 20px;
            color: #667eea;
        }
        .download-link {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 18px;
            margin: 15px 0;
        }
        .license-key {
            font-family: 'Courier New', monospace;
            font-size: 18px;
            font-weight: bold;
            background: white;
            padding: 20px;
            border-radius: 8px;
            letter-spacing: 2px;
            color: #667eea;
            margin: 15px 0;
            word-break: break-all;
        }
        .warning-box {
            background: #ffe6e6;
            border-left: 4px solid #f44336;
            padding: 20px;
            margin: 30px 0;
            border-radius: 5px;
        }
        .warning-box strong {
            color: #f44336;
            font-size: 18px;
        }
        .mission-section, .feedback-section {
            background: #e8f4f8;
            border-left: 4px solid #2196F3;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
        }
        .mission-section h3, .feedback-section h3 {
            margin: 0 0 15px 0;
            color: #2196F3;
            font-size: 18px;
        }
        .discord-box {
            background: #e3f2fd;
            border: 2px solid #2196F3;
            padding: 20px;
            margin: 25px 0;
            border-radius: 10px;
            text-align: center;
        }
        .discord-link {
            display: inline-block;
            background: #5865F2;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin-top: 10px;
        }
        .reward-box {
            background: #e8f5e9;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 30px 0;
            border-radius: 5px;
        }
        .reward-box strong {
            color: #4CAF50;
            font-size: 18px;
        }
        .footer {
            text-align: center;
            padding: 30px;
            background: #333;
            color: white;
        }
        .footer p {
            margin: 5px 0;
        }
        ul {
            margin: 15px 0;
            padding-left: 25px;
        }
        ul li {
            margin: 10px 0;
            line-height: 1.8;
        }
        h2 {
            margin-top: 40px;
            margin-bottom: 20px;
            font-size: 24px;
            color: #333;
        }
        h3 {
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 20px;
            color: #333;
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
            
            <h2>1) Download the App</h2>
            <div class="download-section">
                <a href="https://github.com/screenshotdrag-wow/ScreenshotDrag/releases/download/Beta_1.1/CaptureDrag-Beta-1.1-Setup.exe" class="download-link">📦 Download Capture Drag Beta</a>
                <p style="margin: 15px 0 0; color: #666; font-size: 14px;">Windows 10/11</p>
            </div>
            
            <h2>2) 15-day License Key</h2>
            <div class="key-section">
                <p><strong>Your 15-day key here:</strong></p>
                <div class="license-key">TRIAL-NR5K-ZZ78-0959</div>
                <p style="margin: 15px 0 0; color: #666; font-size: 14px;">
                    After running the app, click <strong>[Activate Beta]</strong> on the first screen<br>
                    and enter your key — it will switch to Pro mode immediately.
                </p>
            </div>
            
            <div class="warning-box">
                <strong>⚠️ IMPORTANT: Installation Notice</strong><br><br>
                We have not purchased a code-signing certificate yet.<br><br>
                Because of that, Windows SmartScreen may show a red warning the first time you install.<br>
                <strong>(This is NOT a virus.)</strong><br><br>
                Click <strong>[More Info]</strong> → <strong>[Run anyway]</strong>.
            </div>
            
            <h3>Your Mission During the Beta</h3>
            <div class="mission-section">
                <ul>
                    <li>Test multi-drag in various apps (Slack / Discord / Telegram / Chrome / PPT / Word / Explorer, etc.)</li>
                    <li>Find bugs / errors / crashes / UX discomforts</li>
                    <li>Give feedback on the built-in editor's basic features<br>(currently basic only: pen / text / crop / mosaic / blur)</li>
                </ul>
            </div>
            
            <h3>How to Submit Feedback</h3>
            <div class="feedback-section">
                Click the <strong>💡lightbulb icon</strong> in the top-right corner of the app.<br>
                That opens the internal feedback window.
            </div>
            
            <div class="discord-box">
                <h3>💬 Discord Channel</h3>
                <p style="margin: 0; color: #666;">Join our community for real-time updates and discussions</p>
                <a href="https://discord.gg/arwEfUDQ" class="discord-link">Join Discord</a>
            </div>
            
            <h3>🎁 Reward</h3>
            <div class="reward-box">
                <strong>Anyone who provides meaningful bugs or product improvement feedback<br>
                will receive a permanent license ($49 Windows Store coupon).</strong>
            </div>
            
            <p style="margin-top: 40px; font-size: 16px;">
                Thank you.<br>
                <strong style="color: #667eea;">Capture Drag Team</strong>
            </p>
        </div>
        
        <div class="footer">
            <p><strong>Capture Drag</strong></p>
            <p>© 2025 Capture Drag. All rights reserved.</p>
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

