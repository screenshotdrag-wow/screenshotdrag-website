# Capture Drag Website

Official website for Capture Drag - Skip Ctrl+C+V. Just Drag It.

## 🌐 Live Site

Visit: [https://screenshot-drag.vercel.app/](https://screenshot-drag.vercel.app/)

## 📁 Project Structure

```
capturedrag-website/
├── index.html          # Main landing page
├── styles.css          # Stylesheet
├── supabase/
│   ├── config.toml     # Supabase configuration
│   └── functions/
│       └── send-beta-welcome-email/
│           └── index.ts  # Edge Function for sending beta welcome emails
└── README.md           # This file
```

## 🚀 Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Modern UI** - Clean gradient design with smooth animations
- **SEO Optimized** - Semantic HTML structure
- **Fast Loading** - Minimal dependencies, pure HTML/CSS
- **Automated Emails** - Beta welcome emails via Resend

## 🛠️ Development

### Local Development

Simply open `index.html` in your browser:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel Dashboard
3. Deploy!

### Deploy Edge Functions to Supabase

The beta welcome email is sent automatically using Supabase Edge Functions:

```bash
# Install Supabase CLI (if not already installed)
# npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref gxavjkdewqfxacxabyoj

# Deploy the function
supabase functions deploy send-beta-welcome-email

# Set environment variables
supabase secrets set RESEND_API_KEY=your_resend_api_key
```

## 📝 Content Sections

1. **Hero Section** - Main tagline and CTA
2. **How to Use** - 3-step guide
3. **Key Features** - Core innovations (Drag & Drop, Continuous Capture, Editor)
4. **Comparison Table** - Old way vs Capture Drag
5. **Features Grid** - 6 main features
6. **Target Users** - Developer, Designer, Educator, General User
7. **CTA Section** - Final call-to-action
8. **Footer** - Links and contact

## 🎨 Design

- **Color Scheme**: Purple gradient (#667eea → #764ba2)
- **Typography**: Segoe UI system font
- **Icons**: Emoji-based (universal support)

## 📦 Related Projects

- [Capture Drag Desktop App](https://github.com/screenshotdrag-wow/ScreenshotDrag) - WPF Desktop Application

## 📄 License

© 2025 Capture Drag. All rights reserved.

## 📧 Contact

contact@capturedrag.com

