# 🚀 S-Kite Deployment Guide

Complete deployment documentation for the S-Kite web application to Firebase Hosting with custom domain setup.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Build Process](#build-process)
- [Firebase Deployment](#firebase-deployment)
- [Custom Domain Configuration](#custom-domain-configuration)
- [Post-Deployment Verification](#post-deployment-verification)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

## 🎯 Overview

This guide covers deploying the S-Kite React application to Firebase Hosting with the following stack:

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Hosting**: Firebase Hosting
- **Backend**: Firebase Functions
- **Database**: Firestore
- **Authentication**: Firebase Auth
- **Payments**: Stripe (Live mode)
- **Domain**: skite.info (custom domain)

## ✅ Prerequisites

### Required Tools
- Node.js (v18 or higher)
- Yarn package manager
- Firebase CLI
- Git

### Required Accounts
- Firebase project (`skite-app`)
- Google Cloud account
- Stripe account (live keys)
- Domain registrar access for `skite.info`

### Verify Prerequisites
```bash
# Check Node version
node --version

# Check Yarn
yarn --version

# Check Firebase CLI
firebase --version

# Login to Firebase
firebase login:list
```

## 🌍 Environment Setup

### 1. Environment Management System

The project uses a sophisticated environment switching system:

```bash
# Check current environment
./switch-env.sh current

# Switch to test environment (development)
./switch-env.sh test

# Switch to live environment (production)
./switch-env.sh live

# Validate environment configuration
./switch-env.sh validate
```

### 2. Production Environment Configuration

For deployment, ensure you're in **LIVE** mode:

```bash
./switch-env.sh live
```

This sets up:
- `VITE_STRIPE_MODE=live`
- Live Stripe publishable keys
- Production Firebase configuration
- Live price IDs for Stripe products

### 3. Environment Variables Structure

**Production (.env in live mode):**
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyCRwZBXkC2b1cMH2VAcnSGSqqUtFWwh-yg
VITE_FIREBASE_AUTH_DOMAIN=skite-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=skite-app
VITE_FIREBASE_STORAGE_BUCKET=skite-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=347898821173
VITE_FIREBASE_APP_ID=1:347898821173:web:a64976e482a16d43918f7c
VITE_FIREBASE_MEASUREMENT_ID=G-SJ0P1F40WE

# Stripe Configuration (Live)
VITE_STRIPE_MODE=live
VITE_STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_51RqbmjF3UT2qFDZw...
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1=price_1RqwrWF3UT2qFDZwOlThlOn2
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_2=price_...
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_3=price_...
```

## 🔨 Build Process

### 1. Available Build Scripts

```bash
# Standard build
yarn build

# Development build
yarn dev

# Clean build (recommended for deployment)
yarn clean:build

# Full deployment build (clean + type-check + build)
yarn deploy:build

# Clean everything and reinstall
yarn clean:install
```

### 2. Production Build Steps

```bash
# 1. Ensure clean state
yarn clean

# 2. Type checking
yarn type-check

# 3. Build for production
yarn build
```

### 3. Build Output

The build process generates:
```
dist/
├── index.html (2.16 kB)
├── assets/
│   ├── SKite-Logo-Source-BN6edx40.svg (13.34 kB)
│   ├── header-img-CgX0oBoC.jpeg (156.60 kB)
│   ├── index-CaMnGz7M.css (31.87 kB)
│   └── index-BZjzsgiE.js (832.19 kB)
```

### 4. Build Optimization Notes

- Main bundle: 832.19 kB (can be optimized with code splitting)
- Compressed: 217.50 kB gzipped
- Consider dynamic imports for chunks > 500 kB

## 🚀 Firebase Deployment

### 1. Firebase Project Configuration

**Project Details:**
- Project ID: `skite-app`
- Project Number: `347898821173`
- Default Site: `https://skite-app.web.app`

### 2. Firebase Configuration Files

**firebase.json:**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "functions"
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

### 3. Deployment Commands

```bash
# Deploy hosting only (recommended for frontend updates)
firebase deploy --only hosting

# Deploy everything (hosting + functions + firestore)
firebase deploy

# Deploy specific services
firebase deploy --only functions
firebase deploy --only firestore
```

### 4. Complete Deployment Process

```bash
# 1. Switch to live environment
./switch-env.sh live

# 2. Clean build
yarn clean:build

# 3. Deploy to Firebase
firebase deploy --only hosting

# 4. Verify deployment
curl -s -o /dev/null -w "%{http_code}" https://skite-app.web.app
```

### 5. Expected Deployment Output

```bash
=== Deploying to 'skite-app'...

i  deploying hosting
i  hosting[skite-app]: beginning deploy...
i  hosting[skite-app]: found 8 files in dist
✔  hosting[skite-app]: file upload complete
i  hosting[skite-app]: finalizing version...
✔  hosting[skite-app]: version finalized
i  hosting[skite-app]: releasing new version...
✔  hosting[skite-app]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skite-app/overview
Hosting URL: https://skite-app.web.app
```

## 🌐 Custom Domain Configuration

### 1. Firebase Console Setup

1. **Navigate to Firebase Console:**
   - Go to: https://console.firebase.google.com/project/skite-app/hosting/main
   - Click on **"Custom domains"** tab

2. **Add Custom Domain:**
   - Click **"Add custom domain"**
   - Enter: `skite.info`
   - Click **"Continue"**

3. **Domain Verification:**
   - Firebase will provide verification steps
   - Follow the provided instructions

### 2. DNS Configuration

**Required DNS Records for skite.info:**

#### A Records (Root Domain)
```
Type: A
Name: @ (or leave blank)
TTL: 3600 (or default)
Value: [Firebase will provide IP addresses]
```

#### CNAME Record (WWW Subdomain)
```
Type: CNAME
Name: www
TTL: 3600 (or default)
Value: skite-app.web.app
```

#### Example DNS Setup
```
skite.info         A       151.101.1.195
skite.info         A       151.101.65.195
www.skite.info     CNAME   skite-app.web.app
```

### 3. SSL Certificate

- **Automatic**: Firebase automatically provisions SSL certificates
- **Timeline**: 24-48 hours for full propagation
- **Verification**: Check https://skite.info after DNS propagation

### 4. Domain Verification Process

1. **Add TXT Record** (if required):
   ```
   Type: TXT
   Name: @ (or _firebase-hosting-skite-app)
   Value: [Firebase verification token]
   ```

2. **Wait for Propagation**: 1-24 hours typical
3. **SSL Provisioning**: Additional 24-48 hours
4. **Final Verification**: Test https://skite.info

## ✅ Post-Deployment Verification

### 1. Automated Checks

```bash
# Test main site
curl -s -o /dev/null -w "%{http_code}" https://skite-app.web.app
# Expected: 200

# Test custom domain (after DNS setup)
curl -s -o /dev/null -w "%{http_code}" https://skite.info
# Expected: 200

# Check redirect (WWW to non-WWW)
curl -s -o /dev/null -w "%{http_code}" https://www.skite.info
# Expected: 200 or 301
```

### 2. Manual Testing Checklist

- [ ] **Home page loads correctly**
- [ ] **Authentication works (login/signup)**
- [ ] **Payment processing works (Stripe live mode)**
- [ ] **Responsive design on mobile**
- [ ] **Dark/light theme toggle**
- [ ] **Navigation works properly**
- [ ] **All assets load (images, CSS, JS)**
- [ ] **SEO meta tags present**
- [ ] **HTTPS enforced**
- [ ] **Performance acceptable (Core Web Vitals)**

### 3. Firebase Console Verification

1. **Hosting Dashboard**: https://console.firebase.google.com/project/skite-app/hosting
2. **Check deployment history**
3. **Monitor traffic and errors**
4. **Verify custom domain status**

### 4. Environment Verification

```bash
# Verify you're in live mode
./switch-env.sh current
# Expected: "🚀 LIVE MODE" and "✅ Live Key (Configured - Real money)"

# Validate configuration
./switch-env.sh validate
# Expected: "✅ Environment appears to be properly configured"
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. Build Failures

**ESLint Configuration Issues:**
```bash
# If ESLint v9 config issues occur
# Check eslint.config.js exists and is properly configured
yarn add -D @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh
```

**TypeScript Errors:**
```bash
# Check types
yarn type-check

# Common fix: update dependencies
yarn install
```

#### 2. Deployment Issues

**Authentication Failed:**
```bash
# Re-authenticate
firebase logout
firebase login
```

**Wrong Project:**
```bash
# Verify current project
firebase projects:list
firebase use skite-app
```

**Deploy Timeout:**
```bash
# Try deploying specific components
firebase deploy --only hosting --debug
```

#### 3. Environment Issues

**Wrong Environment Mode:**
```bash
# Verify current environment
./switch-env.sh current

# Switch to correct environment
./switch-env.sh live
```

**Missing Environment Variables:**
```bash
# Validate environment
./switch-env.sh validate

# Recreate environment file
./switch-env.sh live
# Then edit .env with actual keys
```

#### 4. Custom Domain Issues

**DNS Not Propagating:**
```bash
# Check DNS propagation
nslookup skite.info
dig skite.info

# Wait 24-48 hours for full propagation
```

**SSL Certificate Issues:**
- Wait 24-48 hours after DNS propagation
- Check Firebase Console for SSL status
- Verify all DNS records are correct

#### 5. Performance Issues

**Large Bundle Size:**
- Current: 832.19 kB (can be optimized)
- Consider code splitting for chunks > 500 kB
- Use dynamic imports for large dependencies

### Debug Commands

```bash
# Detailed deployment logs
firebase deploy --only hosting --debug

# Check Firebase project status
firebase projects:list

# Verify hosting configuration
firebase hosting:sites:list

# Check authentication
firebase login:list

# Environment debugging
./switch-env.sh current
./switch-env.sh validate
```

## 🔄 Maintenance

### Regular Deployment Process

```bash
# 1. Development complete, switch to live
./switch-env.sh live

# 2. Clean build and deploy
yarn clean:build && firebase deploy --only hosting

# 3. Verify deployment
curl -s -o /dev/null -w "%{http_code}" https://skite-app.web.app

# 4. Test custom domain (if configured)
curl -s -o /dev/null -w "%{http_code}" https://skite.info
```

### Cache Cleaning

```bash
# Clear all caches
yarn clean:all

# Clean and reinstall
yarn clean:install

# Clean build artifacts only
yarn clean
```

### Environment Switching

```bash
# For development
./switch-env.sh test
yarn dev

# For production deployment
./switch-env.sh live
yarn deploy:build
firebase deploy --only hosting
```

### Monitoring and Analytics

1. **Firebase Console Monitoring:**
   - https://console.firebase.google.com/project/skite-app/overview
   - Monitor hosting traffic, errors, and performance

2. **Google Analytics** (if configured):
   - Monitor via Firebase Analytics dashboard

3. **Stripe Dashboard:**
   - Monitor live transactions and payments
   - https://dashboard.stripe.com/

### Security Considerations

- **Environment Variables**: Never commit real keys to Git
- **Stripe Keys**: Ensure using live keys only in production
- **Firebase Rules**: Review Firestore security rules regularly
- **HTTPS**: Always enforced via Firebase Hosting

### Backup and Recovery

- **Code**: Git repository
- **Firebase Config**: Backup firebase.json and .firebaserc
- **Environment**: Keep secure backup of .env.live template
- **Database**: Regular Firestore exports via Firebase Console

## 📞 Support Links

- **Firebase Console**: https://console.firebase.google.com/project/skite-app
- **Live Site**: https://skite-app.web.app
- **Target Domain**: https://skite.info (after DNS setup)
- **Firebase Documentation**: https://firebase.google.com/docs/hosting
- **Stripe Dashboard**: https://dashboard.stripe.com/

---

## 📝 Quick Reference

### Essential Commands
```bash
# Check environment
./switch-env.sh current

# Switch to production
./switch-env.sh live

# Deploy
yarn clean:build && firebase deploy --only hosting

# Verify
curl -s -o /dev/null -w "%{http_code}" https://skite-app.web.app
```

### Project Details
- **Project ID**: skite-app
- **Live URL**: https://skite-app.web.app
- **Custom Domain**: skite.info (setup required)
- **Environment**: Live/Production
- **Payment Mode**: Stripe Live (real money)

---

*Last Updated: $(date +"%Y-%m-%d %H:%M:%S")*
*Deployment Guide Version: 1.0*
