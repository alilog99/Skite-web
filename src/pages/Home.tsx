import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wind,
  Shield,
  CheckCircle,
  Cloud,
  Navigation,
} from "lucide-react";
import manKitesurfing from "../assets/skite website assets/man-kitesurfing.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
// Responsive images now handled by <picture> element with srcSet


export function Home() {
  // Scroll animation hooks for different sections
  const featuresAnimation = useScrollAnimation();
  const benefitsAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();

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
    "Find the best kitesurfing spots near you",
    "Offline forecast access",
    "Multi-language and unit system support",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center overflow-hidden">
  {/* ✅ Responsive hero background image */}
  <picture>
    <source
      media="(max-width: 640px)"
      srcSet="/src/assets/skite website assets/images/woman-kitesurfing-640.png"
    />
    <source
      media="(max-width: 960px)"
      srcSet="/src/assets/skite website assets/images/woman-kitesurfing-960.png"
    />
    <source
      media="(max-width: 1280px)"
      srcSet="/src/assets/skite website assets/images/woman-kitesurfing-1280.png"
    />
    <img
      src="/src/assets/skite website assets/images/woman-kitesurfing-1920.png"
      alt="Woman kitesurfing"
      className="kitesurfing-image"
    />
  </picture>

  {/* Overlay for better text contrast */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 z-[0]"></div>

  {/* Hero text & buttons */}
  <div className="container-custom relative z-10 flex justify-start">
          <div className="hero-content max-w-4xl lg:max-w-2xl">
            <div className="text-left">
              <h1 className="hero-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                <span className="text-gradient-animate">Fly Smarter</span>
                <span className="text-blue-400 block animate-fade-in-left animate-delay-300">With S-Kite</span>
              </h1>
              <p className="hero-description text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-5 sm:mb-6 md:mb-8 max-w-xl md:max-w-2xl leading-relaxed">
                S-Kite helps you choose the right kite size and evaluate weather
                conditions based on your skill, weight, and location. Make safer,
                smarter decisions on the water.
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start max-w-md sm:max-w-none">
                <Link
                  to="/signup"
                  className="btn-animate btn-primary text-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg hover-glow animate-pulse group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 inline transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/features"
                  className="btn-animate btn-secondary text-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg hover-lift"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section ref={featuresAnimation.ref} className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className={`text-center mb-12 md:mb-16 ${featuresAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose S-Kite?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced technology meets kitesurfing expertise to keep you safe
              and maximize your time on the water.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`card-hover text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${
                  featuresAnimation.isVisible 
                    ? `animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 800)}` 
                    : 'opacity-0'
                }`}
              >
                <div className="card-icon inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg mb-4 animate-float">
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsAnimation.ref} className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`${benefitsAnimation.isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Everything You Need for Safe Kitesurfing
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                From beginners to pros, S-Kite provides the tools and insights
                you need to make every session count.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={manKitesurfing}
                alt="Kitesurfer in action"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaAnimation.ref} className="py-16 md:py-24 bg-primary-600 dark:bg-primary-700">
        <div className="container-custom text-center">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Elevate Your Kitesurfing?
              </h2>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of kitesurfers who trust S-Kite for safer, smarter
              sessions on the water.
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-none">
                <Link
                  to="/signup"
                className="bg-white text-primary-600 px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link
                to="/features"
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105"
              >
                View Features
                </Link>
              </div>
            </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsAnimation.ref} className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Sessions Analyzed" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
            <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
            </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
