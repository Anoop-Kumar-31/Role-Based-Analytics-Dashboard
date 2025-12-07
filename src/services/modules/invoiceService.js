// src/services/modules/invoiceService.js
import httpServiceAiServices from "../httpServiceAiServices";
import endpointsAiServices from "../endpointsAiServices";

export const processInvoice = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return httpServiceAiServices.post(endpointsAiServices.processInvoice(), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
}
