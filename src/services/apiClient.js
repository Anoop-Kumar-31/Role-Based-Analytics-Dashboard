// src/services/apiClient.js
import axios from 'axios';
import { store } from '../store';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.VITE_API_BASE_URL;

if (!baseUrl) {
  throw new Error('VITE_API_BASE_URL is not defined in .env file');
}

const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
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
