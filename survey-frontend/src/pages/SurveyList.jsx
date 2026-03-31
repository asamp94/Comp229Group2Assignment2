// src/pages/SurveyList.jsx
import React, { useEffect, useState } from 'react';
import surveyService from '../services/surveyService';
import { useNavigate } from 'react-router-dom';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSurveys = async () => {
    try {
      const data = await surveyService.getSurveys();
      setSurveys(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch surveys');
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDelete = async (id) => {
    try {
      await surveyService.deleteSurvey(id);
      setSurveys(surveys.filter((survey) => survey._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete survey');
    }
  };

  const handleUpdate = (id) => {
    // Implement navigation to update form or modal
    navigate(`/update-survey/${id}`);
  };

  return (
    <div>
      <h2>My Surveys</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {surveys.length === 0 ? (
        <p>No surveys found.</p>
      ) : (
        <ul>
          {surveys.map((survey) => (
            <li key={survey._id}>
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              <button onClick={() => handleUpdate(survey._id)}>Update</button>
              <button onClick={() => handleDelete(survey._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurveyList;
