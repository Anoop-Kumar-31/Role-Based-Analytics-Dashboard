// src/services/apiClient.js
import axios from 'axios';
import { store } from '../store'; // ⬅️ Import the Redux store

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Add interceptor to pull token from Redux store
apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth?.token; // Adjust path based on your slice
  if (token) {
    config.headers["x-access-token"] = token; // or `Authorization: Bearer ${token}`
  }
  return config;
});

export default apiClient;
