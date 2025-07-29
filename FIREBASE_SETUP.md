# Firebase Integration Setup

This document explains the Firebase integration for the S-Kite website.

## 🔧 Setup

### 1. Firebase Configuration
The Firebase configuration is stored in `src/config/firebase.ts` with the following services:
- **Authentication**: Email/password authentication
- **Firestore**: User data storage

### 2. Services
Firebase services are organized in `src/services/firebase.ts`:
- `signUpWithEmailAndPassword()` - User registration with Firestore data storage
- `signInWithEmailAndPassword()` - User login
- `signOutUser()` - User logout
- `getUserData()` - Fetch user data from Firestore
- `updateUserData()` - Update user data in Firestore
- `checkEmailExists()` - Check if email is already registered

### 3. Authentication Context
The `AuthContext` (`src/contexts/AuthContext.tsx`) provides:
- Current user state
- User data from Firestore
- Loading states
- Authentication state management

### 4. Protected Routes
The `ProtectedRoute` component ensures only authenticated users can access protected pages.

## 📋 User Data Structure

When a user signs up, the following data is stored in Firestore:

```typescript
{
  uid: string,                    // Firebase Auth UID
  fullName: string,              // User's full name
  email: string,                 // User's email
  weight?: string,               // Optional weight (kg)
  experienceLevel: string,       // 'beginner' | 'intermediate' | 'advanced' | 'expert'
  termsAndConditions: boolean,   // Terms acceptance
  createdAt: Timestamp,          // Account creation time
  updatedAt: Timestamp           // Last update time
}
```

## 🔐 Authentication Flow

### Signup Process:
1. User fills out signup form with name, email, password, etc.
2. Form validation (required fields, password strength, etc.)
3. Firebase Auth creates user account
4. User data is stored in Firestore with UID as document ID
5. User is automatically logged in and redirected to dashboard

### Login Process:
1. User enters email and password
2. Firebase Auth validates credentials
3. User data is fetched from Firestore
4. User is redirected to dashboard

### Logout Process:
1. User clicks logout button
2. Firebase Auth signs out user
3. User is redirected to home page

## 🛡️ Security Features

- **Password Validation**: Minimum 6 characters
- **Email Validation**: Proper email format
- **Terms Acceptance**: Required checkbox
- **Protected Routes**: Authentication-based access control
- **Error Handling**: User-friendly error messages for common auth errors

## 🚀 Usage

### In Components:
```typescript
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { currentUser, userData, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!currentUser) return <div>Please log in</div>
  
  return <div>Welcome, {userData?.fullName}!</div>
}
```

### For Authentication:
```typescript
import { signUpWithEmailAndPassword, signInWithEmailAndPassword } from '../services/firebase'

// Signup
await signUpWithEmailAndPassword(email, password, userData)

// Login
await signInWithEmailAndPassword(email, password)
```

## 🔧 Environment Variables (Optional)

For better security, you can move Firebase config to environment variables:

1. Create a `.env` file:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# ... other config values
```

2. Update `src/config/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... other values
}
```

## 📝 Notes

- The current implementation uses the Firebase config directly in the code
- All user data is stored in the `users` collection in Firestore
- Authentication state is managed globally through React Context
- Error handling includes specific Firebase error codes with user-friendly messages 