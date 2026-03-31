// src/services/surveyService.js

import axios from './axiosConfig'; 
import authService from './authService';

const API_URL = import.meta.env.VITE_API_URL;

const getSurveys = async () => {
  const response = await axios.get(`${API_URL}/surveys`, {
    headers: {
      Authorization: `Bearer ${authService.getAuthToken()}`,
    },
  });
  return response.data;
};

const createSurvey = async (surveyData) => {
  const response = await axios.post(`${API_URL}/surveys`, surveyData, {
    headers: {
      Authorization: `Bearer ${authService.getAuthToken()}`,
    },
  });
  return response.data;
};

const updateSurvey = async (id, surveyData) => {
  const response = await axios.put(`${API_URL}/surveys/${id}`, surveyData, {
    headers: {
      Authorization: `Bearer ${authService.getAuthToken()}`,
    },
  });
  return response.data;
};

const deleteSurvey = async (id) => {
  const response = await axios.delete(`${API_URL}/surveys/${id}`, {
    headers: {
      Authorization: `Bearer ${authService.getAuthToken()}`,
    },
  });
  return response.data;
};

export default {
  getSurveys,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
