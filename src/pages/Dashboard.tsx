import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  CreditCard, 
  Settings, 
  LogOut, 
  Crown, 
  Users, 
  BarChart3,
  Download,
  Upload,
  Shield,
  Wind,
  Cloud,
  MapPin,
  Calendar
} from 'lucide-react'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data - replace with Firebase auth
  const user = {
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    plan: 'Pro',
    planStatus: 'active',
    nextBilling: '2024-02-15',
    usage: {
      forecasts: 45,
      sessions: 12,
      locations: 8
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'subscription', name: 'Subscription', icon: Crown },
    { id: 'profile', name: 'Rider Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const stats = [
    {
      label: 'Forecasts This Month',
      value: user.usage.forecasts,
      icon: Cloud,
      color: 'text-blue-600'
    },
    {
      label: 'Sessions Logged',
      value: user.usage.sessions,
      icon: Wind,
      color: 'text-green-600'
    },
    {
      label: 'Locations Saved',
      value: user.usage.locations,
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      label: 'Safety Score',
      value: '95%',
      icon: Shield,
      color: 'text-green-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome back, {user.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2">
                <Crown className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.plan} Plan
                </span>
              </div>
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Sessions
                  </h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Session at Maui Bay', time: '2 days ago', conditions: '18 knots, 12m kite' },
                      { action: 'Forecast checked for tomorrow', time: '1 day ago', conditions: '15-20 knots' },
                      { action: 'New spot added', time: '3 days ago', conditions: 'Kailua Beach' },
                      { action: 'Profile updated', time: '1 week ago', conditions: 'Weight: 75kg' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {activity.action}
                          </span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.conditions}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Cloud className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-700 dark:text-gray-300">Check Weather Forecast</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Wind className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-700 dark:text-gray-300">Get Kite Recommendation</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-700 dark:text-gray-300">Log Session</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Current Plan
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Crown className="w-8 h-8 text-primary-600" />
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {user.plan} Plan
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {user.planStatus === 'active' ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Next billing date: {user.nextBilling}
                    </p>
                    <div className="space-y-2">
                      <button className="w-full btn-primary">
                        Upgrade Plan
                      </button>
                      <button className="w-full btn-secondary">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Plan Features
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Unlimited forecasts
                      </li>
                      <li className="flex items-center text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        All locations
                      </li>
                      <li className="flex items-center text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Multiple profiles
                      </li>
                      <li className="flex items-center text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Priority support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Rider Profile
              </h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      defaultValue="75"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Skill Level
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>Beginner</option>
                      <option selected>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Units
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="units" value="metric" defaultChecked className="mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">Metric (km/h, kg)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="units" value="imperial" className="mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">Imperial (mph, lbs)</span>
                    </label>
                  </div>
                </div>
                <button className="btn-primary">
                  Save Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Account Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 