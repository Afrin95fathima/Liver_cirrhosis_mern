import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomePage = () => {
  const features = [
    {
      icon: '🔬',
      title: 'AI-Powered Prediction',
      description: 'Advanced machine learning model trained on ERG data to predict liver cirrhosis risk with high accuracy.',
      link: '/prediction'
    },
    {
      icon: '📊',
      title: 'Global Statistics',
      description: 'Comprehensive data on liver cirrhosis prevalence, mortality rates, and trends worldwide and in India.',
      link: '/statistics'
    },
    {
      icon: '📚',
      title: 'Medical Information',
      description: 'Detailed information about liver cirrhosis causes, symptoms, stages, and treatment options.',
      link: '/about'
    },
    {
      icon: '🛡️',
      title: 'Prevention Strategies',
      description: 'Evidence-based guidelines for preventing liver cirrhosis and maintaining optimal liver health.',
      link: '/prevention'
    }
  ]

  const stats = [
    { number: '1.16M', label: 'Annual Deaths Globally' },
    { number: '2%', label: 'Global Population Affected' },
    { number: '200K+', label: 'Cases in India Annually' },
    { number: '85%', label: 'Prediction Accuracy' }
  ]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              💙 LivSoul
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl font-semibold mb-2"
            >
              AI-Powered Liver Health Prediction
            </motion.p>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Comprehensive medical information, global statistics, and AI-powered ERG prediction 
              tools for liver cirrhosis diagnosis and prevention. Your liver health companion.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/prediction" className="btn btn-primary btn-lg">
                🔬 Try Prediction Tool
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg">
                📚 Learn About Cirrhosis
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2>Global Impact of Liver Cirrhosis</h2>
            <p>Understanding the worldwide burden of liver cirrhosis through key statistics</p>
          </motion.div>

          <div className="grid grid-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2>Comprehensive Liver Health Platform</h2>
            <p>Everything you need to know about liver cirrhosis in one place</p>
          </motion.div>

          <div className="grid grid-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-body">
                  <div className="card-icon">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <Link to={feature.link} className="btn btn-outline">
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ERG Information Section */}
      <section className="py-5">
        <div className="container">
          <div className="grid grid-2">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>About ERG Technology</h2>
              <p>
                Electroretinography (ERG) is a diagnostic test that measures the electrical 
                activity of the retina in response to light stimulation. Recent research has 
                shown promising correlations between ERG patterns and liver function.
              </p>
              <ul>
                <li>Non-invasive diagnostic approach</li>
                <li>Quick and painless procedure</li>
                <li>Potential early detection of liver dysfunction</li>
                <li>Objective measurement of retinal response</li>
              </ul>
              <Link to="/prediction" className="btn btn-primary mt-3">
                Try ERG Prediction →
              </Link>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="card-body">
                <h3>🔬 How Our Prediction Works</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-blue font-bold">1.</span>
                    <div>
                      <strong>Data Input:</strong> Enter ERG test parameters including amplitude, latency, and wave characteristics.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-blue font-bold">2.</span>
                    <div>
                      <strong>AI Analysis:</strong> Machine learning model analyzes patterns in the ERG data.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-blue font-bold">3.</span>
                    <div>
                      <strong>Risk Assessment:</strong> Provides probability score for liver cirrhosis presence.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-blue font-bold">4.</span>
                    <div>
                      <strong>Recommendations:</strong> Suggests next steps based on risk level.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
        <div className="container text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-3">Ready to Get Started?</h2>
            <p className="mb-4 text-xl">
              Use our AI-powered prediction tool or explore comprehensive information about liver cirrhosis.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/prediction" className="btn btn-secondary btn-lg">
                🔬 Start Prediction
              </Link>
              <Link to="/statistics" className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-blue">
                📊 View Statistics
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}

export default HomePage