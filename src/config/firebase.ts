import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration - NEW from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCRwZBXkC2b1cMH2VAcnSGSqqUtFWwh-yg",
  authDomain: "skite-app.firebaseapp.com",
  projectId: "skite-app",
  storageBucket: "skite-app.firebasestorage.app",
  messagingSenderId: "347898821173",
  appId: "1:347898821173:web:3a3cbd13e2cba475918f7c",
  measurementId: "G-H3NLM246JZ"
}

// Debug: Log configuration (remove in production)
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? '***' + firebaseConfig.apiKey.slice(-4) : 'missing',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId ? '***' + firebaseConfig.appId.slice(-4) : 'missing',
  measurementId: firebaseConfig.measurementId
})

// Verify Firebase is properly initialized
console.log('Firebase app initialized:', !!firebaseConfig.apiKey && !!firebaseConfig.projectId)

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Test auth initialization
console.log('Auth instance created:', !!auth)
console.log('Auth app:', auth.app.name)

// Test if we can access Firebase Auth methods
try {
  console.log('Auth currentUser:', auth.currentUser)
  console.log('Auth ready to use!')
} catch (error) {
  console.error('Auth initialization error:', error)
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app 