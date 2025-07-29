# 🚀 Stripe Setup Guide for Credit System

## Step 1: Environment Variables Setup

Create a `.env` file in your project root with your Stripe keys:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here

# Firebase Configuration (add your actual Firebase keys)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

**Replace the placeholder values with your actual keys from the Stripe dashboard.**

## Step 2: Create Stripe Products

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com/test/products

2. **Create Product 1 - Starter Pack**:
   - Name: `Starter Pack`
   - Description: `3 kite recommendations for $1`
   - Pricing: One-time payment of $1.00 USD
   - Copy the Price ID (starts with `price_`)

3. **Create Product 2 - Popular Pack**:
   - Name: `Popular Pack`
   - Description: `10 kite recommendations for $2`
   - Pricing: One-time payment of $2.00 USD
   - Copy the Price ID (starts with `price_`)

4. **Create Product 3 - Pro Pack**:
   - Name: `Pro Pack`
   - Description: `25 kite recommendations for $5`
   - Pricing: One-time payment of $5.00 USD
   - Copy the Price ID (starts with `price_`)

## Step 3: Update Stripe Configuration

Edit `src/services/stripe.ts` and replace the placeholder Price IDs:

```typescript
export const CREDIT_BUNDLES: CreditBundle[] = [
  {
    id: 'bundle-1',
    name: 'Starter Pack',
    price: 1,
    credits: 3,
    priceId: 'price_YOUR_ACTUAL_STARTER_PACK_PRICE_ID' // Replace this
  },
  {
    id: 'bundle-2',
    name: 'Popular Pack',
    price: 2,
    credits: 10,
    priceId: 'price_YOUR_ACTUAL_POPULAR_PACK_PRICE_ID', // Replace this
    popular: true
  },
  {
    id: 'bundle-3',
    name: 'Pro Pack',
    price: 5,
    credits: 25,
    priceId: 'price_YOUR_ACTUAL_PRO_PACK_PRICE_ID' // Replace this
  }
]
```

## Step 4: Test the Implementation

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the credits page**: `http://localhost:5173/credits`

3. **Test with Stripe test cards**:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Expired: `4000 0000 0000 0069`

## Step 5: Backend Integration (Required for Production)

For production, you'll need to create real API endpoints. Here's what you need:

### Option A: Next.js API Routes (Recommended)

Create `pages/api/create-checkout-session.js`:

```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, userId, userEmail, bundleId, credits } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/credits?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/credits?canceled=true`,
      metadata: {
        userId,
        bundleId,
        credits: credits.toString()
      }
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### Option B: Firebase Cloud Functions

Create a Cloud Function to handle Stripe webhooks:

```javascript
const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret_key);
const admin = require('firebase-admin');

admin.initializeApp();

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = functions.config().stripe.webhook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, credits } = session.metadata;

    if (userId && credits) {
      const userRef = admin.firestore().collection('users').doc(userId);
      await userRef.update({
        credits: admin.firestore.FieldValue.increment(parseInt(credits)),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  }

  res.status(200).json({ received: true });
});
```

## Step 6: Webhook Setup

1. **In Stripe Dashboard**: Go to Webhooks section
2. **Add endpoint**: `https://your-domain.com/api/stripe-webhook`
3. **Select events**: `checkout.session.completed`
4. **Copy webhook secret** and add to environment variables

## Step 7: Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow credit updates
      allow update: if request.auth != null && 
        request.auth.uid == userId && 
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['credits', 'updatedAt']);
    }
  }
}
```

## 🎯 Quick Start Checklist

- [ ] Create `.env` file with your Stripe keys
- [ ] Create 3 products in Stripe Dashboard
- [ ] Update `src/services/stripe.ts` with Price IDs
- [ ] Test the credit purchase flow
- [ ] Set up backend API endpoints (for production)
- [ ] Configure webhooks (for production)
- [ ] Update Firestore security rules

## 🔍 Testing

1. **Test Cards**:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Expired: `4000 0000 0000 0069`

2. **Test Flow**:
   - Login to your app
   - Go to `/credits`
   - Select a bundle
   - Complete payment with test card
   - Verify credits are added to dashboard

## 🚨 Important Notes

- **Never expose your secret key** in frontend code
- **Always verify webhook signatures** in production
- **Use environment variables** for all sensitive data
- **Test thoroughly** before going live
- **Monitor webhook events** in Stripe Dashboard

---

**Your credit system is now ready to use!** 🎉 