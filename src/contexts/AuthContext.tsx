import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from 'firebase/auth'
import { onAuthStateChanged } from '../services/firebase'
import { getUserData, UserData } from '../services/firebase'

interface AuthContextType {
  currentUser: User | null
  userData: UserData | null
  loading: boolean
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUserData = async () => {
    if (currentUser) {
      try {
        const data = await getUserData(currentUser.uid)
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setUserData(null)
      }
    } else {
      setUserData(null)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      setCurrentUser(user)
      
      if (user) {
        try {
          const data = await getUserData(user.uid)
          setUserData(data)
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUserData(null)
        }
      } else {
        setUserData(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userData,
    loading,
    refreshUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 