import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  // User Association
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Session Information
  sessionId: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      return `pred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  },
  
  // Patient Demographics
  patientInfo: {
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [1, 'Age must be at least 1'],
      max: [150, 'Age cannot exceed 150']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required']
    }
  },
  
  // ERG (Electroretinography) Parameters
  ergParameters: {
    // A-Wave measurements
    aWave: {
      amplitude: {
        type: Number,
        required: [true, 'A-wave amplitude is required'],
        min: [0, 'A-wave amplitude must be positive']
      },
      latency: {
        type: Number,
        required: [true, 'A-wave latency is required'],
        min: [0, 'A-wave latency must be positive']
      }
    },
    
    // B-Wave measurements
    bWave: {
      amplitude: {
        type: Number,
        required: [true, 'B-wave amplitude is required'],
        min: [0, 'B-wave amplitude must be positive']
      },
      latency: {
        type: Number,
        required: [true, 'B-wave latency is required'],
        min: [0, 'B-wave latency must be positive']
      }
    },
    
    // Flicker Response
    flickerResponse: {
      amplitude: {
        type: Number,
        default: 0,
        min: [0, 'Flicker amplitude must be positive']
      },
      latency: {
        type: Number,
        default: 0,
        min: [0, 'Flicker latency must be positive']
      }
    },
    
    // Oscillatory Potentials
    oscillatoryPotentials: {
      type: Number,
      default: 0,
      min: [0, 'Oscillatory potentials must be positive']
    }
  },
  
  // Clinical Information
  clinicalData: {
    symptoms: [{
      type: String,
      enum: [
        'Fatigue',
        'Abdominal pain',
        'Nausea',
        'Loss of appetite',
        'Weight loss',
        'Jaundice',
        'Swelling in legs',
        'Abdominal swelling',
        'Confusion',
        'Easy bruising',
        'Vomiting blood',
        'Dark urine',
        'Pale stools'
      ]
    }],
    
    riskFactors: [{
      type: String,
      enum: [
        'Alcohol abuse',
        'Hepatitis B',
        'Hepatitis C',
        'Diabetes',
        'Obesity',
        'Family history',
        'Drug use',
        'Autoimmune disease',
        'Fatty liver disease',
        'Hemochromatosis'
      ]
    }],
    
    additionalNotes: {
      type: String,
      maxlength: [1000, 'Additional notes cannot exceed 1000 characters']
    }
  },
  
  // Prediction Results
  predictionResult: {
    probability: {
      type: Number,
      required: true,
      min: [0, 'Probability must be between 0 and 1'],
      max: [1, 'Probability must be between 0 and 1']
    },
    
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true
    },
    
    interpretation: {
      type: String,
      required: true,
      maxlength: [500, 'Interpretation cannot exceed 500 characters']
    },
    
    recommendations: [{
      type: String,
      maxlength: [200, 'Each recommendation cannot exceed 200 characters']
    }],
    
    modelType: {
      type: String,
      default: 'Rule-based Analysis',
      enum: ['Rule-based Analysis', 'Machine Learning', 'Hybrid']
    },
    
    confidenceScore: {
      type: Number,
      min: [0, 'Confidence score must be between 0 and 1'],
      max: [1, 'Confidence score must be between 0 and 1'],
      default: 0.85
    }
  },
  
  // Doctor Review (if applicable)
  doctorReview: {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewDate: Date,
    comments: {
      type: String,
      maxlength: [1000, 'Doctor comments cannot exceed 1000 characters']
    },
    approved: {
      type: Boolean,
      default: false
    }
  },
  
  // Status and Metadata
  status: {
    type: String,
    enum: ['pending', 'completed', 'reviewed', 'flagged'],
    default: 'completed'
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  tags: [String] // For categorization and filtering

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for risk percentage
predictionSchema.virtual('riskPercentage').get(function() {
  return Math.round(this.predictionResult.probability * 100);
});

// Virtual for formatted date
predictionSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Indexes for better performance
predictionSchema.index({ userId: 1, createdAt: -1 });
predictionSchema.index({ 'predictionResult.riskLevel': 1 });
predictionSchema.index({ status: 1 });
predictionSchema.index({ sessionId: 1 }, { unique: true });

// Static method to get user's prediction history
predictionSchema.statics.getUserHistory = function(userId, limit = 10) {
  return this.find({ userId, isActive: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('userId', 'name email role');
};

// Static method to get statistics
predictionSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$predictionResult.riskLevel',
        count: { $sum: 1 },
        avgProbability: { $avg: '$predictionResult.probability' }
      }
    }
  ]);
  
  const total = await this.countDocuments({ isActive: true });
  
  return {
    total,
    byRiskLevel: stats,
    timestamp: new Date()
  };
};

const Prediction = mongoose.model('Prediction', predictionSchema);

export default Prediction;