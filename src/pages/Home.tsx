import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Wind, Shield, CheckCircle, Cloud, Navigation } from 'lucide-react'
import headerImage from '../assets/header-img.jpeg'

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
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${headerImage})` }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-left">
                Fly Smarter With
                <span className="text-primary-300"> S-Kite</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl text-left">
                S-Kite helps you choose the right kite size and evaluate weather conditions based on your skill, weight, and location. 
                Make safer, smarter decisions on the water.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link to="/signup" className="btn-primary inline-flex items-center bg-white text-primary-600 hover:bg-gray-100">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/features" className="btn-secondary inline-flex items-center border-2 border-white text-primary-600 bg-white hover:bg-gray-100">
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
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
              {/* S-Kite Assistant Card */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl shadow-xl p-8 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                    <Wind className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      S-Kite Assistant
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Smart kite recommendations
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Wind Speed:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">18 knots</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Recommended Kite:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">12m²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Risk Level:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">Low</span>
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