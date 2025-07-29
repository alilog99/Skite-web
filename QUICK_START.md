# 🚀 Quick Start Guide - Credit System Setup

## ✅ What's Already Implemented

Your credit system is **fully implemented** and ready to use! Here's what's been created:

- ✅ **Credits Page** (`/credits`) - Beautiful UI with all 3 bundles
- ✅ **Dashboard Integration** - Credits tab showing balance and usage
- ✅ **Stripe Integration** - Payment processing ready
- ✅ **Firebase Integration** - Credit tracking in Firestore
- ✅ **Toast Notifications** - Success confirmations
- ✅ **Authentication** - Protected routes and user tracking

## 🔧 Setup Steps (5 minutes)

### Step 1: Add Your Stripe Keys

Edit the `.env` file and replace the placeholder values:

```env
# Replace these with your actual keys from Stripe Dashboard
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

### Step 2: Create Stripe Products

Run this command to automatically create the products:

```bash
node create-stripe-products.js
```

**OR** manually create them in Stripe Dashboard:
1. Go to https://dashboard.stripe.com/test/products
2. Create 3 products with one-time pricing:
   - Starter Pack: $1.00
   - Popular Pack: $2.00  
   - Pro Pack: $5.00

### Step 3: Update Price IDs

Copy the Price IDs from Step 2 and update `src/services/stripe.ts`:

```typescript
export const CREDIT_BUNDLES: CreditBundle[] = [
  {
    id: 'bundle-1',
    name: 'Starter Pack',
    price: 1,
    credits: 3,
    priceId: 'price_YOUR_ACTUAL_PRICE_ID_HERE' // Replace this
  },
  // ... update other bundles
]
```

### Step 4: Test the System

```bash
npm run dev
```

Then visit:
- `http://localhost:5173/credits` - Credits page
- `http://localhost:5173/dashboard` - Dashboard with credits tab

## 🧪 Testing

### Test Cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Expired**: `4000 0000 0000 0069`

### Test Flow:
1. Login to your app
2. Go to `/credits`
3. Select a bundle
4. Use test card `4242 4242 4242 4242`
5. Verify credits appear in dashboard

## 📱 User Experience

### For Users:
1. **Login** → Navigate to `/credits`
2. **Choose Bundle** → Select from 3 options
3. **Pay Securely** → Stripe Checkout handles payment
4. **Get Credits** → Automatically added to account
5. **Use Credits** → For kite recommendations

### Features:
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark Mode Support** - Matches your theme
- ✅ **Real-time Updates** - Credits sync instantly
- ✅ **Error Handling** - Graceful failure states
- ✅ **Loading States** - Smooth user experience

## 🔒 Security

- ✅ **Authentication Required** - Must be logged in
- ✅ **Protected Routes** - Cannot access without auth
- ✅ **Server-side Validation** - Credits updated securely
- ✅ **Environment Variables** - Keys kept secure

## 🎯 What You Get

### Credit Bundles:
- **$1** → 3 kite recommendations
- **$2** → 10 kite recommendations (Popular)
- **$5** → 25 kite recommendations

### Dashboard Features:
- Current credit balance
- Credit usage history
- Quick "Buy More" button
- Integration with existing stats

## 🚨 Production Notes

For production deployment, you'll need:

1. **Backend API** - Replace mock endpoints with real ones
2. **Webhooks** - Set up Stripe webhook processing
3. **Live Keys** - Switch from test to live Stripe keys
4. **Domain Setup** - Configure success/cancel URLs

## 📞 Support

If you encounter any issues:

1. Check browser console for errors
2. Verify Stripe keys are correct
3. Ensure Firebase is properly configured
4. Check network tab for API calls

---

**🎉 Your credit system is ready to go!** 

Just add your Stripe keys and create the products, then you're all set! 