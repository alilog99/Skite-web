# 🔥 Complete Stripe Integration Setup Guide

## ✅ **Status: Cloud Functions Ready!**

Your Stripe integration is already implemented in Cloud Functions! Now we need to configure it properly.

## 🚀 **Step 1: Get Your Stripe API Keys**

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com/
2. **Sign in or create account**
3. **Go to Developers → API Keys**
4. **Copy your keys:**
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

## 🔧 **Step 2: Configure Firebase Functions**

Set up your Stripe configuration in Firebase:

```bash
# Set Stripe secret key
firebase functions:config:set stripe.secret_key="sk_test_YOUR_SECRET_KEY"

# Set your app URL
firebase functions:config:set app.url="http://localhost:5174"

# Set Stripe webhook secret (we'll get this in step 3)
firebase functions:config:set stripe.webhook_secret="whsec_YOUR_WEBHOOK_SECRET"
```

## 🌐 **Step 3: Set Up Stripe Webhook**

1. **In Stripe Dashboard**: Go to Developers → Webhooks
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://us-central1-skite-app.cloudfunctions.net/stripeWebhook`
4. **Events to send**: Select `checkout.session.completed`
5. **Copy the webhook secret** (starts with `whsec_`)
6. **Update the config** with the webhook secret

## 📦 **Step 4: Create Stripe Products**

Your functions expect these price IDs:
- `price_1RqckrFXWKfEvemGm5bfXri5` - Starter Pack (3 credits)
- `price_1RqclZFXWKfEvemGF1iltPvj` - Popular Pack (10 credits)  
- `price_1RqcmSFXWKfEvemG52HgrenK` - Pro Pack (25 credits)

**Create these in Stripe Dashboard:**
1. Go to Products → Add Product
2. Create each bundle with the exact price IDs
3. Set prices (e.g., $9.99, $29.99, $69.99)

## 🚀 **Step 5: Deploy Functions**

```bash
# Deploy to Firebase
firebase deploy --only functions
```

## 🧪 **Step 6: Test the Integration**

1. **Start your dev server**: `npm run dev`
2. **Go to**: http://localhost:5174/pricing
3. **Test a purchase** with Stripe test card: `4242 4242 4242 4242`

## 📋 **Current Implementation Status**

### ✅ **What's Already Done:**
- Cloud Functions initialized
- Stripe integration code written
- Credit system implemented
- Webhook handling ready
- Transaction logging ready

### 🔧 **What Needs Configuration:**
- Stripe API keys
- Webhook endpoint
- Product creation
- Function deployment

## 🎯 **Next Steps:**

1. **Get your Stripe API keys**
2. **Run the configuration commands**
3. **Create products in Stripe**
4. **Deploy functions**
5. **Test the integration**

**Ready to proceed? Let me know when you have your Stripe API keys!** 🚀 