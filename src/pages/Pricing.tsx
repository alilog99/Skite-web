import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, X, Star, ArrowRight } from 'lucide-react'

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        '5 forecast requests/day',
        'Limited locations',
        'No profile history',
        'Community support'
      ],
      notIncluded: [
        'Unlimited forecasts',
        'All locations',
        'Profile history',
        'Priority support'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: { monthly: 9, yearly: 90 },
      description: 'For serious riders and enthusiasts',
      features: [
        'Unlimited forecasts',
        'All locations',
        'Save multiple profiles',
        'Priority support',
        'Advanced weather data',
        'Offline mode',
        'Custom alerts'
      ],
      notIncluded: [
        'Team features',
        'Admin dashboard'
      ],
      popular: true,
      cta: 'Start Pro Trial'
    },
    {
      name: 'Team',
      price: { monthly: 25, yearly: 250 },
      description: 'For schools and teams',
      features: [
        'Everything in Pro',
        'Team usage (multi-user access)',
        'Admin dashboard',
        'Usage analytics',
        'Instructor tools',
        'Student management',
        'Safety reporting'
      ],
      notIncluded: [],
      popular: false,
      cta: 'Start Team Trial'
    }
  ]

  const savings = billingCycle === 'yearly' ? 17 : 0

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
              Simple, Transparent
              <span className="text-primary-600 dark:text-primary-400"> Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your riding needs. All plans include a 14-day free trial. 
              No credit card required to start.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  billingCycle === 'yearly' ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Yearly
                {billingCycle === 'yearly' && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
                    Save {savings}%
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding -mt-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-sm font-medium text-white">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`card h-full ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${plan.price[billingCycle]}
                      </span>
                      {plan.price[billingCycle] > 0 && (
                        <span className="text-gray-500 dark:text-gray-400">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      )}
                    </div>
                    <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      plan.popular 
                        ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      {plan.cta}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded.length > 0 && (
                      <>
                        <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Not included:</h4>
                        <ul className="space-y-3">
                          {plan.notIncluded.map((feature) => (
                            <li key={feature} className="flex items-center">
                              <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                              <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Everything you need to know about S-Kite pricing and plans
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Can I change my plan anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, all paid plans include a 14-day free trial. No credit card required to start.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and Apple Pay for your convenience.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Absolutely. You can cancel your subscription at any time with no cancellation fees.'
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
              Ready to fly smarter?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of kitesurfers who trust S-Kite for safer, more informed sessions
            </p>
                                  <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-flex items-center">
                        Start Free Trial
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 