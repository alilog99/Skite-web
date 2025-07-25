import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Features } from './pages/Features'
import { Pricing } from './pages/Pricing'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ForgotPassword } from './pages/ForgotPassword'
import { Contact } from './pages/Contact'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App 