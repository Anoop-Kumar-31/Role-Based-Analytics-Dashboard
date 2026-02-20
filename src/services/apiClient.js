// src/services/apiClient.js
import axios from 'axios';
import { store } from '../store';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

if (!baseUrl) {
  console.warn('VITE_API_BASE_URL is not defined in environment variables. Falling back to localhost.');
}

const apiClient = axios.create({
  baseURL: baseUrl || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to pull token from Redux store
apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth?.token;
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

export default apiClient;
