import React from 'react'
import { motion } from 'framer-motion'

const AboutCirrhosisPage = () => {
  const stages = [
    {
      stage: 'Stage 1',
      name: 'Portal Fibrosis',
      description: 'Fibrous tissue begins to form around portal areas. Often no symptoms present.',
      severity: 'Mild'
    },
    {
      stage: 'Stage 2',
      name: 'Periportal Fibrosis',
      description: 'Fibrous tissue extends beyond portal areas. May have mild symptoms.',
      severity: 'Moderate'
    },
    {
      stage: 'Stage 3',
      name: 'Bridging Fibrosis',
      description: 'Fibrous bands connect portal areas and central veins. Noticeable symptoms develop.',
      severity: 'Severe'
    },
    {
      stage: 'Stage 4',
      name: 'Cirrhosis',
      description: 'Extensive scarring disrupts liver architecture. Serious complications likely.',
      severity: 'Critical'
    }
  ]

  const causes = [
    {
      category: 'Alcohol-Related',
      icon: '🍺',
      items: [
        'Chronic alcohol abuse (>20g/day for women, >30g/day for men)',
        'Alcoholic hepatitis progression',
        'Binge drinking patterns'
      ]
    },
    {
      category: 'Viral Hepatitis',
      icon: '🦠',
      items: [
        'Chronic Hepatitis B infection',
        'Chronic Hepatitis C infection',
        'Hepatitis D co-infection'
      ]
    },
    {
      category: 'Metabolic Disorders',
      icon: '⚗️',
      items: [
        'Non-alcoholic fatty liver disease (NAFLD)',
        'Hemochromatosis (iron overload)',
        'Wilson disease (copper accumulation)',
        'Alpha-1 antitrypsin deficiency'
      ]
    },
    {
      category: 'Autoimmune',
      icon: '🛡️',
      items: [
        'Autoimmune hepatitis',
        'Primary biliary cholangitis',
        'Primary sclerosing cholangitis'
      ]
    },
    {
      category: 'Other Causes',
      icon: '💊',
      items: [
        'Drug-induced liver injury',
        'Chronic bile duct obstruction',
        'Cryptogenic (unknown cause)',
        'Cardiac cirrhosis'
      ]
    }
  ]

  const symptoms = {
    early: [
      'Fatigue and weakness',
      'Loss of appetite',
      'Mild abdominal discomfort',
      'Unexplained weight loss'
    ],
    intermediate: [
      'Jaundice (yellowing of skin/eyes)',
      'Abdominal swelling (ascites)',
      'Swelling in legs and ankles',
      'Nausea and vomiting',
      'Dark urine',
      'Pale stools'
    ],
    advanced: [
      'Mental confusion (hepatic encephalopathy)',
      'Severe abdominal pain',
      'Vomiting blood',
      'Black, tarry stools',
      'Severe itching',
      'Muscle wasting'
    ]
  }

  const complications = [
    {
      name: 'Portal Hypertension',
      description: 'Increased pressure in portal vein leading to varices and splenomegaly',
      icon: '🔴'
    },
    {
      name: 'Hepatic Encephalopathy',
      description: 'Brain dysfunction due to liver\'s inability to remove toxins',
      icon: '🧠'
    },
    {
      name: 'Ascites',
      description: 'Fluid accumulation in the abdominal cavity',
      icon: '💧'
    },
    {
      name: 'Hepatocellular Carcinoma',
      description: 'Liver cancer risk increases significantly with cirrhosis',
      icon: '⚠️'
    }
  ]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-5"
    >
      <div className="container">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1>📚 Understanding Liver Cirrhosis</h1>
          <p className="text-xl">
            Comprehensive information about liver cirrhosis: causes, symptoms, stages, and complications
          </p>
        </motion.div>

        {/* Definition Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">🫀 What is Liver Cirrhosis?</h2>
              <p className="text-lg mb-4">
                Liver cirrhosis is a late stage of scarring (fibrosis) of the liver caused by many forms 
                of liver diseases and conditions, such as hepatitis and chronic alcoholism. The liver 
                carries out several necessary functions, including detoxifying harmful substances, 
                cleaning blood, and making vital nutrients.
              </p>
              <div className="grid grid-2 gap-4">
                <div>
                  <h3 className="text-primary-blue mb-2">Key Characteristics:</h3>
                  <ul className="space-y-1">
                    <li>• Progressive scarring of liver tissue</li>
                    <li>• Replacement of healthy tissue with fibrous tissue</li>
                    <li>• Disruption of normal liver architecture</li>
                    <li>• Impaired liver function over time</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-primary-blue mb-2">Impact on Health:</h3>
                  <ul className="space-y-1">
                    <li>• Reduced ability to process toxins</li>
                    <li>• Decreased protein synthesis</li>
                    <li>• Impaired blood clotting</li>
                    <li>• Increased risk of liver cancer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stages Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">📊 Stages of Liver Fibrosis</h2>
          <div className="grid grid-2 gap-4">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-body">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-primary-blue">{stage.stage}: {stage.name}</h3>
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${
                      stage.severity === 'Mild' ? 'bg-green-100 text-green-800' :
                      stage.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      stage.severity === 'Severe' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {stage.severity}
                    </span>
                  </div>
                  <p>{stage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Causes Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">🎯 Causes of Liver Cirrhosis</h2>
          <div className="grid grid-2 gap-4">
            {causes.map((cause, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{cause.icon}</span>
                    <h3 className="text-primary-blue">{cause.category}</h3>
                  </div>
                  <ul className="space-y-1">
                    {cause.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Symptoms Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">🩺 Symptoms by Stage</h2>
          <div className="grid grid-3 gap-4">
            <motion.div
              className="card"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-body">
                <h3 className="text-green-600 mb-3">Early Stage</h3>
                <ul className="space-y-2">
                  {symptoms.early.map((symptom, index) => (
                    <li key={index} className="text-sm">• {symptom}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="card"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-body">
                <h3 className="text-orange-600 mb-3">Intermediate Stage</h3>
                <ul className="space-y-2">
                  {symptoms.intermediate.map((symptom, index) => (
                    <li key={index} className="text-sm">• {symptom}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="card"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-body">
                <h3 className="text-red-600 mb-3">Advanced Stage</h3>
                <ul className="space-y-2">
                  {symptoms.advanced.map((symptom, index) => (
                    <li key={index} className="text-sm">• {symptom}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Complications Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">⚠️ Major Complications</h2>
          <div className="grid grid-2 gap-4">
            {complications.map((complication, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{complication.icon}</span>
                    <h3 className="text-primary-blue">{complication.name}</h3>
                  </div>
                  <p>{complication.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Diagnosis and Treatment */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <div className="grid grid-2 gap-6">
            <div className="card">
              <div className="card-body">
                <h2 className="mb-4">🔬 Diagnosis Methods</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-primary-blue text-lg">Blood Tests</h3>
                    <p className="text-sm">Liver function tests, complete blood count, PT/INR</p>
                  </div>
                  <div>
                    <h3 className="text-primary-blue text-lg">Imaging</h3>
                    <p className="text-sm">Ultrasound, CT scan, MRI, FibroScan</p>
                  </div>
                  <div>
                    <h3 className="text-primary-blue text-lg">Biopsy</h3>
                    <p className="text-sm">Liver biopsy for definitive diagnosis and staging</p>
                  </div>
                  <div>
                    <h3 className="text-primary-blue text-lg">Novel Methods</h3>
                    <p className="text-sm">ERG testing, biomarkers, elastography</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h2 className="mb-4">💊 Treatment Approaches</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-primary-blue text-lg">Address Underlying Cause</h3>
                    <p className="text-sm">Alcohol cessation, antiviral therapy, immunosuppression</p>
                  </div>
                  <div>
                    <h3 className="text-primary-blue text-lg">Manage Complications</h3>
                    <p className="text-sm">Diuretics for ascites, beta-blockers for varices</p>
                  </div>
                  <div>
                    <h3 className="text-primary-blue text-lg">Liver Transplantation</h3>
                    <p className="text-sm">For end-stage liver disease</p>
                  </div>
                  <div>
                    <h3 className="text-primary-blue text-lg">Supportive Care</h3>
                    <p className="text-sm">Nutrition support, vaccination, monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="card bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
            <div className="card-body">
              <h2 className="text-white mb-3">🔬 Try Our Prediction Tool</h2>
              <p className="mb-4">
                Use our AI-powered ERG analysis to assess liver cirrhosis risk based on 
                retinal electrical activity patterns.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="/prediction" className="btn btn-secondary">
                  Start Prediction →
                </a>
                <a href="/statistics" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-blue">
                  View Statistics
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  )
}

export default AboutCirrhosisPage