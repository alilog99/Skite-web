#!/bin/bash

# S-Kite Production Deployment Script
# Usage: ./deploy.sh

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
    echo -e "${BLUE}  S-Kite Production Deployment${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ] || [ ! -f "firebase.json" ]; then
        print_error "Not in S-Kite project directory!"
        exit 1
    fi
    
    # Check if Firebase CLI is available
    if ! command -v firebase &> /dev/null; then
        print_error "Firebase CLI not found! Please install it first."
        exit 1
    fi
    
    # Check if logged into Firebase
    if ! firebase projects:list &> /dev/null; then
        print_error "Not logged into Firebase! Run 'firebase login' first."
        exit 1
    fi
    
    # Check if yarn is available
    if ! command -v yarn &> /dev/null; then
        print_error "Yarn not found! Please install it first."
        exit 1
    fi
    
    print_status "✅ Prerequisites check passed"
}

# Function to verify environment
verify_environment() {
    print_status "Verifying environment configuration..."
    
    # Check current environment
    if ./switch-env.sh current | grep -q "🚀 LIVE MODE"; then
        print_status "✅ Environment is set to LIVE mode"
    else
        print_warning "⚠️  Not in LIVE mode. Switching to live environment..."
        ./switch-env.sh live
    fi
    
    # Validate environment
    if ./switch-env.sh validate &> /dev/null; then
        print_status "✅ Environment validation passed"
    else
        print_error "Environment validation failed! Please check your .env file."
        exit 1
    fi
}

# Function to build application
build_application() {
    print_status "Building application for production..."
    
    # Clean and build
    yarn clean:build
    
    # Check if build was successful
    if [ ! -d "dist" ]; then
        print_error "Build failed! No dist directory found."
        exit 1
    fi
    
    print_status "✅ Application build completed"
}

# Function to deploy to Firebase
deploy_to_firebase() {
    print_status "Deploying to Firebase Hosting..."
    
    # Deploy only hosting
    firebase deploy --only hosting
    
    if [ $? -eq 0 ]; then
        print_status "✅ Deployment completed successfully"
    else
        print_error "Deployment failed!"
        exit 1
    fi
}

# Function to verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    # Test the deployed site
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://skite-app.web.app)
    
    if [ "$HTTP_STATUS" = "200" ]; then
        print_status "✅ Site is live and responding (Status: $HTTP_STATUS)"
    else
        print_warning "⚠️  Site status: $HTTP_STATUS (may need a moment to propagate)"
    fi
}

# Function to show deployment summary
show_summary() {
    echo ""
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}   Deployment Summary${NC}"
    echo -e "${BLUE}================================${NC}"
    echo -e "${GREEN}✅ Build: Completed${NC}"
    echo -e "${GREEN}✅ Deploy: Completed${NC}"
    echo -e "${GREEN}✅ Verification: Completed${NC}"
    echo ""
    echo -e "${BLUE}Live URLs:${NC}"
    echo -e "  🔗 Primary: https://skite-app.web.app"
    echo -e "  🔗 Custom:  https://skite.info (if DNS configured)"
    echo ""
    echo -e "${BLUE}Firebase Console:${NC}"
    echo -e "  📊 Project: https://console.firebase.google.com/project/skite-app"
    echo -e "  🌐 Hosting: https://console.firebase.google.com/project/skite-app/hosting"
    echo ""
    echo -e "${YELLOW}⚠️  Remember:${NC}"
    echo -e "  • You're in LIVE mode (real payments)"
    echo -e "  • Monitor the deployment for any issues"
    echo -e "  • Custom domain DNS may take 24-48 hours"
    echo ""
}

# Main deployment function
main() {
    print_header
    
    # Check if user wants to proceed
    echo -e "${YELLOW}This will deploy S-Kite to PRODUCTION with LIVE payments enabled.${NC}"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deployment cancelled."
        exit 0
    fi
    
    # Run deployment steps
    check_prerequisites
    verify_environment
    build_application
    deploy_to_firebase
    verify_deployment
    show_summary
    
    print_status "🎉 Deployment completed successfully!"
}

# Run main function
main "$@"
