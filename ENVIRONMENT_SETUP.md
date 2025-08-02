# 🌍 Environment Setup Guide

This guide explains how to set up and manage your Stripe environment variables for the S-Kite project.

## 📁 File Structure

```
Skite-web/
├── .env.test          # Template for test environment (included in Git)
├── .env.live          # Template for live environment (included in Git)
├── .env               # Active environment (generated, gitignored)
├── switch-env.sh      # Environment switching script
└── ENVIRONMENT_SETUP.md
```

## 🚀 Quick Start

### 1. Switch to Test Environment (Development)
```bash
./switch-env.sh test
```

### 2. Switch to Live Environment (Production)
```bash
./switch-env.sh live
```

### 3. Check Current Environment
```bash
./switch-env.sh current
```

### 4. Validate Environment Configuration
```bash
./switch-env.sh validate
```

## 🔑 Setting Up Your Keys

### Test Environment Setup

1. **Switch to test environment:**
   ```bash
   ./switch-env.sh test
   ```

2. **Get your test keys from Stripe:**
   - Go to: https://dashboard.stripe.com/test/apikeys
   - Copy your **Publishable key** (starts with `pk_test_`)

3. **Get your test price IDs:**
   - Go to: https://dashboard.stripe.com/test/products
   - Copy the price IDs for your bundles

4. **Edit the .env file:**
   ```bash
   nano .env
   ```
   
   Replace the placeholders:
   ```env
   VITE_STRIPE_TEST_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   VITE_STRIPE_TEST_PRICE_ID_BUNDLE_1=price_your_actual_bundle_1_id
   VITE_STRIPE_TEST_PRICE_ID_BUNDLE_2=price_your_actual_bundle_2_id
   VITE_STRIPE_TEST_PRICE_ID_BUNDLE_3=price_your_actual_bundle_3_id
   ```

### Live Environment Setup

1. **Switch to live environment:**
   ```bash
   ./switch-env.sh live
   ```

2. **Get your live keys from Stripe:**
   - Go to: https://dashboard.stripe.com/apikeys
   - Copy your **Publishable key** (starts with `pk_live_`)

3. **Get your live price IDs:**
   - Go to: https://dashboard.stripe.com/products
   - Copy the price IDs for your bundles

4. **Edit the .env file:**
   ```bash
   nano .env
   ```
   
   Replace the placeholders:
   ```env
   VITE_STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_your_actual_key_here
   VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1=price_your_actual_bundle_1_id
   VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_2=price_your_actual_bundle_2_id
   VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_3=price_your_actual_bundle_3_id
   ```

## ⚠️ Security Notes

- **Never commit your actual keys to Git**
- The `.env` file is automatically gitignored
- Only `.env.test` and `.env.live` templates are in Git (with placeholders)
- Always use test keys for development
- Live keys should only be used in production

## 🔄 Environment Variables

### Test Environment Variables
```env
VITE_STRIPE_MODE=test
VITE_STRIPE_TEST_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_1=price_...
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_2=price_...
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_3=price_...
```

### Live Environment Variables
```env
VITE_STRIPE_MODE=live
VITE_STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1=price_...
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_2=price_...
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_3=price_...
```

## 🛠️ Development Workflow

### Starting Development
1. Switch to test environment: `./switch-env.sh test`
2. Fill in your test keys in `.env`
3. Start development server: `npm run dev`

### Deploying to Production
1. Switch to live environment: `./switch-env.sh live`
2. Fill in your live keys in `.env`
3. Build for production: `npm run build`
4. Deploy to your hosting platform

### Switching Between Environments
```bash
# Development
./switch-env.sh test

# Production
./switch-env.sh live

# Check current status
./switch-env.sh current

# Validate configuration
./switch-env.sh validate
```

## 🚨 Troubleshooting

### "Environment validation failed" Error
This means your `.env` file contains placeholder keys. Fix by:
1. Running `./switch-env.sh test` or `./switch-env.sh live`
2. Editing `.env` to replace placeholder keys with actual keys

### "No .env file found" Error
Create an environment file:
```bash
./switch-env.sh test  # or ./switch-env.sh live
```

### Stripe Keys Not Working
1. Verify you're using the correct keys for your environment
2. Check that price IDs match your Stripe products
3. Ensure you've restarted your development server after changing `.env`

## 📋 Checklist

- [ ] Created `.env.test` template with placeholders
- [ ] Created `.env.live` template with placeholders
- [ ] Updated `.gitignore` to exclude `.env`
- [ ] Created `switch-env.sh` script
- [ ] Updated `src/services/stripe.ts` to use dotenv
- [ ] Added environment validation
- [ ] Tested switching between environments
- [ ] Verified no hardcoded keys in code

## 🔗 Useful Links

- [Stripe Test Dashboard](https://dashboard.stripe.com/test/apikeys)
- [Stripe Live Dashboard](https://dashboard.stripe.com/apikeys)
- [Stripe Products & Prices](https://dashboard.stripe.com/products)
- [Firebase Console](https://console.firebase.google.com/) 