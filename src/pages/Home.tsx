import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Wind, Zap, Shield, Users, CheckCircle, Cloud, Navigation } from 'lucide-react'

export function Home() {
  const features = [
    {
      icon: Cloud,
      title: 'Real-time Weather Analysis',
      description: 'Get accurate wind forecasts and weather conditions for your location.',
    },
    {
      icon: Wind,
      title: 'Smart Kite Recommendations',
      description: 'Physics-based calculations for optimal kite size based on your weight and conditions.',
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Advanced safety analysis to help you make informed decisions on the water.',
    },
    {
      icon: Navigation,
      title: 'Location-Based Insights',
      description: 'GPS-powered suggestions for the best spots and conditions in your area.',
    },
  ]

  const benefits = [
    'Choose the right kite size for any conditions',
    'Get real-time wind and weather updates',
    'Assess risks before hitting the water',
    'Save multiple rider profiles',
    'Offline forecast access',
    'Multi-language and unit system support',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Fly Smarter with
                <span className="text-primary-600 dark:text-primary-400"> S-Kite</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                S-Kite helps you choose the right kite size and evaluate weather conditions based on your skill, weight, and location. 
                Make safer, smarter decisions on the water.
              </p>
                                      <div className="flex flex-col sm:flex-row gap-4">
                          <Link to="/signup" className="btn-primary inline-flex items-center">
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Link>
                          <Link to="/features" className="btn-secondary inline-flex items-center">
                            Learn More
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Link>
                        </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Mock App Screenshot */}
              <div className="relative mx-auto max-w-sm">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-2">
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-2xl p-6 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Wind className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        S-Kite Assistant
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Smart kite recommendations
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Wind Speed:</span>
                          <span className="font-semibold">18 knots</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recommended Kite:</span>
                          <span className="font-semibold">12m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Level:</span>
                          <span className="font-semibold text-green-600">Low</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-primary-500 rounded-full p-3 shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-500 rounded-full p-3 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose S-Kite?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built specifically for kitesurfers and windsurfers with advanced weather analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Everything you need for safer sessions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                S-Kite provides all the tools you need to make informed decisions on the water, 
                whether you're a beginner or an experienced rider.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-600 h-4 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-600 h-4 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-600 h-4 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-600 h-4 rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>
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
                        Start Flying Smarter
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 