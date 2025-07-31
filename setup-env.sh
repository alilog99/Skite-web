#!/bin/bash

echo "🚀 Setting up environment variables for Skite Credit System"
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Backing up to .env.backup"
    cp .env .env.backup
fi

# Create .env file
echo "📝 Creating .env file..."
cat > .env << 'EOF'
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Firebase Configuration (add your actual Firebase keys)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# App Configuration
VITE_APP_URL=http://localhost:5173
EOF

echo "✅ .env file created successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Edit .env file and replace placeholder values with your actual keys"
echo "2. Create products in Stripe Dashboard (see STRIPE_SETUP_GUIDE.md)"
echo "3. Update src/services/stripe.ts with your Price IDs"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "📚 For detailed instructions, see STRIPE_SETUP_GUIDE.md" 