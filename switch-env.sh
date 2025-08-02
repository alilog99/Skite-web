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
    
    # Check if template exists
    if [ ! -f ".env.test" ]; then
        print_error ".env.test template file not found!"
        print_error "Please create .env.test with your test environment variables"
        exit 1
    fi
    
    # Backup current .env
    backup_env
    
    # Copy template to .env
    cp .env.test .env
    
    print_status "✅ Switched to TEST environment"
    print_warning "⚠️  Remember to fill in your actual test keys in .env"
    print_warning "Remember to restart your dev server: npm run dev"
}

# Function to switch to live environment
switch_to_live() {
    print_status "Switching to LIVE environment..."
    
    # Check if template exists
    if [ ! -f ".env.live" ]; then
        print_error ".env.live template file not found!"
        print_error "Please create .env.live with your live environment variables"
        exit 1
    fi
    
    # Backup current .env
    backup_env
    
    # Copy template to .env
    cp .env.live .env
    
    print_status "✅ Switched to LIVE environment"
    print_warning "⚠️  LIVE mode uses real money! Be careful!"
    print_warning "⚠️  Remember to fill in your actual live keys in .env"
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
        print_status "Current Stripe Key Status:"
        if grep -q "pk_test_your_test_publishable_key_here" .env; then
            echo -e "${YELLOW}  ⚠️  Test Key (Placeholder - needs to be filled)${NC}"
        elif grep -q "pk_live_your_live_publishable_key_here" .env; then
            echo -e "${YELLOW}  ⚠️  Live Key (Placeholder - needs to be filled)${NC}"
        elif grep -q "pk_test_" .env; then
            echo -e "${GREEN}  ✅ Test Key (Configured)${NC}"
        elif grep -q "pk_live_" .env; then
            echo -e "${RED}  ✅ Live Key (Configured - Real money)${NC}"
        else
            echo -e "${YELLOW}  ❓ Unknown Key Status${NC}"
        fi
    else
        print_error "No .env file found!"
        print_status "Run './switch-env.sh test' or './switch-env.sh live' to create one"
    fi
}

# Function to validate environment
validate_env() {
    if [ ! -f ".env" ]; then
        print_error "No .env file found!"
        return 1
    fi
    
    # Check for placeholder keys
    if grep -q "your_.*_key_here" .env; then
        print_warning "⚠️  Environment contains placeholder keys that need to be filled"
        return 1
    fi
    
    print_status "✅ Environment appears to be properly configured"
    return 0
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
        "validate")
            validate_env
            ;;
        *)
            echo "Usage: $0 [test|live|current|validate]"
            echo ""
            echo "Commands:"
            echo "  test     - Switch to TEST environment (safe for development)"
            echo "  live     - Switch to LIVE environment (real money transactions)"
            echo "  current  - Show current environment status"
            echo "  validate - Validate current environment configuration"
            echo ""
            show_current
            ;;
    esac
}

# Run main function
main "$@" 