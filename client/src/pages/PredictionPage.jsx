import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PredictionPage = () => {
  const [formData, setFormData] = useState({
    // Patient Demographics
    age: '',
    gender: '',
    
    // ERG Parameters - A-wave
    aWaveAmplitude: '',
    aWaveLatency: '',
    
    // ERG Parameters - B-wave
    bWaveAmplitude: '',
    bWaveLatency: '',
    
    // Additional ERG Parameters
    flickerAmplitude: '',
    flickerLatency: '',
    oscillatoryPotentials: '',
    
    // Clinical Parameters
    symptoms: [],
    riskFactors: []
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || result.message || `Server error: ${response.status}`)
      }

      setPrediction(result)
    } catch (err) {
      console.error('Prediction error:', err)
      setError(err.message || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      age: '',
      gender: '',
      aWaveAmplitude: '',
      aWaveLatency: '',
      bWaveAmplitude: '',
      bWaveLatency: '',
      flickerAmplitude: '',
      flickerLatency: '',
      oscillatoryPotentials: '',
      symptoms: [],
      riskFactors: []
    })
    setPrediction(null)
    setError(null)
  }

  const symptomsOptions = [
    'Fatigue',
    'Abdominal swelling',
    'Jaundice',
    'Loss of appetite',
    'Nausea',
    'Weakness',
    'Weight loss',
    'Confusion',
    'Swelling in legs'
  ]

  const riskFactorsOptions = [
    'Alcohol abuse',
    'Hepatitis B',
    'Hepatitis C',
    'Fatty liver disease',
    'Autoimmune hepatitis',
    'Hemochromatosis',
    'Wilson disease',
    'Alpha-1 antitrypsin deficiency'
  ]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-5"
    >
      <div className="container-sm">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1>🔬 LivSoul Prediction Tool</h1>
          <p>
            Enter ERG (Electroretinography) test results and clinical information 
            to get an AI-powered assessment of liver cirrhosis risk.
          </p>
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="alert alert-warning mb-4"
        >
          <strong>⚠️ Medical Disclaimer:</strong> This prediction tool is for educational and research purposes only. 
          It is not a substitute for professional medical advice, diagnosis, or treatment. 
          Always consult qualified healthcare providers for medical concerns.
        </motion.div>

        <div className="grid grid-2 gap-8">
          {/* Prediction Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="card"
          >
            <div className="card-body">
              <h2 className="mb-4">📋 Patient Information & ERG Data</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Demographics */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-primary-blue">Patient Demographics</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        name="age"
                        className="form-input"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="18"
                        max="100"
                        required
                        placeholder="Enter age"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ERG A-wave Parameters */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-primary-blue">ERG A-wave Parameters</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">A-wave Amplitude (μV)</label>
                      <input
                        type="number"
                        name="aWaveAmplitude"
                        className="form-input"
                        value={formData.aWaveAmplitude}
                        onChange={handleInputChange}
                        step="0.1"
                        required
                        placeholder="e.g., 150.5"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">A-wave Latency (ms)</label>
                      <input
                        type="number"
                        name="aWaveLatency"
                        className="form-input"
                        value={formData.aWaveLatency}
                        onChange={handleInputChange}
                        step="0.1"
                        required
                        placeholder="e.g., 15.2"
                      />
                    </div>
                  </div>
                </div>

                {/* ERG B-wave Parameters */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-primary-blue">ERG B-wave Parameters</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">B-wave Amplitude (μV)</label>
                      <input
                        type="number"
                        name="bWaveAmplitude"
                        className="form-input"
                        value={formData.bWaveAmplitude}
                        onChange={handleInputChange}
                        step="0.1"
                        required
                        placeholder="e.g., 250.8"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">B-wave Latency (ms)</label>
                      <input
                        type="number"
                        name="bWaveLatency"
                        className="form-input"
                        value={formData.bWaveLatency}
                        onChange={handleInputChange}
                        step="0.1"
                        required
                        placeholder="e.g., 45.6"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional ERG Parameters */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-primary-blue">Additional ERG Parameters</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Flicker Amplitude (μV)</label>
                      <input
                        type="number"
                        name="flickerAmplitude"
                        className="form-input"
                        value={formData.flickerAmplitude}
                        onChange={handleInputChange}
                        step="0.1"
                        required
                        placeholder="e.g., 85.3"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Flicker Latency (ms)</label>
                      <input
                        type="number"
                        name="flickerLatency"
                        className="form-input"
                        value={formData.flickerLatency}
                        onChange={handleInputChange}
                        step="0.1"
                        required
                        placeholder="e.g., 28.4"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Oscillatory Potentials (μV)</label>
                    <input
                      type="number"
                      name="oscillatoryPotentials"
                      className="form-input"
                      value={formData.oscillatoryPotentials}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                      placeholder="e.g., 65.7"
                    />
                  </div>
                </div>

                {/* Symptoms */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-primary-blue">Current Symptoms</h3>
                  <div className="grid grid-3 gap-2">
                    {symptomsOptions.map(symptom => (
                      <label key={symptom} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={symptom}
                          checked={formData.symptoms.includes(symptom)}
                          onChange={(e) => handleCheckboxChange(e, 'symptoms')}
                        />
                        <span className="text-sm">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-primary-blue">Risk Factors</h3>
                  <div className="grid grid-2 gap-2">
                    {riskFactorsOptions.map(factor => (
                      <label key={factor} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={factor}
                          checked={formData.riskFactors.includes(factor)}
                          onChange={(e) => handleCheckboxChange(e, 'riskFactors')}
                        />
                        <span className="text-sm">{factor}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    🔄 Reset
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Analyzing...
                      </>
                    ) : (
                      '🔬 Get Prediction'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {error && (
              <div className="alert alert-error mb-4">
                <strong>❌ Error:</strong> {error}
              </div>
            )}

            {prediction && (
              <div className="card">
                <div className="card-body">
                  <h2 className="mb-4">📊 Prediction Results</h2>
                  
                  {/* Risk Score */}
                  <div className="text-center mb-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="text-3xl font-bold text-primary-blue mb-2">
                      {(prediction.probability * 100).toFixed(1)}%
                    </div>
                    <div className="text-lg font-semibold">
                      Risk Probability
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div className={`alert mb-4 ${
                    prediction.riskLevel === 'High' ? 'alert-error' :
                    prediction.riskLevel === 'Medium' ? 'alert-warning' :
                    'alert-success'
                  }`}>
                    <strong>Risk Level:</strong> {prediction.riskLevel}
                  </div>

                  {/* Interpretation */}
                  <div className="mb-4">
                    <h3 className="mb-2">🎯 Interpretation</h3>
                    <p>{prediction.interpretation}</p>
                  </div>

                  {/* Recommendations */}
                  <div className="mb-4">
                    <h3 className="mb-2">💡 Recommendations</h3>
                    <ul className="space-y-1">
                      {prediction.recommendations?.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary-blue">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Important Note */}
                  <div className="alert alert-info">
                    <strong>📋 Important:</strong> This prediction is based on ERG patterns and should be 
                    confirmed by comprehensive medical examination including blood tests, imaging, and 
                    clinical assessment by qualified healthcare professionals.
                  </div>
                </div>
              </div>
            )}

            {/* Information Card */}
            {!prediction && !error && (
              <div className="card">
                <div className="card-body">
                  <h2 className="mb-4">ℹ️ About ERG Testing</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">What is ERG?</h3>
                      <p>
                        Electroretinography (ERG) measures the electrical responses of the retina 
                        to light stimulation. Recent research suggests correlations between retinal 
                        function and liver health.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Key Parameters</h3>
                      <ul className="space-y-1">
                        <li><strong>A-wave:</strong> Photoreceptor response</li>
                        <li><strong>B-wave:</strong> Bipolar cell response</li>
                        <li><strong>Flicker:</strong> Cone cell function</li>
                        <li><strong>Oscillatory Potentials:</strong> Amacrine cell activity</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Normal Ranges</h3>
                      <ul className="space-y-1 text-sm">
                        <li>A-wave Amplitude: 100-200 μV</li>
                        <li>A-wave Latency: 10-20 ms</li>
                        <li>B-wave Amplitude: 200-400 μV</li>
                        <li>B-wave Latency: 40-60 ms</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}

export default PredictionPage