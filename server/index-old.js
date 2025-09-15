import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Check if model file exists
const modelPath = path.join(process.cwd(), '..', 'liver_cirrhosis_predictor.pkl');
const datasetPath = path.join(process.cwd(), '..', 'erg_liver_cirrhosis_dataset.xlsx');

console.log('Checking for model file:', modelPath);
console.log('Model exists:', fs.existsSync(modelPath));
console.log('Dataset exists:', fs.existsSync(datasetPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
  const modelExists = fs.existsSync(modelPath);
  const datasetExists = fs.existsSync(datasetPath);
  
  res.json({ 
    status: 'OK', 
    modelLoaded: modelExists,
    datasetAvailable: datasetExists,
    timestamp: new Date().toISOString(),
    modelPath: modelPath
  });
});

// Prediction endpoint
app.post('/api/predict', async (req, res) => {
  try {
    console.log('Received prediction request:', req.body);
    
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

// Get dataset info
app.get('/api/dataset-info', (req, res) => {
  if (!fs.existsSync(datasetPath)) {
    return res.status(404).json({ error: 'Dataset not found' });
  }

  // Basic dataset info (you could expand this to read the Excel file)
  res.json({
    filename: 'erg_liver_cirrhosis_dataset.xlsx',
    path: datasetPath,
    exists: true,
    lastModified: fs.statSync(datasetPath).mtime
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔬 Model file: ${fs.existsSync(modelPath) ? '✅ Found' : '❌ Not found'}`);
  console.log(`📄 Dataset file: ${fs.existsSync(datasetPath) ? '✅ Found' : '❌ Not found'}`);
});

export default app;