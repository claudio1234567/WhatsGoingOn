import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL+"/api/auth" || 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};