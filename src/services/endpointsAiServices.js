// src/services/endpointsAiServices.js
const base = "/api/v1";

const endpointsAiServices = {
  processInvoice: () => `${base}/invoices/process-invoice`,
};

export default endpointsAiServices;
