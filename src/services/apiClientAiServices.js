// src/services/apiClientAiServices.js
import axios from 'axios';

const baseUrl = import.meta.env.VITE_AI_API_BASE_URL || 'http://localhost:8000';

const apiClientAiServices = axios.create({
  baseURL: baseUrl,
  // timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClientAiServices;
