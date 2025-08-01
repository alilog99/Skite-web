# Firebase Deployment Guide for Skite Web App

This guide provides step-by-step instructions for deploying the Skite web application to Firebase Hosting.

## Prerequisites

- Node.js and npm installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Access to the Firebase project (`skite-app`)

## Step-by-Step Deployment Process

### 1. Check Current Firebase Status

First, verify your current Firebase CLI version and authentication status:

```bash
# Check Firebase CLI version
firebase --version

# List current projects (if logged in)
firebase projects:list
```

### 2. Switch Firebase Accounts (if needed)

If you need to switch to a different Firebase account:

```bash
# Logout from current account
firebase logout

# Login to the correct account
firebase login --no-localhost
```

**Note:** The `--no-localhost` flag helps avoid authentication issues on some systems.

### 3. Verify Project Access

After logging in, verify you can see the correct project:

```bash
# List available projects
firebase projects:list
```

You should see:

```
┌──────────────────────┬────────────┬────────────────┬──────────────────────┐
│ Project Display Name │ Project ID │ Project Number │ Resource Location ID │
├──────────────────────┼────────────┼────────────────┼──────────────────────┤
│ SKite-App            │ skite-app  │ 347898821173   │ [Not specified]      │
└──────────────────────┴────────────┴────────────────┴──────────────────────┘
```

### 4. Initialize Firebase in Your Project

Initialize Firebase Hosting in your project directory:

```bash
# Initialize Firebase Hosting
firebase init hosting
```

**Configuration Options:**

- **Project Selection:** Choose "Use an existing project"
- **Select Project:** Choose `skite-app (SKite-App)`
- **Public Directory:** Enter `dist` (for Vite builds)
- **Single-page App:** Yes (for React Router)
- **GitHub Integration:** No (unless you want automatic deployments)

### 5. Update Firebase Configuration

If the initialization set the wrong public directory, update `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 6. Fix Build Issues (if any)

Before building, fix any TypeScript errors:

```bash
# Check for TypeScript errors
npm run build
```

**Common Issues:**

- Remove unused imports (e.g., `Shield` from lucide-react)
- Fix type errors
- Resolve dependency issues

### 7. Build the Application

Build your React application for production:

```bash
# Build the application
npm run build
```

**Expected Output:**

```
vite v5.4.19 building for production...
✓ 1687 modules transformed.
dist/index.html                   2.16 kB │ gzip:   0.74 kB
dist/assets/index-B0Otwo4j.css   30.24 kB │ gzip:   5.30 kB
dist/assets/index-BC8YtkfM.js   830.85 kB │ gzip: 216.64 kB
✓ built in 4.27s
```

### 8. Deploy to Firebase

Deploy your built application to Firebase Hosting:

```bash
# Deploy to Firebase
firebase deploy
```

**Expected Output:**

```
=== Deploying to 'skite-app'...

i  deploying hosting
i  hosting[skite-app]: beginning deploy...
i  hosting[skite-app]: found 6 files in dist
✔  hosting[skite-app]: file upload complete
i  hosting[skite-app]: finalizing version...
✔  hosting[skite-app]: version finalized
i  hosting[skite-app]: releasing new version...
✔  hosting[skite-app]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skite-app/overview
Hosting URL: https://skite-app.web.app
```

## Deployment URLs

- **Live Site:** https://skite-app.web.app
- **Firebase Console:** https://console.firebase.google.com/project/skite-app/overview

## Troubleshooting

### Authentication Issues

If you encounter login problems:

```bash
# Try alternative login method
firebase login --no-localhost

# Or use interactive login
firebase login
```

### Build Errors

Common build issues and solutions:

1. **TypeScript Errors:**

   ```bash
   # Fix unused imports
   # Remove unused variables
   # Check type definitions
   ```

2. **Dependency Issues:**

   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Firebase Configuration:**
   ```bash
   # Reinitialize Firebase
   firebase init hosting
   ```

### Deployment Issues

1. **Wrong Public Directory:**

   - Update `firebase.json` to point to `dist`
   - Ensure build completed successfully

2. **Permission Issues:**
   - Verify you have access to the Firebase project
   - Check your Firebase account permissions

## Environment Variables

For production deployment, ensure your environment variables are properly configured:

1. **Firebase Config:** Already configured in `src/config/firebase.ts`
2. **Stripe Keys:** Configure in Firebase Console > Functions > Environment variables
3. **Other APIs:** Set up in Firebase Console as needed

## Continuous Deployment (Optional)

To set up automatic deployments from GitHub:

```bash
# During firebase init hosting
# Choose "Yes" for GitHub integration
# Follow the prompts to connect your repository
```

## Monitoring and Analytics

After deployment:

1. **Monitor Performance:** Firebase Console > Performance
2. **View Analytics:** Firebase Console > Analytics
3. **Check Logs:** Firebase Console > Functions > Logs

## Rollback (if needed)

To rollback to a previous deployment:

```bash
# List deployment history
firebase hosting:releases

# Rollback to specific version
firebase hosting:rollback <version-id>
```

## Summary

The complete deployment process involves:

1. ✅ Authentication and project selection
2. ✅ Firebase initialization
3. ✅ Build process
4. ✅ Deployment to Firebase Hosting

Your application is now live at: **https://skite-app.web.app**
