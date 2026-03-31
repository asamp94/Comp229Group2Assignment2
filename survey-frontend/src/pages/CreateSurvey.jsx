// src/pages/CreateSurvey.jsx
import React, { useState } from 'react';
import surveyService from '../services/surveyService';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: [], responseType: 'text' },
  ]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: [], responseType: 'text' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const surveyData = { title, description, questions };
      await surveyService.createSurvey(surveyData);
      navigate('/surveys');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create survey');
    }
  };

  return (
    <div>
      <h2>Create Survey</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Survey Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Survey Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <h3>Questions</h3>
        {questions.map((q, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <div>
              <label>Question Text:</label>
              <input
                type="text"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(index, 'questionText', e.target.value)
                }
                required
              />
            </div>
            <div>
              <label>Response Type:</label>
              <select
                value={q.responseType}
                onChange={(e) =>
                  handleQuestionChange(index, 'responseType', e.target.value)
                }
              >
                <option value="text">Text</option>
                <option value="multiple_choice">Multiple Choice</option>
              </select>
            </div>
            {q.responseType === 'multiple_choice' && (
              <div>
                <label>Options (comma separated):</label>
                <input
                  type="text"
                  value={q.options.join(',')}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      'options',
                      e.target.value.split(',').map((opt) => opt.trim())
                    )
                  }
                  required
                />
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Another Question
        </button>
        <br />
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
