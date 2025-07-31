import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Star, ArrowRight, Zap, ShoppingCart, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { CREDIT_BUNDLES, redirectToCheckout, CreditBundle, verifyPayment } from '../services/stripe'
import { Toast } from '../components/Toast'

export function Pricing() {
  const { currentUser, userData, refreshUserData } = useAuth()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedBundle, setSelectedBundle] = useState<CreditBundle | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  // Check for successful payment on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('session_id')
    const success = urlParams.get('success')

    if (sessionId && success === 'true') {
      // Verify the payment with our backend
      setTimeout(async () => {
        try {
          const isPaymentSuccessful = await verifyPayment(sessionId)
          if (isPaymentSuccessful) {
            await refreshUserData()
            setToastMessage('Payment successful! Credits have been added to your account.')
            setToastType('success')
            setShowToast(true)
          } else {
            setToastMessage('Payment verification failed. Please contact support if credits were not added.')
            setToastType('error')
            setShowToast(true)
          }
        } catch (error) {
          console.error('Error verifying payment:', error)
          setToastMessage('Payment verification failed. Please contact support if credits were not added.')
          setToastType('error')
          setShowToast(true)
        }
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }, 1000)
    }
  }, [refreshUserData])



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Kite Recommendation
              <span className="text-primary-600 dark:text-primary-400"> Credits</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Purchase credits to get personalized kite recommendations based on your conditions and experience level. 
              No subscription required - pay only for what you need.
            </p>
          </motion.div>
        </div>
      </section>



      {/* Credit Bundles Section */}
      <section className="section-padding bg-white dark:bg-gray-900 -mt-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kite Recommendation Credits
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Purchase credits to get personalized kite recommendations based on your conditions and experience level
            </p>
            
            {/* Current Credits Display */}
            {currentUser && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 inline-block">
                <div className="flex items-center justify-center space-x-3">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Current Credits</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {userData?.credits || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Credit Bundles Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {CREDIT_BUNDLES.map((bundle, index) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border ${
                  bundle.popular ? 'ring-2 ring-primary-500' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {bundle.popular && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                    <Star className="w-4 h-4 inline mr-1" />
                    Popular
                  </div>
                )}
                
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {bundle.name}
                    </h3>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      ${bundle.price}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {bundle.credits} kite recommendations
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Personalized recommendations
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Instant access
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        No expiration
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!currentUser) {
                        navigate('/login')
                        return
                      }
                      setIsProcessing(true)
                      setSelectedBundle(bundle)
                      redirectToCheckout(bundle, currentUser.uid, currentUser.email || '')
                        .catch((error) => {
                          console.error('Purchase error:', error)
                          setToastMessage('Failed to process purchase. Please try again.')
                          setToastType('error')
                          setShowToast(true)
                        })
                        .finally(() => {
                          setIsProcessing(false)
                          setSelectedBundle(null)
                        })
                    }}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isProcessing && selectedBundle?.id === bundle.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    {isProcessing && selectedBundle?.id === bundle.id ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </div>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* How Credits Work */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              How Credits Work
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 dark:text-primary-300 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Purchase Credits
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose a credit bundle that fits your needs
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 dark:text-primary-300 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Get Recommendations
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Use your credits to get personalized kite recommendations
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 dark:text-primary-300 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Enjoy Kiting
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Hit the water with confidence using your perfect kite
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about kite recommendation credits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'How do credits work?',
                answer: 'Each credit gives you one personalized kite recommendation. Credits never expire and can be used anytime you need advice on kite size and setup.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and Apple Pay for secure, one-time payments. No subscription required.'
              },
              {
                question: 'Do credits expire?',
                answer: 'No, credits never expire! You can use them anytime, whether it\'s tomorrow or next year. They\'re yours to keep.'
              },
              {
                question: 'How accurate are the recommendations?',
                answer: 'Our recommendations are based on your weight, experience level, wind conditions, and location. We use advanced algorithms to ensure the best kite size for your session.'
              },
              {
                question: 'Can I get a refund?',
                answer: 'Credits are non-refundable once purchased, but they never expire so you can use them whenever you need them.'
              },
              {
                question: 'Do I need to create an account?',
                answer: 'Yes, you need to be logged in to purchase and use credits. This ensures your recommendations are personalized and your credits are safely stored.'
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 dark:bg-primary-700">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for perfect kite recommendations?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Get personalized kite size advice based on your conditions and experience level
            </p>
            <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-flex items-center">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
} 