// src/services/httpService.js

import apiClient from "./apiClient";

const handleResponse = (response) =>response.data;

const handleError = (error) => {
  console.error("[API ERROR]", error);
  throw error.response?.data || error;
};

const httpService = {
  get: (url, config) =>
    apiClient.get(url, config).then(handleResponse).catch(handleError),
  post: (url, data, config) =>
    apiClient.post(url, data, config).then(handleResponse).catch(handleError),
  put: (url, data, config) =>
    apiClient.put(url, data, config).then(handleResponse).catch(handleError),
  delete: (url, config) =>
    apiClient.delete(url, config).then(handleResponse).catch(handleError),
  patch: (url, data, config) =>
    apiClient.patch(url, data, config).then(handleResponse).catch(handleError),

};

export default httpService;
