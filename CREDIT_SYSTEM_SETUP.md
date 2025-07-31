# Credit System Setup Guide

This guide explains how to set up the credit-based bundle system using Stripe Checkout and Firebase.

## 🚀 Features Implemented

- **Credit Bundles**: 3 tiers ($1/3 credits, $2/10 credits, $5/25 credits)
- **Stripe Integration**: Secure one-time payments via Stripe Checkout
- **Firebase Integration**: User credit tracking in Firestore
- **Dashboard Integration**: Credits display and management
- **Toast Notifications**: Success confirmations after purchases

## 📋 Prerequisites

1. **Firebase Project**: Already configured
2. **Stripe Account**: For payment processing
3. **Environment Variables**: Set up for Stripe keys

## 🔧 Setup Instructions

### 1. Environment Variables

Add these to your `.env` file:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Firebase Configuration (already configured)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

### 2. Stripe Product Setup

1. **Create Products in Stripe Dashboard**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/products)
   - Create 3 products with one-time pricing:
     - **Starter Pack**: $1.00 USD
     - **Popular Pack**: $2.00 USD  
     - **Pro Pack**: $5.00 USD

2. **Get Price IDs**:
   - Copy the Price IDs (format: `price_xxxxxxxxxxxxx`)
   - Update `src/services/stripe.ts` with your actual Price IDs

### 3. Update Stripe Configuration

Edit `src/services/stripe.ts` and replace the placeholder Price IDs:

```typescript
export const CREDIT_BUNDLES: CreditBundle[] = [
  {
    id: 'bundle-1',
    name: 'Starter Pack',
    price: 1,
    credits: 3,
    priceId: 'price_your_actual_stripe_price_id_here' // Replace this
  },
  {
    id: 'bundle-2',
    name: 'Popular Pack',
    price: 2,
    credits: 10,
    priceId: 'price_your_actual_stripe_price_id_here', // Replace this
    popular: true
  },
  {
    id: 'bundle-3',
    name: 'Pro Pack',
    price: 5,
    credits: 25,
    priceId: 'price_your_actual_stripe_price_id_here' // Replace this
  }
]
```

### 4. Backend API Setup (Required for Production)

The current implementation includes mock API endpoints. For production, you'll need:

1. **Create Checkout Session API** (`/api/create-checkout-session`):
   ```javascript
   // Example using Next.js API routes or similar
   import Stripe from 'stripe';
   
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
   
   export default async function handler(req, res) {
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
   }
   ```

2. **Webhook Handler** (`/api/stripe-webhook`):
   ```javascript
   // Handle successful payments and add credits
   export default async function handler(req, res) {
     const { type, data } = req.body;
     
     if (type === 'checkout.session.completed') {
       const session = data.object;
       const { userId, credits } = session.metadata;
       
       // Add credits to user's account in Firebase
       await addCredits(userId, parseInt(credits));
     }
     
     res.status(200).json({ received: true });
   }
   ```

### 5. Firebase Security Rules

Update your Firestore security rules to allow credit operations:

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

## 🎯 Usage

### For Users:
1. **Navigate to Credits Page**: `/credits`
2. **Choose a Bundle**: Select from 3 available tiers
3. **Complete Payment**: Secure checkout via Stripe
4. **Get Credits**: Automatically added to account
5. **Use Credits**: For kite recommendations

### For Developers:
1. **Check Credits**: `userData.credits` in AuthContext
2. **Add Credits**: `addCredits(userId, amount)`
3. **Use Credits**: `useCredits(userId, amount)`
4. **Get Credits**: `getCredits(userId)`

## 🔍 Testing

### Test Mode:
- Use Stripe test cards (e.g., `4242 4242 4242 4242`)
- Test webhook events in Stripe Dashboard
- Verify credit updates in Firebase Console

### Production:
- Switch to live Stripe keys
- Set up production webhook endpoints
- Monitor payment success rates

## 📱 UI Components

- **Credits Page**: `/src/pages/Credits.tsx`
- **Dashboard Integration**: Updated with credits tab
- **Toast Notifications**: Success confirmations
- **Stripe Service**: Payment handling logic

## 🔒 Security Considerations

1. **Webhook Verification**: Always verify Stripe webhook signatures
2. **Server-Side Processing**: Never handle payments client-side only
3. **Credit Validation**: Ensure credits can't be manipulated client-side
4. **User Authentication**: All credit operations require valid user session

## 🐛 Troubleshooting

### Common Issues:
1. **Stripe Keys**: Ensure publishable key is correct
2. **Price IDs**: Verify Price IDs match your Stripe products
3. **Webhooks**: Check webhook endpoint is accessible
4. **Firebase Rules**: Ensure credit updates are allowed

### Debug Mode:
- Check browser console for errors
- Monitor Stripe Dashboard for failed payments
- Verify Firebase security rules

## 📈 Next Steps

1. **Analytics**: Track credit usage and purchase patterns
2. **Email Notifications**: Send receipts and confirmations
3. **Credit History**: Log all credit transactions
4. **Refund Handling**: Implement credit refund process
5. **Bulk Purchases**: Add quantity selection for bundles

---

**Note**: This implementation provides a solid foundation for a credit system. For production use, ensure all security measures are properly implemented and thoroughly tested. 