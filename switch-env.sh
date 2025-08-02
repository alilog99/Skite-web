#!/bin/bash

# S-Kite Environment Switcher
# Usage: ./switch-env.sh [test|live]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  S-Kite Environment Switcher${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Function to backup current .env
backup_env() {
    if [ -f ".env" ]; then
        cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
        print_status "Backed up current .env file"
    fi
}

# Function to switch to test environment
switch_to_test() {
    print_status "Switching to TEST environment..."
    
    # Backup current .env
    backup_env
    
    # Create test environment file
    cat > .env << 'EOF'
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyCRwZBXkC2b1cMH2VAcnSGSqqUtFWwh-yg
VITE_FIREBASE_AUTH_DOMAIN=skite-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=skite-app
VITE_FIREBASE_STORAGE_BUCKET=skite-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=347898821173
VITE_FIREBASE_APP_ID=1:347898821173:web:a64976e482a16d43918f7c
VITE_FIREBASE_MEASUREMENT_ID=G-SJ0P1F40WE

# Stripe Configuration - TEST Mode
VITE_STRIPE_MODE=test
VITE_STRIPE_TEST_PUBLISHABLE_KEY=pk_test_51RqbnQFXWKfEvemG6KtMJfPsUwXvYG9cwJVjCOM1ubzZllaI1TrqcsYsVDjT5P6slg8HR65mIzY65Cpad0sFaDBF007F72jYn8

# Stripe Test Price IDs
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_1=price_1RqckrFXWKfEvemGm5bfXri5
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_2=price_1RqclZFXWKfEvemGF1iltPvj
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_3=price_1RqcmSFXWKfEvemG52HgrenK
EOF

    print_status "✅ Switched to TEST environment"
    print_warning "Remember to restart your dev server: npm run dev"
}

# Function to switch to live environment
switch_to_live() {
    print_status "Switching to LIVE environment..."
    
    # Backup current .env
    backup_env
    
    # Create live environment file
    cat > .env << 'EOF'
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyCRwZBXkC2b1cMH2VAcnSGSqqUtFWwh-yg
VITE_FIREBASE_AUTH_DOMAIN=skite-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=skite-app
VITE_FIREBASE_STORAGE_BUCKET=skite-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=347898821173
VITE_FIREBASE_APP_ID=1:347898821173:web:a64976e482a16d43918f7c
VITE_FIREBASE_MEASUREMENT_ID=G-SJ0P1F40WE

# Stripe Configuration - LIVE Mode
VITE_STRIPE_MODE=live
VITE_STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_51RqbmjF3UT2qFDZwQQQ2AinVR3twvXHWgKmDJW0hQqbP3idedSqzZ4y714Y7iywbAwYAKSzWAm9cQNVIGK6L4DvB00U1lBP8U4

# Stripe Live Price IDs
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1=price_1RqwrWF3UT2qFDZwOlThlOn2
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_2=price_1RqwsoF3UT2qFDZwRKVHLQmh
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_3=price_1RqwuqF3UT2qFDZwVDL56jKl
EOF

    print_status "✅ Switched to LIVE environment"
    print_warning "⚠️  LIVE mode uses real money! Be careful!"
    print_warning "Remember to restart your dev server: npm run dev"
}

# Function to show current environment
show_current() {
    if [ -f ".env" ]; then
        print_status "Current environment:"
        if grep -q "VITE_STRIPE_MODE=test" .env; then
            echo -e "${GREEN}  🧪 TEST MODE${NC}"
        elif grep -q "VITE_STRIPE_MODE=live" .env; then
            echo -e "${RED}  🚀 LIVE MODE${NC}"
        else
            echo -e "${YELLOW}  ❓ UNKNOWN MODE${NC}"
        fi
        
        echo ""
        print_status "Current Stripe Key:"
        if grep -q "pk_test_" .env; then
            echo -e "${GREEN}  Test Key (Safe for development)${NC}"
        elif grep -q "pk_live_" .env; then
            echo -e "${RED}  Live Key (Real money transactions)${NC}"
        fi
    else
        print_error "No .env file found!"
    fi
}

# Main script logic
main() {
    print_header
    
    case "${1:-}" in
        "test")
            switch_to_test
            ;;
        "live")
            switch_to_live
            ;;
        "current"|"status")
            show_current
            ;;
        *)
            echo "Usage: $0 [test|live|current]"
            echo ""
            echo "Commands:"
            echo "  test    - Switch to TEST environment (safe for development)"
            echo "  live    - Switch to LIVE environment (real money transactions)"
            echo "  current - Show current environment status"
            echo ""
            show_current
            ;;
    esac
}

# Run main function
main "$@" 