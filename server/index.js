import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Database connection
import connectDB from './config/database.js';

// Routes
import authRoutes from './routes/auth.js';
import predictionRoutes from './routes/predictions.js';

// Load environment variables
dotenv.config();

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.CLIENT_URL, 'https://liver-cirrhosis-mern.vercel.app']
    : process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/predictions', predictionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const modelPath = join(__dirname, '..', 'liver_cirrhosis_predictor.pkl');
  const datasetPath = join(__dirname, '..', 'erg_liver_cirrhosis_dataset.xlsx');
  
  const modelExists = fs.existsSync(modelPath);
  const datasetExists = fs.existsSync(datasetPath);
  
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    server: 'LivSoul Backend API',
    version: '2.0.0',
    database: 'MongoDB with Mongoose',
    features: {
      prediction: 'JavaScript Rule-based + Database Storage',
      authentication: 'JWT-based with bcrypt',
      userManagement: 'Full CRUD operations',
      medicalRecords: 'Comprehensive tracking',
      models: {
        user: 'Patient and Doctor profiles',
        prediction: 'ERG analysis with history',
        medicalRecord: 'Clinical data storage'
      }
    },
    files: {
      model: modelExists ? '✅ Found' : '❌ Missing',
      dataset: datasetExists ? '✅ Found' : '❌ Missing'
    },
    endpoints: {
      auth: '/api/auth (register, login, profile)',
      predictions: '/api/predictions (create, history, stats)',
      health: '/api/health'
    }
  });
});

// Legacy prediction endpoint (backward compatibility)
app.post('/api/predict', async (req, res) => {
  try {
    console.log('Legacy prediction endpoint called');
    
    // Extract and validate ERG data from the frontend format
    const {
      age,
      gender,
      aWaveAmplitude,
      aWaveLatency,
      bWaveAmplitude,
      bWaveLatency,
      flickerAmplitude,
      flickerLatency,
      oscillatoryPotentials,
      symptoms = [],
      riskFactors = []
    } = req.body;

    // Validate required fields
    if (!age || !gender || !aWaveAmplitude || !aWaveLatency || !bWaveAmplitude || !bWaveLatency) {
      return res.status(400).json({ 
        error: 'Missing required ERG parameters',
        required: ['age', 'gender', 'aWaveAmplitude', 'aWaveLatency', 'bWaveAmplitude', 'bWaveLatency']
      });
    }

    // Convert to numbers and validate
    const numericData = {
      age: parseFloat(age),
      aWaveAmplitude: parseFloat(aWaveAmplitude),
      aWaveLatency: parseFloat(aWaveLatency),
      bWaveAmplitude: parseFloat(bWaveAmplitude),
      bWaveLatency: parseFloat(bWaveLatency),
      flickerAmplitude: parseFloat(flickerAmplitude || 0),
      flickerLatency: parseFloat(flickerLatency || 0),
      oscillatoryPotentials: parseFloat(oscillatoryPotentials || 0)
    };

    // Validate all numeric values
    for (const [key, value] of Object.entries(numericData)) {
      if (isNaN(value)) {
        return res.status(400).json({ 
          error: `Invalid numeric value for ${key}: ${req.body[key]}` 
        });
      }
    }

    // JavaScript-based prediction logic (rule-based approach)
    const prediction = calculateRuleBasedPrediction({
      ...numericData,
      gender,
      symptoms,
      riskFactors
    });

    console.log('Prediction successful:', prediction);
    res.json(prediction);

  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Prediction failed', details: error.message });
  }
});

// Rule-based prediction function
function calculateRuleBasedPrediction(data) {
  let probability = 0.0;
  const {
    age,
    gender,
    aWaveAmplitude,
    aWaveLatency,
    bWaveAmplitude,
    bWaveLatency,
    flickerAmplitude,
    flickerLatency,
    oscillatoryPotentials,
    symptoms,
    riskFactors
  } = data;

  // Age factor (higher risk with age)
  if (age > 60) {
    probability += 0.2;
  } else if (age > 45) {
    probability += 0.1;
  } else if (age > 30) {
    probability += 0.05;
  }

  // ERG pattern analysis (simplified)
  // Normal ranges: A-wave (100-200 μV, 10-20 ms), B-wave (200-400 μV, 40-60 ms)
  if (aWaveAmplitude < 100 || aWaveAmplitude > 200) {
    probability += 0.15;
  }
  if (aWaveLatency < 10 || aWaveLatency > 20) {
    probability += 0.1;
  }
  if (bWaveAmplitude < 200 || bWaveAmplitude > 400) {
    probability += 0.15;
  }
  if (bWaveLatency < 40 || bWaveLatency > 60) {
    probability += 0.1;
  }

  // Flicker response analysis
  if (flickerAmplitude > 0) {
    if (flickerAmplitude < 50 || flickerAmplitude > 150) {
      probability += 0.1;
    }
  }
  if (flickerLatency > 0) {
    if (flickerLatency < 20 || flickerLatency > 40) {
      probability += 0.05;
    }
  }

  // Oscillatory potentials
  if (oscillatoryPotentials > 0) {
    if (oscillatoryPotentials < 30 || oscillatoryPotentials > 100) {
      probability += 0.08;
    }
  }

  // Symptom count
  const symptomCount = symptoms.length;
  if (symptomCount >= 5) {
    probability += 0.2;
  } else if (symptomCount >= 3) {
    probability += 0.15;
  } else if (symptomCount >= 1) {
    probability += 0.1;
  }

  // Risk factor count
  const riskFactorCount = riskFactors.length;
  if (riskFactorCount >= 3) {
    probability += 0.25;
  } else if (riskFactorCount >= 2) {
    probability += 0.15;
  } else if (riskFactorCount >= 1) {
    probability += 0.1;
  }

  // Check for high-risk symptoms
  const highRiskSymptoms = ['Jaundice', 'Abdominal swelling', 'Confusion', 'Vomiting blood'];
  for (const symptom of highRiskSymptoms) {
    if (symptoms.includes(symptom)) {
      probability += 0.1;
    }
  }

  // Check for high-risk factors
  const highRiskFactors = ['Alcohol abuse', 'Hepatitis B', 'Hepatitis C'];
  for (const factor of highRiskFactors) {
    if (riskFactors.includes(factor)) {
      probability += 0.15;
    }
  }

  // Gender factor (males at higher risk)
  if (gender.toLowerCase() === 'male') {
    probability += 0.05;
  }

  // Cap probability at 0.95
  probability = Math.min(probability, 0.95);

  // Determine risk level and recommendations
  let riskLevel, interpretation, recommendations;
  
  if (probability >= 0.7) {
    riskLevel = "High";
    interpretation = "High probability of liver cirrhosis. Immediate medical consultation recommended.";
    recommendations = [
      "Consult a hepatologist or gastroenterologist immediately",
      "Undergo comprehensive liver function testing",
      "Consider imaging studies (ultrasound, CT, or MRI)",
      "Discuss liver biopsy with your physician",
      "Avoid alcohol completely",
      "Review all medications with your doctor"
    ];
  } else if (probability >= 0.4) {
    riskLevel = "Medium";
    interpretation = "Moderate probability of liver cirrhosis. Medical evaluation recommended.";
    recommendations = [
      "Schedule appointment with primary care physician",
      "Request liver function tests",
      "Consider lifestyle modifications",
      "Monitor symptoms closely",
      "Reduce alcohol consumption significantly",
      "Maintain healthy diet and exercise"
    ];
  } else {
    riskLevel = "Low";
    interpretation = "Low probability of liver cirrhosis. Continue preventive measures.";
    recommendations = [
      "Maintain current healthy lifestyle",
      "Continue regular medical check-ups",
      "Monitor for new symptoms",
      "Follow liver-healthy diet",
      "Limit alcohol consumption",
      "Stay up to date with vaccinations"
    ];
  }

  return {
    probability: Math.round(probability * 1000) / 1000, // Round to 3 decimal places
    riskLevel,
    interpretation,
    recommendations,
    modelType: "Rule-based Analysis",
    timestamp: new Date().toISOString()
  };
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile',
      'POST /api/predictions',
      'GET /api/predictions/history',
      'GET /api/predictions/stats/overview',
      'POST /api/predict (legacy)'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const validationErrors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: validationErrors
    });
  }
  
  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }
  
  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🏥 LivSoul Backend API Server v2.0');
  console.log('=====================================');
  
  // Check for required files
  const modelPath = join(__dirname, '..', 'liver_cirrhosis_predictor.pkl');
  const datasetPath = join(__dirname, '..', 'erg_liver_cirrhosis_dataset.xlsx');
  
  console.log(`Checking for model file: ${modelPath}`);
  const modelExists = fs.existsSync(modelPath);
  console.log(`Model exists: ${modelExists}`);
  
  const datasetExists = fs.existsSync(datasetPath);
  console.log(`Dataset exists: ${datasetExists}`);
  
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔬 Model file: ${modelExists ? '✅ Found' : '❌ Missing'}`);
  console.log(`📄 Dataset file: ${datasetExists ? '✅ Found' : '❌ Missing'}`);
  console.log(`🗄️  Database: MongoDB with Mongoose`);
  console.log(`🔐 Authentication: JWT + bcrypt`);
  console.log(`📋 API Documentation: http://localhost:${PORT}/api/health`);
  console.log('=====================================');
});