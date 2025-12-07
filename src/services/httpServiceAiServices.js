// src/services/httpService8000.js
import apiClientAiServices from "./apiClientAiServices";

const handleResponse = (response) => response.data;

const handleError = (error) => {
  console.error("[AI API ERROR]", error);
  throw error.response?.data || error;
};

const httpServiceAiServices = {
  get: (url, config) =>
    apiClientAiServices.get(url, config).then(handleResponse).catch(handleError),
  post: (url, data, config) =>
    apiClientAiServices.post(url, data, config).then(handleResponse).catch(handleError),
  put: (url, data, config) =>
    apiClientAiServices.put(url, data, config).then(handleResponse).catch(handleError),
  delete: (url, config) =>
    apiClientAiServices.delete(url, config).then(handleResponse).catch(handleError),
  patch: (url, data, config) =>
    apiClientAiServices.patch(url, data, config).then(handleResponse).catch(handleError),
};

export default httpServiceAiServices;
