import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LivSoul</h4>
            <p>
              Dedicated to providing comprehensive information about liver cirrhosis, 
              prevention strategies, and AI-powered prediction tools to help improve 
              liver health outcomes worldwide.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Cirrhosis</a></li>
              <li><a href="/statistics">Statistics</a></li>
              <li><a href="/prediction">Prediction Tool</a></li>
              <li><a href="/prevention">Prevention</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Medical Information</h4>
            <ul>
              <li><a href="#symptoms">Symptoms</a></li>
              <li><a href="#causes">Causes</a></li>
              <li><a href="#treatment">Treatment</a></li>
              <li><a href="#research">Latest Research</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact & Support</h4>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            <strong>Medical Disclaimer:</strong> This website is for educational purposes only. 
            The prediction tool is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always consult with qualified healthcare providers for medical concerns.
          </p>
          <p>
            © 2024 LivSoul. All rights reserved. | 
            Developed for educational and research purposes.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer