import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  // Patient Association
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Doctor Association
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.recordType === 'clinical_visit';
    }
  },
  
  // Record Type and Basic Information
  recordType: {
    type: String,
    enum: ['prediction', 'clinical_visit', 'lab_result', 'imaging', 'consultation'],
    required: true
  },
  
  title: {
    type: String,
    required: [true, 'Record title is required'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  // Clinical Data
  clinicalData: {
    // Vital Signs
    vitals: {
      temperature: Number, // Celsius
      bloodPressure: {
        systolic: Number,
        diastolic: Number
      },
      heartRate: Number, // BPM
      respiratoryRate: Number, // per minute
      weight: Number, // kg
      height: Number, // cm
      bmi: Number
    },
    
    // Laboratory Results
    labResults: {
      liver: {
        alt: Number, // ALT (U/L)
        ast: Number, // AST (U/L)
        bilirubin: {
          total: Number,
          direct: Number
        },
        albumin: Number, // g/dL
        alkalinePhosphatase: Number // U/L
      },
      complete: {
        hemoglobin: Number, // g/dL
        hematocrit: Number, // %
        platelets: Number, // count
        wbc: Number // count
      },
      coagulation: {
        pt: Number, // seconds
        inr: Number
      }
    },
    
    // Physical Examination
    physicalExam: {
      generalAppearance: String,
      abdomen: {
        inspection: String,
        palpation: String,
        percussion: String,
        hepatomegaly: Boolean,
        splenomegaly: Boolean,
        ascites: Boolean
      },
      neurological: {
        consciousness: String,
        orientation: String,
        asterixis: Boolean
      },
      skin: {
        jaundice: Boolean,
        spiderAngiomata: Boolean,
        palmarErythema: Boolean
      }
    },
    
    // Imaging Results
    imaging: {
      ultrasound: {
        liverEchotexture: String,
        liverSize: String,
        spleen: String,
        ascites: Boolean,
        portal: String
      },
      ct: {
        findings: String,
        contrast: Boolean
      },
      mri: {
        findings: String,
        contrast: Boolean
      }
    }
  },
  
  // Diagnosis and Assessment
  diagnosis: {
    primary: {
      type: String,
      maxlength: [200, 'Primary diagnosis cannot exceed 200 characters']
    },
    secondary: [String],
    differentials: [String],
    
    // Cirrhosis-specific staging
    childPughScore: {
      score: {
        type: Number,
        min: [5, 'Child-Pugh score minimum is 5'],
        max: [15, 'Child-Pugh score maximum is 15']
      },
      class: {
        type: String,
        enum: ['A', 'B', 'C']
      }
    },
    
    meldScore: {
      type: Number,
      min: [6, 'MELD score minimum is 6'],
      max: [40, 'MELD score maximum is 40']
    }
  },
  
  // Treatment Plan
  treatment: {
    medications: [{
      name: {
        type: String,
        required: true
      },
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String
    }],
    
    procedures: [{
      name: String,
      scheduledDate: Date,
      status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
      },
      notes: String
    }],
    
    lifestyle: {
      diet: String,
      exercise: String,
      alcohol: String,
      smoking: String,
      other: String
    },
    
    followUp: {
      nextVisit: Date,
      frequency: String,
      provider: String,
      specialistReferral: String
    }
  },
  
  // Associated Prediction (if record type is prediction)
  predictionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prediction'
  },
  
  // File Attachments
  attachments: [{
    fileName: String,
    fileType: String,
    filePath: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  
  // Record Status and Metadata
  status: {
    type: String,
    enum: ['draft', 'finalized', 'amended', 'deleted'],
    default: 'finalized'
  },
  
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  
  confidentiality: {
    type: String,
    enum: ['normal', 'restricted', 'confidential'],
    default: 'normal'
  },
  
  tags: [String], // For categorization
  
  // Version Control
  version: {
    type: Number,
    default: 1
  },
  
  amendments: [{
    date: {
      type: Date,
      default: Date.now
    },
    amendedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    changes: String
  }]

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for calculated BMI
medicalRecordSchema.virtual('calculatedBMI').get(function() {
  if (this.clinicalData?.vitals?.weight && this.clinicalData?.vitals?.height) {
    const heightInMeters = this.clinicalData.vitals.height / 100;
    return Math.round((this.clinicalData.vitals.weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }
  return null;
});

// Indexes for better performance
medicalRecordSchema.index({ patientId: 1, createdAt: -1 });
medicalRecordSchema.index({ doctorId: 1 });
medicalRecordSchema.index({ recordType: 1 });
medicalRecordSchema.index({ status: 1 });
medicalRecordSchema.index({ 'diagnosis.primary': 'text', 'description': 'text' });

// Static method to get patient's medical timeline
medicalRecordSchema.statics.getPatientTimeline = function(patientId, limit = 20) {
  return this.find({ 
    patientId, 
    status: { $in: ['finalized', 'amended'] } 
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('doctorId', 'name specialization hospital')
    .populate('predictionId');
};

// Static method to search records
medicalRecordSchema.statics.searchRecords = function(query, filters = {}) {
  const searchCriteria = {
    $and: [
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { 'diagnosis.primary': { $regex: query, $options: 'i' } }
        ]
      },
      filters
    ]
  };
  
  return this.find(searchCriteria)
    .populate('patientId', 'name email age gender')
    .populate('doctorId', 'name specialization')
    .sort({ createdAt: -1 });
};

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;