import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatUI from './components/ChatUI';
import DiseasePredictor from './components/DiseasePredictor';
import './components/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import logger from './logger';

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [diagnosisResults, setDiagnosisResults] = useState([]);

  const symptomsList = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']

  const clearSymptoms = () => {
    setSymptoms([]);
  };

  useEffect(() => {
    // logger.info('App component mounted');

    return () => {
      // logger.info('App component unmounted');
    };
  }, []);

  const handleUserMessage = (message) => {
    const newMessage = { text: message, sender: 'user' };
    setChatMessages([...chatMessages, newMessage]);

    // Make an API call to get the bot's response
    axios
      .post('http://192.168.49.2:32081/get', { msg: message })
      .then((response) => {
        const botMessage = { text: response.data.response, sender: 'bot' };
        setChatMessages([...chatMessages, newMessage, botMessage]);
      })
      .catch((error) => {
        console.error('Error getting bot response:', error);
          // logger.error('Error getting bot response:', error);
      });
  };

  const handleAddSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handlePredictDisease = (newDiagnosisResults) => {
    if (newDiagnosisResults.length === 0) {
      setDiagnosisResults([]);
    } else {
      // Make an API call to predict the disease
      axios
        .post('http://192.168.49.2:32081/predict', newDiagnosisResults)
        .then((response) => {
          setDiagnosisResults(response.data);
        })
        .catch((error) => {
          console.error('Error predicting disease:', error);
            // logger.error('Error predicting disease:', error);
        });
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="d-flex flex-row justify-content-between align-items-center h-100">
        <div className="col-md-8 col-xl-6 chat m-3">
          <ChatUI chatMessages={chatMessages} onUserMessage={handleUserMessage} />
        </div>
        <div className="col-xl-5 m-3">
        <DiseasePredictor
          className="col-xl-5 m-3"
          symptoms={symptoms}
          onAddSymptom={handleAddSymptom}
          onPredictDisease={handlePredictDisease}
          diagnosisResults={diagnosisResults}
          symptomsList={symptomsList}
          clearSymptoms={clearSymptoms}
        />
        </div>
      </div>
    </div>
  );
}

export default App;