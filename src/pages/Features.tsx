import { motion } from 'framer-motion'
import { 
  Wind, 
  Cloud, 
  Shield, 
  Navigation, 
  Download, 
  Globe, 
  User, 
  Settings,
  Star,
  Quote,
  Zap,
  MapPin
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Cloud,
      title: 'Real-time Wind & Weather Analysis',
      description: 'Get accurate wind forecasts and weather conditions using OpenWeatherMap API.',
      details: ['Live wind speed and direction', 'Gust analysis', 'Weather alerts', 'Hourly forecasts']
    },
    {
      icon: Wind,
      title: 'Smart Kite Size Recommendations',
      description: 'Physics-based calculations for optimal kite size based on your weight and conditions.',
      details: ['Weight and altitude calculations', 'Air density adjustments', 'Wind speed analysis', 'Skill level considerations']
    },
    {
      icon: Shield,
      title: 'Risk Assessment Engine',
      description: 'Advanced safety analysis to help you make informed decisions on the water.',
      details: ['Condition evaluation', 'Safety warnings', 'Experience-based recommendations', 'Emergency protocols']
    },
    {
      icon: Download,
      title: 'Offline Forecast Mode',
      description: 'Access weather data and recommendations even without internet connection.',
      details: ['Cached forecasts', 'Offline calculations', 'Local data storage', 'Sync when online']
    },
    {
      icon: MapPin,
      title: 'Location-Based Suggestions',
      description: 'GPS-powered recommendations for the best spots and conditions in your area.',
      details: ['Spot recommendations', 'Local wind patterns', 'Tide information', 'Launch site details']
    },
    {
      icon: Globe,
      title: 'Multi-language & Unit Support',
      description: 'Support for multiple languages and unit systems (metric/imperial).',
      details: ['Multiple languages', 'Unit preferences', 'Regional settings', 'Customizable display']
    }
  ]

  const testimonials = [
    {
      name: 'Alex Rodriguez',
      role: 'Professional Kitesurfer',
      company: 'Pro Kite Team',
      content: 'S-Kite has revolutionized how I prepare for sessions. The kite size recommendations are spot-on every time.',
      rating: 5
    },
    {
      name: 'Sarah Chen',
      role: 'Kitesurfing Instructor',
      company: 'Wind & Wave Academy',
      content: 'I recommend S-Kite to all my students. The risk assessment feature helps beginners make safer decisions.',
      rating: 5
    },
    {
      name: 'Mike Thompson',
      role: 'Weekend Warrior',
      company: 'Local Kite Community',
      content: 'The offline mode is a game-changer. I can check conditions even at remote spots without signal.',
      rating: 5
    }
  ]

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
              Powerful Features for
              <span className="text-primary-600 dark:text-primary-400"> Smart Riders</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover all the features that make S-Kite the perfect companion for kitesurfers and windsurfers. 
              Built with advanced weather analysis and physics-based calculations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
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
              Built with Advanced Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              S-Kite leverages cutting-edge technologies to deliver accurate, reliable recommendations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'OpenWeatherMap API', description: 'Real-time weather data' },
              { name: 'Physics Engine', description: 'Kite size calculations' },
              { name: 'GPS Integration', description: 'Location-based insights' },
              { name: 'Offline Capability', description: 'Works without internet' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              What Riders Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied kitesurfers who trust S-Kite for safer, more informed sessions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 