import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutCirrhosisPage from './pages/AboutCirrhosisPage'
import StatisticsPage from './pages/StatisticsPage'
import PredictionPage from './pages/PredictionPage'
import PreventionPage from './pages/PreventionPage'
import AuthModal from './components/AuthModal'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutCirrhosisPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/prediction" element={<PredictionPage />} />
              <Route path="/prevention" element={<PreventionPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App