import sys
import json
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import warnings
warnings.filterwarnings('ignore')

def predict_cirrhosis(data):
    """
    Predict liver cirrhosis risk based on ERG and clinical data
    """
    try:
        # Parse input data
        input_data = json.loads(data)
        
        # Extract features for prediction
        features = [
            float(input_data.get('age', 0)),
            1 if input_data.get('gender', '').lower() == 'male' else 0,  # Gender encoding
            float(input_data.get('aWaveAmplitude', 0)),
            float(input_data.get('aWaveLatency', 0)),
            float(input_data.get('bWaveAmplitude', 0)),
            float(input_data.get('bWaveLatency', 0)),
            float(input_data.get('flickerAmplitude', 0)),
            float(input_data.get('flickerLatency', 0)),
            float(input_data.get('oscillatoryPotentials', 0)),
            len(input_data.get('symptoms', [])),  # Number of symptoms
            len(input_data.get('riskFactors', []))  # Number of risk factors
        ]
        
        # Feature names for reference
        feature_names = [
            'age', 'gender_male', 'a_wave_amplitude', 'a_wave_latency',
            'b_wave_amplitude', 'b_wave_latency', 'flicker_amplitude',
            'flicker_latency', 'oscillatory_potentials', 'symptom_count', 'risk_factor_count'
        ]
        
        # Create DataFrame
        df = pd.DataFrame([features], columns=feature_names)
        
        # Try to load existing model, otherwise create a simple rule-based prediction
        try:
            model = joblib.load('liver_cirrhosis_predictor.pkl')
            scaler = joblib.load('scaler.pkl')
            
            # Scale features
            features_scaled = scaler.transform(df)
            
            # Make prediction
            probability = model.predict_proba(features_scaled)[0][1]
            
        except FileNotFoundError:
            # Fallback: Rule-based prediction using ERG patterns and clinical data
            probability = calculate_rule_based_probability(features, input_data)
        
        # Determine risk level
        if probability >= 0.7:
            risk_level = "High"
            interpretation = "High probability of liver cirrhosis. Immediate medical consultation recommended."
            recommendations = [
                "Consult a hepatologist or gastroenterologist immediately",
                "Undergo comprehensive liver function testing",
                "Consider imaging studies (ultrasound, CT, or MRI)",
                "Discuss liver biopsy with your physician",
                "Avoid alcohol completely",
                "Review all medications with your doctor"
            ]
        elif probability >= 0.4:
            risk_level = "Medium"
            interpretation = "Moderate probability of liver cirrhosis. Medical evaluation recommended."
            recommendations = [
                "Schedule appointment with primary care physician",
                "Request liver function tests",
                "Consider lifestyle modifications",
                "Monitor symptoms closely",
                "Reduce alcohol consumption significantly",
                "Maintain healthy diet and exercise"
            ]
        else:
            risk_level = "Low"
            interpretation = "Low probability of liver cirrhosis. Continue preventive measures."
            recommendations = [
                "Maintain current healthy lifestyle",
                "Continue regular medical check-ups",
                "Monitor for new symptoms",
                "Follow liver-healthy diet",
                "Limit alcohol consumption",
                "Stay up to date with vaccinations"
            ]
        
        # Prepare result
        result = {
            "probability": float(probability),
            "riskLevel": risk_level,
            "interpretation": interpretation,
            "recommendations": recommendations,
            "features_used": feature_names,
            "model_type": "Machine Learning" if 'model' in locals() else "Rule-based"
        }
        
        return json.dumps(result, indent=2)
        
    except Exception as e:
        error_result = {
            "error": True,
            "message": f"Prediction error: {str(e)}",
            "probability": 0.0,
            "riskLevel": "Unknown",
            "interpretation": "Unable to process prediction due to data error.",
            "recommendations": ["Please check input data and try again", "Consult healthcare provider for proper evaluation"]
        }
        return json.dumps(error_result, indent=2)

def calculate_rule_based_probability(features, input_data):
    """
    Calculate probability using rule-based approach when ML model is not available
    """
    probability = 0.0
    
    # Age factor (higher risk with age)
    age = features[0]
    if age > 60:
        probability += 0.2
    elif age > 45:
        probability += 0.1
    elif age > 30:
        probability += 0.05
    
    # ERG pattern analysis (simplified)
    a_wave_amp = features[2]
    a_wave_lat = features[3]
    b_wave_amp = features[4]
    b_wave_lat = features[5]
    
    # Abnormal ERG patterns suggest liver dysfunction
    # Normal ranges: A-wave (100-200 μV, 10-20 ms), B-wave (200-400 μV, 40-60 ms)
    if a_wave_amp < 100 or a_wave_amp > 200:
        probability += 0.15
    if a_wave_lat < 10 or a_wave_lat > 20:
        probability += 0.1
    if b_wave_amp < 200 or b_wave_amp > 400:
        probability += 0.15
    if b_wave_lat < 40 or b_wave_lat > 60:
        probability += 0.1
    
    # Symptom count
    symptom_count = features[9]
    if symptom_count >= 5:
        probability += 0.2
    elif symptom_count >= 3:
        probability += 0.15
    elif symptom_count >= 1:
        probability += 0.1
    
    # Risk factor count
    risk_factor_count = features[10]
    if risk_factor_count >= 3:
        probability += 0.25
    elif risk_factor_count >= 2:
        probability += 0.15
    elif risk_factor_count >= 1:
        probability += 0.1
    
    # Check for high-risk symptoms and factors
    symptoms = input_data.get('symptoms', [])
    risk_factors = input_data.get('riskFactors', [])
    
    # High-risk symptoms
    high_risk_symptoms = ['Jaundice', 'Abdominal swelling', 'Confusion', 'Vomiting blood']
    for symptom in high_risk_symptoms:
        if symptom in symptoms:
            probability += 0.1
    
    # High-risk factors
    high_risk_factors = ['Alcohol abuse', 'Hepatitis B', 'Hepatitis C']
    for factor in high_risk_factors:
        if factor in risk_factors:
            probability += 0.15
    
    # Gender factor (males at higher risk)
    if features[1] == 1:  # Male
        probability += 0.05
    
    # Cap probability at 1.0
    probability = min(probability, 0.95)
    
    return probability

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Invalid arguments"}))
        sys.exit(1)
    
    input_data = sys.argv[1]
    result = predict_cirrhosis(input_data)
    print(result)