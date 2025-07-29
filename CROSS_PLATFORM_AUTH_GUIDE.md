# 🔄 Cross-Platform Authentication Guide

## 🎯 **Overview**
This guide explains how the S-Kite authentication system works across both mobile app and website, ensuring a seamless user experience with shared Firebase Auth and Firestore data.

## 🏗 **Architecture**

### **Shared Infrastructure**
- **Firebase Auth**: Single authentication system for both platforms
- **Firestore Collection**: `users/{uid}` - shared user data
- **Unified User Model**: Same data structure across platforms

### **Smart Auth Flow**
```
User Attempts Signup → Check if Account Exists → Guide to Login or Create Account
```

## 🔧 **Implementation Details**

### **1. Smart Signup Process**
```typescript
// 1. Check if user already exists
const existingUserCheck = await handleExistingUserSignup(email, password)

// 2. If exists, suggest login
if (existingUserCheck.shouldLogin) {
  // Show "Account exists, please sign in" message
  return
}

// 3. If new user, create account
const result = await signUpWithEmailAndPassword(email, password, userData)
// result.isNewUser indicates if Firestore document was created
```

### **2. Cross-Platform User Document Handling**
```typescript
// For mobile app users logging in via web
await ensureUserDocument(uid) // Creates document if missing

// For new web users
// Document created automatically during signup
```

### **3. Data Preservation**
- **Existing mobile app data**: Never overwritten
- **New web users**: Get fresh document with credits
- **Shared fields**: All platforms use same structure

## 📱 **Mobile App Integration**

### **Firebase Configuration**
Use the same Firebase project configuration:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCRwZBXkC2b1cMH2VAcnSGSqqUtFWwh-yg",
  authDomain: "skite-app.firebaseapp.com",
  projectId: "skite-app",
  storageBucket: "skite-app.firebasestorage.app",
  messagingSenderId: "347898821173",
  appId: "1:347898821173:web:a64976e482a16d43918f7c",
  measurementId: "G-SJ0P1F40WE"
}
```

### **User Document Structure**
```typescript
interface UserData {
  uid: string
  fullName: string
  email: string
  weight?: string
  experienceLevel: string
  termsAndConditions: boolean
  credits: number
  createdAt: any
  updatedAt: any
}
```

## 🌐 **Website Integration**

### **Smart Error Handling**
- **Email exists**: Guide to login instead of signup
- **Wrong password**: Clear error message
- **New user**: Seamless signup process

### **User Experience Flow**
1. **Signup attempt** with existing email
2. **Smart detection** of existing account
3. **Friendly message** suggesting login
4. **Seamless transition** to login form

## 🔒 **Security & Best Practices**

### **Data Protection**
- ✅ **No data loss**: Existing mobile app data preserved
- ✅ **No duplicates**: Single user per email
- ✅ **Consistent auth**: Same Firebase Auth across platforms

### **Error Handling**
- ✅ **Graceful failures**: Clear error messages
- ✅ **User guidance**: Helpful suggestions for next steps
- ✅ **Fallback mechanisms**: Document creation for edge cases

## 🧪 **Testing Scenarios**

### **Test Case 1: Mobile User → Website Login**
1. Create account on mobile app
2. Try to signup on website with same email
3. **Expected**: "Account exists, please sign in" message
4. Login successfully
5. **Expected**: Access to existing data and credits

### **Test Case 2: Website User → Mobile App**
1. Create account on website
2. Login on mobile app with same credentials
3. **Expected**: Access to same data and credits

### **Test Case 3: New User Signup**
1. Use completely new email
2. Signup on either platform
3. **Expected**: New account created with 0 credits

## 🚀 **Benefits**

### **For Users**
- 🔄 **Seamless experience** across platforms
- 📱 **No duplicate accounts** needed
- 💳 **Shared credits** between app and website
- 🔒 **Single sign-on** experience

### **For Development**
- 🏗 **Unified data model** across platforms
- 🔧 **Simplified maintenance** with shared auth
- 📊 **Single source of truth** for user data
- 🚀 **Scalable architecture** for future features

## 🔄 **Migration Guide**

### **For Existing Mobile App Users**
1. **No action required** - data automatically accessible
2. **Login on website** with existing credentials
3. **Credits and data** immediately available

### **For New Website Users**
1. **Signup normally** - new account created
2. **Login on mobile app** with same credentials
3. **Seamless experience** across platforms

## 📋 **Configuration Checklist**

### **Firebase Setup**
- [ ] Same Firebase project for both platforms
- [ ] Shared API keys and configuration
- [ ] Unified Firestore rules
- [ ] Consistent user document structure

### **Mobile App**
- [ ] Use shared Firebase config
- [ ] Implement same user data model
- [ ] Handle existing user scenarios
- [ ] Test cross-platform login

### **Website**
- [ ] Smart signup flow implemented
- [ ] Existing user detection working
- [ ] Seamless login integration
- [ ] Credit system functional

## 🎉 **Success Metrics**

- ✅ **Zero data loss** during cross-platform usage
- ✅ **Seamless user experience** across platforms
- ✅ **Unified credit system** working correctly
- ✅ **Clear error messages** for existing users
- ✅ **Consistent data model** across platforms

---

**This system ensures that whether users start on mobile or web, they have a unified experience with shared data and credits across both platforms.** 🚀 