import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon, LogOut, User } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useAuth } from '../contexts/AuthContext'
import { signOutUser } from '../services/firebase'
import skiteLogo from '../assets/logo/SKite-Logo-Source.svg'
// Original image not needed - using responsive srcSet versions
import womanKitesurfing640 from '../assets/skite website assets/images/woman-kitesurfing-640.png'
import womanKitesurfing960 from '../assets/skite website assets/images/woman-kitesurfing-960.png'
import womanKitesurfing1280 from '../assets/skite website assets/images/woman-kitesurfing-1280.png'
import womanKitesurfing1920 from '../assets/skite website assets/images/woman-kitesurfing-1920.png'
// Using responsive srcSet for optimal image loading

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { theme, setTheme } = useTheme()
  const { currentUser, userData } = useAuth()
  const navigate = useNavigate()

  // Header uses srcSet for responsive images (see img element below)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOutUser()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ]

  if (currentUser) {
    navigation.push({ name: 'Dashboard', href: '/dashboard' })
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
      {/* ✅ Background Image (Responsive Fix) */}
      <div className="header-bg-image absolute inset-0 opacity-10 dark:opacity-5 overflow-hidden">
        
      <img
  src={womanKitesurfing1280}
  srcSet={`
    ${womanKitesurfing640} 640w,
    ${womanKitesurfing960} 960w,
    ${womanKitesurfing1280} 1280w,
    ${womanKitesurfing1920} 1920w
  `}
  sizes="100vw"
  alt="Woman kitesurfing"
  className="kitesurfing-image"
/>

        {/* Header uses responsive srcSet - mobile images load automatically */}
        <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/30"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={skiteLogo}
              alt="S-Kite Logo"
              className="h-8 w-auto dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <User className="w-4 h-4" />
                    <span className="text-sm">
                      Hi, {userData?.fullName || currentUser.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                  <Link to="/signup" className="btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700"
          >
            <nav className="py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mb-3">
                      <User className="w-4 h-4" />
                      <span className="text-sm">
                        Hi, {userData?.fullName || currentUser.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      disabled={isLoggingOut}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="inline-flex btn-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}