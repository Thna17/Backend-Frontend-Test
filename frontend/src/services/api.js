// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api/auth/login',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request (after user logs in)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // or cookies
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
