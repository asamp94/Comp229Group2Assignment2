// src/services/authService.js
import axios from './axiosConfig'; 



const API_URL = import.meta.env.VITE_API_URL;

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

const signin = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/signin`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const signout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export default {
  signup,
  signin,
  signout,
  isAuthenticated,
  getAuthToken,
};
