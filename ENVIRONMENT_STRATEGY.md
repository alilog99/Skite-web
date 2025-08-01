# Environment Strategy & Deployment Guide

## Current Environment Setup Analysis

### 📁 Environment Files Structure

```
Skite-web/
├── .env                    # Production environment (LIVE mode)
├── .env.development       # Development environment (TEST mode)
├── .env.example           # Template for team members
└── .env.backup            # Backup of previous configuration
```

### 🔍 Current Configuration Analysis

#### `.env` (Production/Live Mode)
```bash
VITE_STRIPE_MODE=live
VITE_STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1=price_1RqwrWF3UT2qFDZwOlThlOn2
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_2=price_1RqwsoF3UT2qFDZwRKVHLQmh
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_3=price_1RqwuqF3UT2qFDZwVDL56jKl
```

#### `.env.development` (Test Mode)
```bash
VITE_STRIPE_MODE=test
VITE_STRIPE_TEST_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_1=price_1RqckrFXWKfEvemGm5bfXri5
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_2=price_1RqclZFXWKfEvemGF1iltPvj
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_3=price_1RqcmSFXWKfEvemG52HgrenK
```

## 🚨 Issues Identified

### 1. **Price ID Usage Problem**
- **Current Issue**: Price IDs are hardcoded in `src/services/stripe.ts`
- **Environment Variables**: Not being used dynamically
- **Solution**: Implemented dynamic price ID resolution

### 2. **Environment File Usage**
- **Vite Behavior**: Only loads `.env` by default
- **Development Mode**: `.env.development` not automatically loaded
- **Solution**: Need proper environment switching strategy

### 3. **Deployment Strategy Missing**
- **Current**: Single deployment to production
- **Need**: Separate test and production environments
- **Solution**: Firebase hosting targets

## 🛠️ Implementation Plan

### Phase 1: Fix Price ID Usage (✅ COMPLETED)

**Changes Made:**
```typescript
// Helper function to get price ID based on environment
const getPriceId = (bundleId: string): string => {
  const mode = import.meta.env.VITE_STRIPE_MODE || 'test'
  const envKey = `VITE_STRIPE_${mode.toUpperCase()}_PRICE_ID_${bundleId.toUpperCase()}`
  const priceId = import.meta.env[envKey]
  
  console.log('🔍 Price ID Debug Info:', {
    bundleId, mode, envKey, priceId,
    allEnvVars: { /* environment variables */ }
  })
  
  return priceId || ''
}
```

### Phase 2: Environment File Strategy

#### Option A: Vite Environment Mode (Recommended)
```bash
# Development (uses .env.development)
npm run dev

# Production build (uses .env)
npm run build

# Preview with production env
npm run preview
```

#### Option B: Custom Environment Scripts
```json
{
  "scripts": {
    "dev:test": "vite --mode development",
    "dev:live": "vite --mode production",
    "build:test": "vite build --mode development",
    "build:live": "vite build --mode production"
  }
}
```

### Phase 3: Firebase Hosting Targets

#### Create Multiple Firebase Hosting Sites

1. **Test Environment**: `skite-app-test.web.app`
2. **Production Environment**: `skite-app.web.app`

```bash
# Initialize hosting targets
firebase target:apply hosting test skite-app-test
firebase target:apply hosting production skite-app
```

#### Updated `firebase.json`
```json
{
  "hosting": [
    {
      "target": "test",
      "public": "dist",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [{"source": "**", "destination": "/index.html"}]
    },
    {
      "target": "production", 
      "public": "dist",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [{"source": "**", "destination": "/index.html"}]
    }
  ]
}
```

## 🚀 Complete Deployment Strategy

### Step 1: Environment Configuration

#### Create Environment-Specific Files
```bash
# .env.test (for test deployment)
VITE_STRIPE_MODE=test
VITE_STRIPE_TEST_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_1=price_1RqckrFXWKfEvemGm5bfXri5
# ... other test variables

# .env.production (for live deployment)  
VITE_STRIPE_MODE=live
VITE_STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1=price_1RqwrWF3UT2qFDZwOlThlOn2
# ... other live variables
```

### Step 2: Build Scripts

#### Update `package.json`
```json
{
  "scripts": {
    "dev": "vite",
    "dev:test": "vite --mode test",
    "dev:production": "vite --mode production",
    "build": "tsc && vite build",
    "build:test": "tsc && vite build --mode test",
    "build:production": "tsc && vite build --mode production",
    "preview": "vite preview",
    "deploy:test": "npm run build:test && firebase deploy --only hosting:test",
    "deploy:production": "npm run build:production && firebase deploy --only hosting:production"
  }
}
```

### Step 3: Firebase Hosting Setup

#### Initialize Multiple Hosting Targets
```bash
# Create test hosting site
firebase hosting:sites:create skite-app-test

# Create production hosting site  
firebase hosting:sites:create skite-app

# Apply targets
firebase target:apply hosting test skite-app-test
firebase target:apply hosting production skite-app
```

### Step 4: Deployment Commands

#### Test Deployment
```bash
# Build and deploy to test environment
npm run deploy:test

# Or manually:
npm run build:test
firebase deploy --only hosting:test
```

#### Production Deployment
```bash
# Build and deploy to production environment
npm run deploy:production

# Or manually:
npm run build:production
firebase deploy --only hosting:production
```

## 🔧 Environment Variables Best Practices

### 1. **Naming Convention**
```bash
# ✅ Good - Clear and descriptive
VITE_STRIPE_MODE=test
VITE_STRIPE_TEST_PRICE_ID_BUNDLE_1=price_123
VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1=price_456

# ❌ Bad - Unclear
STRIPE_MODE=test
PRICE_1=price_123
```

### 2. **Environment-Specific Files**
```bash
.env                # Default (production)
.env.local          # Local overrides (gitignored)
.env.development    # Development mode
.env.test           # Test mode
.env.production     # Production mode
```

### 3. **Security Considerations**
- ✅ Never commit `.env` files to Git
- ✅ Use `.env.example` for team templates
- ✅ Validate environment variables at runtime
- ✅ Use different keys for test/live environments

## 📊 Monitoring & Debugging

### Console Logging (Temporary)
```typescript
// Added to stripe.ts for debugging
console.log('🔍 Price ID Debug Info:', {
  bundleId, mode, envKey, priceId,
  allEnvVars: { /* environment variables */ }
})
```

### Environment Validation
```typescript
// Add to your app initialization
const validateEnvironment = () => {
  const requiredVars = [
    'VITE_STRIPE_MODE',
    'VITE_STRIPE_PUBLISHABLE_KEY'
  ]
  
  const missing = requiredVars.filter(varName => !import.meta.env[varName])
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing)
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }
  
  console.log('✅ Environment validation passed')
}
```

## 🎯 Recommended Implementation Steps

### Immediate Actions (Today)
1. ✅ **Fix Price ID Usage** - Use environment variables dynamically
2. ✅ **Add Console Logging** - Debug current configuration
3. **Test Current Setup** - Verify environment variables work

### Short Term (This Week)
1. **Create Test Environment** - Set up separate Firebase hosting
2. **Update Build Scripts** - Add environment-specific builds
3. **Deploy Test Version** - Verify test environment works

### Long Term (Next Sprint)
1. **Automate Deployments** - CI/CD pipeline
2. **Environment Monitoring** - Health checks
3. **Rollback Strategy** - Quick recovery procedures

## 🔍 Debugging Commands

### Check Current Environment
```bash
# View current environment variables
npm run dev
# Check browser console for debug logs

# Build with specific environment
npm run build:test
npm run build:production
```

### Verify Firebase Configuration
```bash
# List hosting sites
firebase hosting:sites:list

# Check current targets
firebase target
```

### Test Environment Variables
```bash
# Test environment loading
node -e "console.log(process.env.VITE_STRIPE_MODE)"
```

## 📝 Summary

### Current Status
- ✅ **Environment Files**: Properly structured
- ✅ **Price ID Fix**: Implemented dynamic resolution
- ✅ **Console Logging**: Added for debugging
- ⏳ **Deployment Strategy**: Needs implementation

### Next Steps
1. **Test Current Fix**: Verify price IDs load correctly
2. **Set Up Test Environment**: Create separate Firebase hosting
3. **Implement Build Scripts**: Environment-specific builds
4. **Deploy Test Version**: Validate complete workflow

### URLs After Implementation
- **Test Environment**: `https://skite-app-test.web.app`
- **Production Environment**: `https://skite-app.web.app`
- **Firebase Console**: `https://console.firebase.google.com/project/skite-app/overview` 