import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRwZBXkC2b1cMH2VAcnSGSqqUtFWwh-yg",
  authDomain: "skite-app.firebaseapp.com",
  projectId: "skite-app",
  storageBucket: "skite-app.firebasestorage.app",
  messagingSenderId: "347898821173",
  appId: "1:347898821173:web:a64976e482a16d43918f7c",
  measurementId: "G-SJ0P1F40WE"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app 