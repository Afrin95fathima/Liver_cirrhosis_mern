import express from 'express';
import Prediction from '../models/Prediction.js';
import MedicalRecord from '../models/MedicalRecord.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create new prediction
// @route   POST /api/predictions
// @access  Public (with optional auth for saving to user account)
router.post('/', optionalAuth, async (req, res) => {
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
      riskFactors = [],
      additionalNotes
    } = req.body;

    // Validate required fields
    if (!age || !gender || !aWaveAmplitude || !aWaveLatency || !bWaveAmplitude || !bWaveLatency) {
      return res.status(400).json({ 
        success: false,
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
          success: false,
          error: `Invalid numeric value for ${key}: ${req.body[key]}` 
        });
      }
    }

    // JavaScript-based prediction logic (rule-based approach)
    const predictionResult = calculateRuleBasedPrediction({
      ...numericData,
      gender,
      symptoms,
      riskFactors
    });

    // Prepare prediction data for database
    const predictionData = {
      patientInfo: {
        age: numericData.age,
        gender
      },
      ergParameters: {
        aWave: {
          amplitude: numericData.aWaveAmplitude,
          latency: numericData.aWaveLatency
        },
        bWave: {
          amplitude: numericData.bWaveAmplitude,
          latency: numericData.bWaveLatency
        },
        flickerResponse: {
          amplitude: numericData.flickerAmplitude,
          latency: numericData.flickerLatency
        },
        oscillatoryPotentials: numericData.oscillatoryPotentials
      },
      clinicalData: {
        symptoms,
        riskFactors,
        additionalNotes
      },
      predictionResult,
      status: 'completed'
    };

    // If user is authenticated, save to their account
    if (req.user) {
      predictionData.userId = req.user._id;
      
      // Create prediction record
      const prediction = await Prediction.create(predictionData);

      // Also create a medical record for comprehensive tracking
      const medicalRecord = await MedicalRecord.create({
        patientId: req.user._id,
        recordType: 'prediction',
        title: `ERG-Based Cirrhosis Risk Assessment`,
        description: `Automated prediction analysis with ${predictionResult.riskLevel} risk level`,
        predictionId: prediction._id,
        clinicalData: {
          vitals: {
            // ERG data stored in clinical format
          }
        },
        diagnosis: {
          primary: `Cirrhosis risk: ${predictionResult.riskLevel} (${Math.round(predictionResult.probability * 100)}%)`,
          secondary: symptoms.length > 0 ? symptoms : undefined
        },
        status: 'finalized'
      });

      console.log('Prediction saved to database:', prediction._id);

      res.json({
        success: true,
        message: 'Prediction completed and saved',
        data: {
          prediction: predictionResult,
          recordId: prediction._id,
          medicalRecordId: medicalRecord._id,
          saved: true
        }
      });
    } else {
      // Anonymous prediction - just return result without saving
      console.log('Anonymous prediction completed');
      
      res.json({
        success: true,
        message: 'Prediction completed',
        data: {
          prediction: predictionResult,
          saved: false,
          note: 'Login to save prediction history'
        }
      });
    }

  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Prediction failed', 
      details: error.message 
    });
  }
});

// @desc    Get user's prediction history
// @route   GET /api/predictions/history
// @access  Private
router.get('/history', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, riskLevel } = req.query;
    
    const query = { userId: req.user._id, isActive: true };
    
    // Filter by risk level if provided
    if (riskLevel && ['Low', 'Medium', 'High'].includes(riskLevel)) {
      query['predictionResult.riskLevel'] = riskLevel;
    }

    const predictions = await Prediction.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Prediction.countDocuments(query);

    res.json({
      success: true,
      data: {
        predictions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch prediction history'
    });
  }
});

// @desc    Get single prediction details
// @route   GET /api/predictions/:id
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      userId: req.user._id,
      isActive: true
    }).populate('userId', 'name email');

    if (!prediction) {
      return res.status(404).json({
        success: false,
        error: 'Prediction not found'
      });
    }

    res.json({
      success: true,
      data: {
        prediction
      }
    });

  } catch (error) {
    console.error('Prediction fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch prediction'
    });
  }
});

// @desc    Get prediction statistics
// @route   GET /api/predictions/stats/overview
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Prediction.getStatistics();
    
    // Add some additional analytics
    const recentPredictions = await Prediction.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('predictionResult.riskLevel predictionResult.probability createdAt')
      .populate('userId', 'name');

    const riskDistribution = await Prediction.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$predictionResult.riskLevel',
          count: { $sum: 1 },
          avgProbability: { $avg: '$predictionResult.probability' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats,
        recentPredictions: recentPredictions.map(p => ({
          riskLevel: p.predictionResult.riskLevel,
          probability: p.predictionResult.probability,
          date: p.createdAt,
          user: p.userId?.name || 'Anonymous'
        })),
        riskDistribution
      }
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

// @desc    Delete prediction
// @route   DELETE /api/predictions/:id
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!prediction) {
      return res.status(404).json({
        success: false,
        error: 'Prediction not found'
      });
    }

    // Soft delete by setting isActive to false
    prediction.isActive = false;
    await prediction.save();

    res.json({
      success: true,
      message: 'Prediction deleted successfully'
    });

  } catch (error) {
    console.error('Prediction deletion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete prediction'
    });
  }
});

// Rule-based prediction function (same as before)
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

export default router;