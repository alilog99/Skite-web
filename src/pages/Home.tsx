import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wind,
  Shield,
  CheckCircle,
  Cloud,
  Navigation,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import bgBanner from "../assets/bg-banner.png";
import womanKitesurfing from "../assets/skite website assets/woman-kitesurfing.png";
import manKitesurfing from "../assets/skite website assets/man-kitesurfing.png";

export function Home() {
  const features = [
    {
      icon: Cloud,
      title: "Real-time Weather Analysis",
      description:
        "Get accurate wind forecasts and weather conditions for your location.",
    },
    {
      icon: Wind,
      title: "Smart Kite Recommendations",
      description:
        "Physics-based calculations for optimal kite size based on your weight and conditions.",
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description:
        "Advanced safety analysis to help you make informed decisions on the water.",
    },
    {
      icon: Navigation,
      title: "Location-Based Insights",
      description:
        "GPS-powered suggestions for the best spots and conditions in your area.",
    },
  ];

  const benefits = [
    "Choose the right kite size for any conditions",
    "Get real-time wind and weather updates",
    "Assess risks before hitting the water",
    "Save multiple rider profiles",
    "Offline forecast access",
    "Multi-language and unit system support",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen sm:min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={bgBanner}
            alt="Kitesurfing background"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Woman Kitesurfer Image */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10"
          >
            <img
              src={womanKitesurfing}
              alt="Woman kitesurfing"
              className="w-96 h-96 sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] xl:w-[900px] xl:h-[900px] object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
          <button className="w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
          <button className="w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="container-custom relative z-20 flex justify-start">
          <div className="max-w-4xl lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Fly Smarter
                <span className="text-blue-400 block">
                  With S-Kite
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                S-Kite helps you choose the right kite size and evaluate weather
                conditions based on your skill, weight, and location. Make
                safer, smarter decisions on the water.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                <Link
                  to="/signup"
                  className="btn-primary inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  to="/features"
                  className="btn-secondary inline-flex items-center justify-center border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
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
              Built specifically for kitesurfers and windsurfers with advanced
              weather analysis
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
                S-Kite provides all the tools you need to make informed
                decisions on the water, whether you're a beginner or an
                experienced rider.
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
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* S-Kite Assistant Card */}
              <div className="relative w-80 h-80 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-xl p-6 border border-blue-200 dark:border-blue-800 flex flex-col justify-center">
                {/* Top Right Corner Icon */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>

                {/* Bottom Left Corner Icon */}
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>

                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-blue-200 dark:bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Wind className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    S-Kite Assistant
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Smart kite recommendations
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Wind Speed:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      18 knots
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Recommended Kite:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      12m²
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Risk Level:
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      Low
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to Fly Smarter Section */}
      <section className="bg-blue-600 py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-left">
                Ready to fly smarter?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl text-left">
                Join thousands of kitesurfers who trust S-Kite for safer, more informed sessions
              </p>
              <div className="text-left">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
                >
                  Start Flying Smarter
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <img
                src={manKitesurfing}
                alt="Male kitesurfer"
                className="w-80 h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
