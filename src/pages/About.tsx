import { motion } from "framer-motion";
import {
  Wind,
  Shield,
  Target,
  Users,
  Award,
  Heart,
  Zap,
  Globe,
  CloudRain,
  Code,
} from "lucide-react";

export function About() {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "We prioritize your safety above all else, providing accurate risk assessments and weather analysis to keep you safe on the water.",
    },
    {
      icon: Target,
      title: "Precision",
      description:
        "Our algorithms use advanced physics calculations and real-time data to give you the most accurate kite size recommendations.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Built by kitesurfers for kitesurfers. We understand the sport because we live and breathe it every day.",
    },
    {
      icon: Globe,
      title: "Global Community",
      description:
        "Connecting kitesurfers worldwide with location-based insights and a growing community of passionate riders.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "50+", label: "Countries" },
    { number: "1M+", label: "Sessions Analyzed" },
    { number: "99.9%", label: "Uptime" },
  ];

  const team = [
    {
      name: "Marcus Storm",
      role: "Founder & Weather Expert",
      description: "Professional kitesurfer and certified meteorologist with 12+ years on the water. Created S-Kite after a near-miss in changing conditions taught him the importance of accurate weather analysis.",
      expertise: "Weather Analysis • Risk Assessment • Kite Safety",
      icon: CloudRain,
      color: "from-blue-500 to-cyan-600",
    },
    {
      name: "Luna Wave",
      role: "Lead Developer & UX Designer",
      description: "Full-stack developer and passionate kitesurfer who's been riding for 8 years. Specializes in creating intuitive apps that work perfectly in marine environments.",
      expertise: "Mobile Development • User Experience • Data Visualization",
      icon: Code,
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "The S-Kite Community",
      role: "Beta Testers & Advisors",
      description: "Over 500 experienced kitesurfers from 25+ countries who help us test features, validate weather models, and ensure S-Kite works in real-world conditions.",
      expertise: "Global Testing • Local Knowledge • Safety Feedback",
      icon: Users,
      color: "from-green-500 to-emerald-600",
      isTeam: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About S-Kite
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Built by kitesurfers, for kitesurfers. We're on a mission to make every 
              session safer through intelligent weather analysis and community-driven insights.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-white/30 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                S-Kite was born from a simple truth: the difference between an epic session 
                and a dangerous one often comes down to understanding the conditions. After 
                witnessing too many close calls caused by poor weather judgment, we knew 
                the kitesurfing community needed something better.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We combine real-time meteorological data, physics-based kite calculations, 
                and insights from thousands of experienced riders to give you the confidence 
                to make smart decisions on the water. Because the best session is always 
                a safe session.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Wind className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Smart Weather Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Real-time data from multiple sources
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 h-96 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Safety Through Technology</h3>
                  <p className="text-white/90 text-lg">Making every session safer and smarter</p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <CloudRain className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at S-Kite
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join the growing community of kitesurfers who trust S-Kite for safer sessions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
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

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate kitesurfers and developers working to make your sessions safer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className={`w-full h-full bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <member.icon className="w-16 h-16 text-white" />
                  </div>
                  {member.isTeam ? (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">500+</span>
                    </div>
                  ) : (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Wind className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {member.description}
                </p>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Expertise
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {member.expertise}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Fly Smarter?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of kitesurfers who trust S-Kite for safer, more informed sessions on the water.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
              >
                Get Started Free
                <Zap className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
              >
                Contact Us
                <Users className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
