# Deployment Instructions

## GitHub Repository
✅ Created: https://github.com/Landing-Pages-Websites/surface-theory-landing

## Vercel Deployment (MEGA Team)

1. **Import GitHub Repo to Vercel:**
   - Go to vercel.com
   - Sign in as joeadams0s-projects team
   - Import GitHub repository: `Landing-Pages-Websites/surface-theory-landing`

2. **Deployment Settings:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Node.js Version: 18.x

3. **Environment Variables:**
   None required initially (MEGA configs will be updated post-deployment)

4. **Domain Setup:**
   - Vercel will provide: surface-theory-landing.vercel.app
   - Custom domain can be added later

## Post-Deployment Steps

1. **Register in MEGA Admin Dashboard**
   - URL: https://admin.gomega.ai
   - Email: websiteagent@gomega.ai
   - Password: Jarvis2026!
   - Add new site with generated customer_id, site_id, site_key

2. **Update Placeholder Values**
   - Replace PLACEHOLDER_SITE_KEY in page.tsx
   - Replace PLACEHOLDER_CUSTOMER_ID in page.tsx  
   - Replace PLACEHOLDER_SITE_ID in page.tsx

3. **Test Form Submission**
   - Verify lead form works
   - Check form validation
   - Test phone number formatting
   - Confirm email notifications

4. **QA Check**
   - Run landing-page-qa skill on deployed URL
   - Verify mobile responsiveness
   - Check conversion elements
   - Test CTAs and phone links

## Current Status
- ✅ Code Complete
- ✅ GitHub Repository Created  
- ⏳ Vercel Deployment (Manual)
- ⏳ MEGA Admin Registration
- ⏳ Placeholder Updates
- ⏳ QA Testing