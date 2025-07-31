#!/bin/bash

echo "🚀 Deploying Firebase Functions with Stripe Integration..."

# Set Firebase Functions configuration
echo "📝 Setting Firebase Functions configuration..."

# Set Stripe secret key (replace with your actual key)
firebase functions:config:set stripe.secret_key="your_stripe_secret_key_here"

# Set app URL
firebase functions:config:set app.url="http://localhost:5173"

# Set webhook secret (you'll need to update this with your actual webhook secret)
firebase functions:config:set stripe.webhook_secret="whsec_your_webhook_secret_here"

echo "✅ Configuration set successfully!"

# Install dependencies
echo "📦 Installing dependencies..."
cd functions
npm install

# Build the functions
echo "🔨 Building functions..."
npm run build

# Deploy functions
echo "🚀 Deploying functions..."
firebase deploy --only functions

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up Stripe webhook endpoint in your Stripe dashboard"
echo "2. Update the webhook secret in Firebase Functions config"
echo "3. Test the payment flow" 