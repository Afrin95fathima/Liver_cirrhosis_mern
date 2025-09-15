import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const StatisticsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [selectedTimeframe, setSelectedTimeframe] = useState('current')

  const globalStats = {
    prevalence: {
      total: '1.16 million',
      percentage: '2%',
      description: 'People affected globally'
    },
    mortality: {
      annual: '1.16 million',
      rank: '11th',
      description: 'Leading cause of death worldwide'
    },
    economic: {
      cost: '$45 billion',
      description: 'Annual healthcare costs globally'
    },
    demographics: {
      maleRatio: '1.7:1',
      peakAge: '50-65',
      description: 'Male to female ratio and peak age'
    }
  }

  const indiaStats = {
    prevalence: {
      cases: '200,000+',
      mortality: '150,000',
      description: 'Annual new cases and deaths in India'
    },
    causes: {
      alcohol: '60%',
      hepatitisB: '25%',
      hepatitisC: '10%',
      other: '5%'
    },
    regional: {
      highest: 'Punjab, Haryana',
      causes: 'Alcohol abuse, Hepatitis B',
      description: 'States with highest prevalence'
    },
    economic: {
      cost: '₹8,000 crores',
      description: 'Annual healthcare burden in India'
    }
  }

  const ageGroupData = [
    { group: '18-30', percentage: 5, color: '#10b981' },
    { group: '31-45', percentage: 20, color: '#f59e0b' },
    { group: '46-60', percentage: 45, color: '#ef4444' },
    { group: '61-75', percentage: 25, color: '#8b5cf6' },
    { group: '75+', percentage: 5, color: '#6b7280' }
  ]

  const causesData = selectedRegion === 'india' ? [
    { cause: 'Alcohol abuse', percentage: 60, color: '#ef4444' },
    { cause: 'Hepatitis B', percentage: 25, color: '#f59e0b' },
    { cause: 'Hepatitis C', percentage: 10, color: '#10b981' },
    { cause: 'Other causes', percentage: 5, color: '#6b7280' }
  ] : [
    { cause: 'Alcohol abuse', percentage: 45, color: '#ef4444' },
    { cause: 'Hepatitis C', percentage: 25, color: '#f59e0b' },
    { cause: 'NAFLD', percentage: 15, color: '#10b981' },
    { cause: 'Hepatitis B', percentage: 10, color: '#3b82f6' },
    { cause: 'Other causes', percentage: 5, color: '#6b7280' }
  ]

  const trendsData = [
    { year: 2015, cases: 950000, deaths: 900000 },
    { year: 2016, cases: 980000, deaths: 940000 },
    { year: 2017, cases: 1020000, deaths: 980000 },
    { year: 2018, cases: 1070000, deaths: 1020000 },
    { year: 2019, cases: 1100000, deaths: 1060000 },
    { year: 2020, cases: 1130000, deaths: 1100000 },
    { year: 2021, cases: 1150000, deaths: 1130000 },
    { year: 2022, cases: 1160000, deaths: 1140000 },
    { year: 2023, cases: 1180000, deaths: 1160000 }
  ]

  const riskFactorsData = [
    { factor: 'Alcohol consumption >40g/day', risk: 'High', percentage: 85 },
    { factor: 'Chronic Hepatitis B/C', risk: 'High', percentage: 70 },
    { factor: 'Obesity (BMI >30)', risk: 'Medium', percentage: 45 },
    { factor: 'Diabetes mellitus', risk: 'Medium', percentage: 40 },
    { factor: 'Family history', risk: 'Medium', percentage: 30 },
    { factor: 'Male gender', risk: 'Low', percentage: 20 }
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
          <h1>📊 Liver Cirrhosis Statistics</h1>
          <p className="text-xl">
            Comprehensive data on liver cirrhosis prevalence, trends, and impact worldwide and in India
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center gap-4 mb-5"
        >
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedRegion('global')}
              className={`btn ${selectedRegion === 'global' ? 'btn-primary' : 'btn-secondary'}`}
            >
              🌍 Global
            </button>
            <button
              onClick={() => setSelectedRegion('india')}
              className={`btn ${selectedRegion === 'india' ? 'btn-primary' : 'btn-secondary'}`}
            >
              🇮🇳 India
            </button>
          </div>
        </motion.div>

        {/* Key Statistics */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">
            {selectedRegion === 'global' ? '🌍 Global Statistics' : '🇮🇳 India Statistics'}
          </h2>
          
          {selectedRegion === 'global' ? (
            <div className="grid grid-4 gap-4">
              <div className="stat-card">
                <span className="stat-number">{globalStats.prevalence.total}</span>
                <span className="stat-label">Annual Deaths</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{globalStats.prevalence.percentage}</span>
                <span className="stat-label">Population Affected</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{globalStats.mortality.rank}</span>
                <span className="stat-label">Leading Cause of Death</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{globalStats.economic.cost}</span>
                <span className="stat-label">Annual Healthcare Cost</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-4 gap-4">
              <div className="stat-card">
                <span className="stat-number">{indiaStats.prevalence.cases}</span>
                <span className="stat-label">Annual New Cases</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{indiaStats.prevalence.mortality}</span>
                <span className="stat-label">Annual Deaths</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{indiaStats.causes.alcohol}%</span>
                <span className="stat-label">Alcohol-Related</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{indiaStats.economic.cost}</span>
                <span className="stat-label">Healthcare Burden</span>
              </div>
            </div>
          )}
        </motion.section>

        {/* Age Demographics */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">👥 Age Group Distribution</h2>
          <div className="grid grid-2 gap-6">
            <div className="card">
              <div className="card-body">
                <h3 className="mb-4">Distribution by Age Groups</h3>
                <div className="space-y-4">
                  {ageGroupData.map((group, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium">{group.group}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: group.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${group.percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <div className="w-12 text-sm font-medium">{group.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="mb-4">Key Age-Related Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-blue">•</span>
                    <div>
                      <strong>Peak Incidence:</strong> 46-60 years (45% of cases)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-blue">•</span>
                    <div>
                      <strong>Early Onset:</strong> Increasing in 31-45 age group
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-blue">•</span>
                    <div>
                      <strong>Gender Ratio:</strong> Male predominance (1.7:1)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-blue">•</span>
                    <div>
                      <strong>Survival Rate:</strong> 5-year survival varies by stage
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Causes Distribution */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">🎯 Leading Causes</h2>
          <div className="grid grid-2 gap-6">
            <div className="card">
              <div className="card-body">
                <h3 className="mb-4">
                  Causes in {selectedRegion === 'global' ? 'Global Population' : 'India'}
                </h3>
                <div className="space-y-4">
                  {causesData.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium">{item.cause}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <div className="w-12 text-sm font-medium">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="mb-4">Risk Factor Analysis</h3>
                <div className="space-y-3">
                  {riskFactorsData.slice(0, 4).map((factor, index) => (
                    <div key={index} className="border-l-4 border-primary-blue pl-3">
                      <div className="font-medium text-sm">{factor.factor}</div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          factor.risk === 'High' ? 'bg-red-100 text-red-800' :
                          factor.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {factor.risk} Risk
                        </span>
                        <span className="text-sm font-medium">{factor.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Trends Over Time */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">📈 Global Trends (2015-2023)</h2>
          <div className="card">
            <div className="card-body">
              <div className="grid grid-2 gap-6">
                <div>
                  <h3 className="mb-4 text-primary-blue">Trend Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Annual Increase Rate</span>
                      <span className="text-primary-blue font-bold">2.8%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Total Cases (2023)</span>
                      <span className="text-primary-blue font-bold">1.18M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Mortality Rate</span>
                      <span className="text-primary-blue font-bold">98.3%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Projected 2025</span>
                      <span className="text-primary-blue font-bold">1.25M</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-primary-blue">Key Insights</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-primary-blue">•</span>
                      <div>
                        <strong>Rising Incidence:</strong> Steady increase of 2.8% annually
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary-blue">•</span>
                      <div>
                        <strong>Regional Variations:</strong> Higher rates in developing countries
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary-blue">•</span>
                      <div>
                        <strong>Contributing Factors:</strong> Alcohol consumption, viral hepatitis
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary-blue">•</span>
                      <div>
                        <strong>Emerging Trends:</strong> NAFLD-related cirrhosis increasing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Regional Comparison */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <h2 className="text-center mb-4">🗺️ Regional Comparison</h2>
          <div className="grid grid-3 gap-4">
            <div className="card">
              <div className="card-body text-center">
                <h3 className="text-primary-blue mb-3">Asia-Pacific</h3>
                <div className="stat-number text-2xl mb-2">45%</div>
                <div className="stat-label mb-3">Global burden</div>
                <p className="text-sm">Dominated by Hepatitis B and alcohol-related cirrhosis</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <h3 className="text-primary-blue mb-3">Europe</h3>
                <div className="stat-number text-2xl mb-2">25%</div>
                <div className="stat-label mb-3">Global burden</div>
                <p className="text-sm">Primarily alcohol-related with increasing NAFLD</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body text-center">
                <h3 className="text-primary-blue mb-3">North America</h3>
                <div className="stat-number text-2xl mb-2">15%</div>
                <div className="stat-label mb-3">Global burden</div>
                <p className="text-sm">NAFLD and Hepatitis C are leading causes</p>
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
              <h2 className="text-white mb-3">🔬 Early Detection Saves Lives</h2>
              <p className="mb-4">
                With liver cirrhosis cases rising globally, early detection through innovative 
                methods like ERG testing can improve outcomes significantly.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="/prediction" className="btn btn-secondary">
                  Try Prediction Tool →
                </a>
                <a href="/prevention" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-blue">
                  Learn Prevention
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  )
}

export default StatisticsPage