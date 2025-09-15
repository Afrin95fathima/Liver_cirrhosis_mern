import React from 'react'
import { motion } from 'framer-motion'

const PreventionPage = () => {
  const preventionStrategies = [
    {
      category: 'Alcohol Management',
      icon: '🚫',
      color: 'bg-red-100 border-red-300',
      strategies: [
        {
          title: 'Complete Alcohol Cessation',
          description: 'Most effective prevention for alcohol-related cirrhosis',
          importance: 'Critical',
          actionSteps: [
            'Seek professional help for alcohol dependency',
            'Join support groups (AA, SMART Recovery)',
            'Consider medication-assisted treatment',
            'Develop coping strategies for triggers'
          ]
        },
        {
          title: 'Moderate Consumption',
          description: 'If unable to quit completely, strict moderation',
          importance: 'High',
          actionSteps: [
            'Men: Maximum 2 drinks per day',
            'Women: Maximum 1 drink per day',
            'At least 2 alcohol-free days per week',
            'Avoid binge drinking patterns'
          ]
        }
      ]
    },
    {
      category: 'Hepatitis Prevention',
      icon: '💉',
      color: 'bg-blue-100 border-blue-300',
      strategies: [
        {
          title: 'Vaccination',
          description: 'Prevent Hepatitis A and B infections',
          importance: 'Critical',
          actionSteps: [
            'Get Hepatitis A vaccine (2-dose series)',
            'Get Hepatitis B vaccine (3-dose series)',
            'Ensure family members are vaccinated',
            'Check immunity status regularly'
          ]
        },
        {
          title: 'Safe Practices',
          description: 'Prevent transmission of viral hepatitis',
          importance: 'High',
          actionSteps: [
            'Use sterile needles and equipment',
            'Practice safe sex and use protection',
            'Avoid sharing personal items (razors, toothbrushes)',
            'Ensure sterile equipment for tattoos/piercings'
          ]
        }
      ]
    },
    {
      category: 'Lifestyle Modifications',
      icon: '🏃‍♂️',
      color: 'bg-green-100 border-green-300',
      strategies: [
        {
          title: 'Healthy Diet',
          description: 'Maintain optimal liver health through nutrition',
          importance: 'High',
          actionSteps: [
            'Follow Mediterranean diet pattern',
            'Limit processed foods and added sugars',
            'Increase fiber intake (fruits, vegetables)',
            'Maintain healthy weight (BMI 18.5-24.9)'
          ]
        },
        {
          title: 'Regular Exercise',
          description: 'Physical activity supports liver function',
          importance: 'Medium',
          actionSteps: [
            'Aim for 150 minutes moderate activity weekly',
            'Include both cardio and strength training',
            'Start gradually if sedentary',
            'Consult doctor before starting exercise program'
          ]
        }
      ]
    },
    {
      category: 'Medical Management',
      icon: '⚕️',
      color: 'bg-purple-100 border-purple-300',
      strategies: [
        {
          title: 'Regular Monitoring',
          description: 'Early detection and management of liver disease',
          importance: 'Critical',
          actionSteps: [
            'Annual liver function tests if at risk',
            'Monitor for symptoms (fatigue, jaundice)',
            'Regular check-ups with healthcare provider',
            'Follow treatment plans for chronic conditions'
          ]
        },
        {
          title: 'Medication Safety',
          description: 'Prevent drug-induced liver injury',
          importance: 'High',
          actionSteps: [
            'Avoid acetaminophen overdose (<3g/day)',
            'Inform doctors of all medications and supplements',
            'Avoid unnecessary medications',
            'Regular monitoring if on hepatotoxic drugs'
          ]
        }
      ]
    }
  ]

  const riskReduction = [
    {
      factor: 'Alcohol Cessation',
      reduction: '95%',
      timeframe: '2-5 years',
      description: 'Complete elimination of alcohol-related liver damage progression'
    },
    {
      factor: 'Hepatitis B Vaccination',
      reduction: '90%',
      timeframe: 'Immediate',
      description: 'Prevention of Hepatitis B infection and subsequent cirrhosis'
    },
    {
      factor: 'Weight Loss (if obese)',
      reduction: '70%',
      timeframe: '1-2 years',
      description: 'Reduction in NAFLD progression to cirrhosis'
    },
    {
      factor: 'Diabetes Control',
      reduction: '60%',
      timeframe: '3-5 years',
      description: 'Improved liver health and reduced fibrosis progression'
    },
    {
      factor: 'Regular Exercise',
      reduction: '50%',
      timeframe: '6-12 months',
      description: 'Enhanced liver function and reduced inflammation'
    }
  ]

  const dietaryGuidelines = {
    beneficial: [
      { food: 'Leafy Greens', benefit: 'Rich in antioxidants, support detoxification' },
      { food: 'Fatty Fish', benefit: 'Omega-3 fatty acids reduce inflammation' },
      { food: 'Nuts and Seeds', benefit: 'Healthy fats and vitamin E protect liver cells' },
      { food: 'Berries', benefit: 'Antioxidants and fiber support liver health' },
      { food: 'Olive Oil', benefit: 'Monounsaturated fats reduce liver fat' },
      { food: 'Green Tea', benefit: 'Catechins provide liver protection' }
    ],
    avoid: [
      { food: 'Processed Meats', reason: 'High sodium and preservatives stress liver' },
      { food: 'Sugary Drinks', reason: 'Fructose contributes to fatty liver disease' },
      { food: 'Fried Foods', reason: 'Trans fats increase inflammation' },
      { food: 'Excessive Salt', reason: 'Can worsen fluid retention and portal hypertension' },
      { food: 'Raw Shellfish', reason: 'Risk of hepatitis A infection' },
      { food: 'Alcohol', reason: 'Direct liver toxin and primary cirrhosis cause' }
    ]
  }

  const warningSigns = [
    {
      sign: 'Persistent Fatigue',
      description: 'Unexplained tiredness that doesn\'t improve with rest',
      urgency: 'Medium'
    },
    {
      sign: 'Abdominal Swelling',
      description: 'Fluid accumulation in the abdomen (ascites)',
      urgency: 'High'
    },
    {
      sign: 'Jaundice',
      description: 'Yellowing of skin and eyes',
      urgency: 'High'
    },
    {
      sign: 'Dark Urine',
      description: 'Persistently dark-colored urine',
      urgency: 'Medium'
    },
    {
      sign: 'Pale Stools',
      description: 'Light-colored or clay-colored bowel movements',
      urgency: 'Medium'
    },
    {
      sign: 'Confusion',
      description: 'Mental confusion or difficulty concentrating',
      urgency: 'High'
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
          <h1>🛡️ Liver Cirrhosis Prevention</h1>
          <p className="text-xl">
            Evidence-based strategies to prevent liver cirrhosis and maintain optimal liver health
          </p>
        </motion.div>

        {/* Prevention Strategies */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">🎯 Prevention Strategies</h2>
          <div className="space-y-6">
            {preventionStrategies.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className={`card border-2 ${category.color}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-primary-blue text-xl">{category.category}</h3>
                  </div>
                  
                  <div className="grid gap-4">
                    {category.strategies.map((strategy, strategyIndex) => (
                      <div key={strategyIndex} className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold">{strategy.title}</h4>
                          <span className={`px-2 py-1 rounded text-sm font-semibold ${
                            strategy.importance === 'Critical' ? 'bg-red-100 text-red-800' :
                            strategy.importance === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {strategy.importance}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{strategy.description}</p>
                        <div>
                          <h5 className="font-medium mb-2">Action Steps:</h5>
                          <ul className="space-y-1">
                            {strategy.actionSteps.map((step, stepIndex) => (
                              <li key={stepIndex} className="text-sm flex items-start gap-2">
                                <span className="text-primary-blue">•</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Risk Reduction Statistics */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">📊 Risk Reduction Potential</h2>
          <div className="grid grid-2 gap-4">
            {riskReduction.map((item, index) => (
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
                    <h3 className="text-primary-blue font-semibold">{item.factor}</h3>
                    <span className="text-2xl font-bold text-green-600">{item.reduction}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Timeframe: </span>
                    <span className="text-sm font-medium">{item.timeframe}</span>
                  </div>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dietary Guidelines */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">🥗 Dietary Guidelines</h2>
          <div className="grid grid-2 gap-6">
            <div className="card border-2 border-green-300 bg-green-50">
              <div className="card-body">
                <h3 className="text-green-700 mb-4 flex items-center gap-2">
                  <span>✅</span>
                  <span>Beneficial Foods</span>
                </h3>
                <div className="space-y-3">
                  {dietaryGuidelines.beneficial.map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded border">
                      <h4 className="font-semibold text-green-800">{item.food}</h4>
                      <p className="text-sm text-gray-700">{item.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card border-2 border-red-300 bg-red-50">
              <div className="card-body">
                <h3 className="text-red-700 mb-4 flex items-center gap-2">
                  <span>❌</span>
                  <span>Foods to Avoid</span>
                </h3>
                <div className="space-y-3">
                  {dietaryGuidelines.avoid.map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded border">
                      <h4 className="font-semibold text-red-800">{item.food}</h4>
                      <p className="text-sm text-gray-700">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Warning Signs */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">⚠️ Warning Signs to Watch</h2>
          <div className="grid grid-3 gap-4">
            {warningSigns.map((sign, index) => (
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
                    <h3 className="font-semibold">{sign.sign}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      sign.urgency === 'High' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sign.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{sign.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="alert alert-warning mt-4">
            <strong>⚠️ Important:</strong> If you experience any high-urgency warning signs, 
            consult a healthcare provider immediately. Early detection and intervention 
            can significantly improve outcomes.
          </div>
        </motion.section>

        {/* Screening Recommendations */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">🔬 Screening Recommendations</h2>
          <div className="grid grid-2 gap-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-primary-blue mb-4">High-Risk Individuals</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold">Annual Screening Recommended:</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Chronic alcohol users (&gt;40g/day)</li>
                      <li>• Chronic Hepatitis B or C patients</li>
                      <li>• Patients with NAFLD or diabetes</li>
                      <li>• Family history of liver disease</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold">Tests Include:</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Liver function tests (ALT, AST, Bilirubin)</li>
                      <li>• Complete blood count and platelets</li>
                      <li>• Ultrasound or FibroScan</li>
                      <li>• ERG testing (emerging)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="text-primary-blue mb-4">General Population</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold">Routine Screening:</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Every 3-5 years for adults &gt;40</li>
                      <li>• Annual if risk factors present</li>
                      <li>• Hepatitis B/C screening once</li>
                      <li>• Lifestyle assessment</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold">Preventive Measures:</h4>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Hepatitis A/B vaccination</li>
                      <li>• Alcohol consumption counseling</li>
                      <li>• Weight management programs</li>
                      <li>• Regular exercise promotion</li>
                    </ul>
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
              <h2 className="text-white mb-3">🔬 Take Action Today</h2>
              <p className="mb-4">
                Prevention is the best medicine. Use our prediction tool to assess your risk 
                and take steps toward better liver health.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="/prediction" className="btn btn-secondary">
                  Check Your Risk →
                </a>
                <a href="/about" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-blue">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  )
}

export default PreventionPage