# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to enable real email sending from your portfolio's contact form.

## Current Status
- ✅ Contact form is fully configured and working in test mode
- ✅ Form validation and success messages are implemented
- ⚠️ Currently using `fakeEmailRequests: true` (simulated emails)
- ⚠️ EmailJS credentials in the code are from the template author (won't work)

## Steps to Enable Real Email Sending

### 1. Create an EmailJS Account
1. Go to [https://emailjs.com](https://emailjs.com)
2. Click "Sign Up Free" 
3. Create your account (free tier allows 200 emails/month)

### 2. Add Your Email Service
1. After logging in, go to "Email Services" in the sidebar
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for personal portfolios)
   - **Outlook**
   - **Yahoo**
   - Or use custom SMTP
4. Follow the connection instructions for your provider
5. Name your service (e.g., "Portfolio Contact")
6. **Save the Service ID** - you'll need this (looks like `service_xxxxxxx`)

### 3. Create an Email Template
1. Go to "Email Templates" in the sidebar
2. Click "Create New Template"
3. Set up your template:

**Example Template:**
```
Subject: New Portfolio Contact: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
Sent from: {{custom_source}}
```

4. In the "To email" field, enter your email address
5. Save the template
6. **Save the Template ID** - you'll need this (looks like `template_xxxxxxx`)

### 4. Get Your Public Key
1. Go to "Integration" in the sidebar
2. Find your "Public Key" (looks like `xxxxxxxxxxxx`)
3. Copy this key

### 5. Update Your Portfolio Configuration

Edit `/public/data/sections/contact.json` and replace the EmailJS settings:

```json
"settings": {
    "email_js_public_key": "YOUR_PUBLIC_KEY_HERE",
    "email_js_service_id": "YOUR_SERVICE_ID_HERE",
    "email_js_template_id": "YOUR_TEMPLATE_ID_HERE"
}
```

### 6. Disable Fake Email Mode

Edit `/public/data/settings.json`:

```json
"developerSettings": {
    "debugMode": false,
    "fakeEmailRequests": false,  // Change this to false
    "stayOnThePreloaderScreen": false,
    "version": "2.0.0"
}
```

### 7. Test Your Contact Form
1. Run `npm run dev`
2. Navigate to the Contact section
3. Send a test message
4. Check your email inbox

## Troubleshooting

### Common Issues:

**"Error sending message" appears:**
- Check browser console (F12) for specific errors
- Verify all three EmailJS credentials are correct
- Make sure your EmailJS service is active
- Check if you've exceeded the free tier limit (200 emails/month)

**CORS errors in console:**
- Make sure you're using the Public Key, not the Private Key
- Verify your domain is allowed in EmailJS settings

**Emails not arriving:**
- Check your spam folder
- Verify the "To email" in your template is correct
- Test your service in EmailJS dashboard

### Testing Tips:
- Keep `fakeEmailRequests: true` while developing
- Use EmailJS test feature in their dashboard
- Monitor usage in EmailJS dashboard

## Security Notes
- ✅ The Public Key is safe to expose (it's meant for client-side use)
- ❌ Never commit your Private Key or Access Token
- ✅ Current setup uses client-side EmailJS (standard approach)

## Alternative Solutions
If EmailJS doesn't meet your needs:
1. **Formspree** - Similar service, good free tier
2. **Netlify Forms** - If hosting on Netlify
3. **Custom Backend** - Node.js/Express with Nodemailer
4. **Simple mailto:** - Opens user's email client (no server needed)

## Next Steps
After setting up EmailJS:
1. Test thoroughly with different email content
2. Set up email filters to organize portfolio messages
3. Consider adding reCAPTCHA for spam protection
4. Monitor your EmailJS usage dashboard

Good luck with your portfolio! 🚀