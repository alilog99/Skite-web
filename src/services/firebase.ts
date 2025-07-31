import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut,
  UserCredential,
  User
} from 'firebase/auth'
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { auth, db } from '../config/firebase'

// User interface for TypeScript
export interface UserData {
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

// Smart signup function that handles existing users
export const signUpWithEmailAndPassword = async (
  email: string, 
  password: string, 
  userData: Omit<UserData, 'uid' | 'createdAt' | 'updatedAt'>
): Promise<{ userCredential: UserCredential; isNewUser: boolean }> => {
  try {
    // First, try to create the user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = userCredential.user

    // Check if user document already exists in Firestore (from mobile app)
    const userDocRef = doc(db, 'users', uid)
    const existingUserDoc = await getDoc(userDocRef)
    
    if (existingUserDoc.exists()) {
      // User exists in Firestore (from mobile app) - don't overwrite
      console.log('User document already exists in Firestore, preserving existing data')
      return { userCredential, isNewUser: false }
    } else {
      // New user - create document in Firestore
      const userDocument = {
        uid,
        fullName: userData.fullName,
        email: userData.email,
        weight: userData.weight || null,
        experienceLevel: userData.experienceLevel,
        termsAndConditions: userData.termsAndConditions,
        credits: 0, // Initialize with 0 credits
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      await setDoc(userDocRef, userDocument)
      return { userCredential, isNewUser: true }
    }
  } catch (error: any) {
    console.error('Error during signup:', error)
    throw error
  }
}

// Sign in function
export const signInWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await firebaseSignInWithEmailAndPassword(auth, email, password)
  } catch (error: any) {
    console.error('Error during signin:', error)
    throw error
  }
}

// Sign out function
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    console.error('Error during signout:', error)
    throw error
  }
}

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userDocRef)
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData
    } else {
      return null
    }
  } catch (error: any) {
    console.error('Error getting user data:', error)
    throw error
  }
}

// Update user data
export const updateUserData = async (uid: string, updates: Partial<UserData>): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', uid)
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
  } catch (error: any) {
    console.error('Error updating user data:', error)
    throw error
  }
}

// Check if email already exists
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', email))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  } catch (error: any) {
    console.error('Error checking email existence:', error)
    throw error
  }
}

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Auth state observer
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback)
}

// Credit management functions
export const addCredits = async (uid: string, creditsToAdd: number): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userDocRef)
    
    if (userDoc.exists()) {
      const currentCredits = userDoc.data().credits || 0
      await updateDoc(userDocRef, {
        credits: currentCredits + creditsToAdd,
        updatedAt: serverTimestamp()
      })
    }
  } catch (error: any) {
    console.error('Error adding credits:', error)
    throw error
  }
}

export const useCredits = async (uid: string, creditsToUse: number): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userDocRef)
    
    if (userDoc.exists()) {
      const currentCredits = userDoc.data().credits || 0
      
      if (currentCredits >= creditsToUse) {
        await updateDoc(userDocRef, {
          credits: currentCredits - creditsToUse,
          updatedAt: serverTimestamp()
        })
        return true
      }
      return false
    }
    return false
  } catch (error: any) {
    console.error('Error using credits:', error)
    throw error
  }
}

export const getCredits = async (uid: string): Promise<number> => {
  try {
    const userDocRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userDocRef)
    
    if (userDoc.exists()) {
      return userDoc.data().credits || 0
    }
    return 0
  } catch (error: any) {
    console.error('Error getting credits:', error)
    throw error
  }
}

// Smart auth helper functions for cross-platform compatibility
export const handleExistingUserSignup = async (email: string, password: string): Promise<{ success: boolean; message: string; shouldLogin: boolean }> => {
  try {
    // Try to sign in with the email/password to see if account exists
    await firebaseSignInWithEmailAndPassword(auth, email, password)
    
    // If successful, the account exists and password is correct
    return {
      success: true,
      message: 'Account already exists. Please sign in instead.',
      shouldLogin: true
    }
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      // Account doesn't exist - safe to proceed with signup
      return {
        success: true,
        message: 'Account does not exist. Proceeding with signup.',
        shouldLogin: false
      }
    } else if (error.code === 'auth/wrong-password') {
      // Account exists but wrong password
      return {
        success: false,
        message: 'Account already exists with a different password. Please sign in or use "Forgot Password".',
        shouldLogin: true
      }
    } else {
      // Other error
      throw error
    }
  }
}

// Ensure user document exists (for mobile app users logging in via web)
export const ensureUserDocument = async (uid: string, userData?: Partial<UserData>): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userDocRef)
    
    if (!userDoc.exists()) {
      // User exists in Auth but not in Firestore (edge case)
      console.log('User exists in Auth but not in Firestore, creating document')
      const currentUser = auth.currentUser
      
      if (currentUser) {
        const defaultUserData = {
          uid,
          fullName: currentUser.displayName || 'User',
          email: currentUser.email || '',
          weight: null,
          experienceLevel: 'Beginner',
          termsAndConditions: true,
          credits: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          ...userData // Override with provided data
        }
        
        await setDoc(userDocRef, defaultUserData)
      }
    }
  } catch (error: any) {
    console.error('Error ensuring user document:', error)
    throw error
  }
} 