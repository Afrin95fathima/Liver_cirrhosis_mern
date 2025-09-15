import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Cirrhosis' },
    { path: '/statistics', label: 'Statistics' },
    { path: '/prediction', label: 'Prediction' },
    { path: '/prevention', label: 'Prevention' }
  ]

  const handleAuthModal = (mode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon" style={{
              background: 'linear-gradient(135deg, #2563eb, #60a5fa)',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: 'white',
              boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)'
            }}>
              💙
            </div>
            <span>LivSoul</span>
          </Link>

          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Authentication Section */}
          <div className="nav-auth">
            {isAuthenticated ? (
              <div className="nav-user-menu">
                <div className="user-info">
                  <div className="user-avatar">
                    {user?.role === 'doctor' ? '👨‍⚕️' : '👤'}
                  </div>
                  <div className="user-details">
                    <span className="user-name">{user?.name}</span>
                    <span className="user-role">{user?.role}</span>
                  </div>
                </div>
                <div className="user-actions">
                  <Link to="/dashboard" className="nav-button dashboard-btn">
                    📊 Dashboard
                  </Link>
                  <button onClick={handleLogout} className="nav-button logout-btn">
                    🚪 Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="nav-auth-buttons">
                <button 
                  onClick={() => handleAuthModal('login')}
                  className="nav-button login-btn"
                >
                  🔐 Sign In
                </button>
                <button 
                  onClick={() => handleAuthModal('register')}
                  className="nav-button register-btn"
                >
                  ✨ Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  )
}

export default Navbar