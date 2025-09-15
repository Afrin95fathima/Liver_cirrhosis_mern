import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    role: 'patient',
    // Medical information
    riskFactors: [],
    medicalHistory: {
      allergies: [],
      currentMedications: [],
      previousConditions: [],
      familyHistory: []
    },
    // Doctor-specific fields
    licenseNumber: '',
    specialization: '',
    hospital: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  // Available options
  const riskFactorOptions = [
    'Alcohol abuse',
    'Hepatitis B',
    'Hepatitis C',
    'Diabetes',
    'Obesity',
    'Family history',
    'Drug use',
    'Autoimmune disease'
  ];

  const specializationOptions = [
    'Hepatology',
    'Gastroenterology',
    'Internal Medicine',
    'Family Medicine',
    'Emergency Medicine',
    'Radiology',
    'Pathology'
  ];

  // Clear errors when component mounts or form data changes
  useEffect(() => {
    clearError();
    setValidationErrors({});
  }, [formData, clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && onRegisterSuccess) {
      onRegisterSuccess();
    }
  }, [isAuthenticated, onRegisterSuccess]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'riskFactors') {
      setFormData(prev => ({
        ...prev,
        riskFactors: checked 
          ? [...prev.riskFactors, value]
          : prev.riskFactors.filter(factor => factor !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear specific field error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      // Basic Information
      if (!formData.name.trim()) {
        errors.name = 'Full name is required';
      }
      
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email';
      }
      
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 2) {
      // Personal Information
      if (!formData.dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required';
      } else {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13 || age > 120) {
          errors.dateOfBirth = 'Please enter a valid date of birth';
        }
      }
      
      if (!formData.gender) {
        errors.gender = 'Gender is required';
      }
      
      if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (step === 3 && formData.role === 'doctor') {
      // Doctor-specific validation
      if (!formData.licenseNumber.trim()) {
        errors.licenseNumber = 'Medical license number is required';
      }
      
      if (!formData.specialization) {
        errors.specialization = 'Specialization is required';
      }
      
      if (!formData.hospital.trim()) {
        errors.hospital = 'Hospital/Clinic name is required';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    // Prepare final data
    const registrationData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone.trim() || undefined,
      licenseNumber: formData.role === 'doctor' ? formData.licenseNumber.trim() : undefined,
      specialization: formData.role === 'doctor' ? formData.specialization : undefined,
      hospital: formData.role === 'doctor' ? formData.hospital.trim() : undefined
    };

    const result = await register(registrationData);
    
    if (result.success && onRegisterSuccess) {
      onRegisterSuccess();
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={validationErrors.name ? 'error' : ''}
            disabled={loading}
          />
          <span className="input-icon">👤</span>
        </div>
        {validationErrors.name && (
          <span className="field-error">{validationErrors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <div className="input-wrapper">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={validationErrors.email ? 'error' : ''}
            disabled={loading}
          />
          <span className="input-icon">📧</span>
        </div>
        {validationErrors.email && (
          <span className="field-error">{validationErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className={validationErrors.password ? 'error' : ''}
            disabled={loading}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {validationErrors.password && (
          <span className="field-error">{validationErrors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="input-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={validationErrors.confirmPassword ? 'error' : ''}
            disabled={loading}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={loading}
          >
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {validationErrors.confirmPassword && (
          <span className="field-error">{validationErrors.confirmPassword}</span>
        )}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <div className="input-wrapper">
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={validationErrors.dateOfBirth ? 'error' : ''}
            disabled={loading}
            max={new Date().toISOString().split('T')[0]}
          />
          <span className="input-icon">📅</span>
        </div>
        {validationErrors.dateOfBirth && (
          <span className="field-error">{validationErrors.dateOfBirth}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <div className="input-wrapper">
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={validationErrors.gender ? 'error' : ''}
            disabled={loading}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <span className="input-icon">⚧️</span>
        </div>
        {validationErrors.gender && (
          <span className="field-error">{validationErrors.gender}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number (Optional)</label>
        <div className="input-wrapper">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className={validationErrors.phone ? 'error' : ''}
            disabled={loading}
          />
          <span className="input-icon">📞</span>
        </div>
        {validationErrors.phone && (
          <span className="field-error">{validationErrors.phone}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="role">Account Type</label>
        <div className="input-wrapper">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor/Healthcare Provider</option>
          </select>
          <span className="input-icon">🏥</span>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {formData.role === 'doctor' ? (
        <>
          <div className="form-group">
            <label htmlFor="licenseNumber">Medical License Number</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Enter license number"
                className={validationErrors.licenseNumber ? 'error' : ''}
                disabled={loading}
              />
              <span className="input-icon">🆔</span>
            </div>
            {validationErrors.licenseNumber && (
              <span className="field-error">{validationErrors.licenseNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <div className="input-wrapper">
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={validationErrors.specialization ? 'error' : ''}
                disabled={loading}
              >
                <option value="">Select specialization</option>
                {specializationOptions.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <span className="input-icon">🩺</span>
            </div>
            {validationErrors.specialization && (
              <span className="field-error">{validationErrors.specialization}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="hospital">Hospital/Clinic</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="hospital"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Hospital or clinic name"
                className={validationErrors.hospital ? 'error' : ''}
                disabled={loading}
              />
              <span className="input-icon">🏥</span>
            </div>
            {validationErrors.hospital && (
              <span className="field-error">{validationErrors.hospital}</span>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <label>Risk Factors (Select all that apply)</label>
            <div className="checkbox-grid">
              {riskFactorOptions.map(factor => (
                <label key={factor} className="checkbox-item">
                  <input
                    type="checkbox"
                    name="riskFactors"
                    value={factor}
                    checked={formData.riskFactors.includes(factor)}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="checkbox-label">{factor}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );

  const totalSteps = 3;

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">🏥</div>
            <h1>LivSoul</h1>
          </div>
          <h2>Create Account</h2>
          <p>Join LivSoul for personalized liver health monitoring</p>
          
          {/* Progress indicator */}
          <div className="progress-indicator">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <motion.div 
              className="auth-error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="error-icon">⚠️</span>
              {error}
            </motion.div>
          )}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div className="form-navigation">
            {currentStep > 1 && (
              <motion.button
                type="button"
                className="nav-button prev"
                onClick={handlePrevious}
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                ← Previous
              </motion.button>
            )}

            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                className="nav-button next"
                onClick={handleNext}
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                Next →
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="auth-submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span className="submit-icon">✅</span>
                    Create Account
                  </>
                )}
              </motion.button>
            )}
          </div>

          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>

          <motion.button
            type="button"
            className="auth-switch"
            onClick={onSwitchToLogin}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            Sign In Instead
          </motion.button>
        </form>

        <div className="auth-footer">
          <p>
            🔒 Your medical data is encrypted and secure
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;