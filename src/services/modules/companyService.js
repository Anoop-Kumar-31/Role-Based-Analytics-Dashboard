import http from '../httpService';
import endpoints from '../endpoints';

// 🏢 Companies
export const createCompany = (payload) => http.post(endpoints.createCompany(), payload);
export const getCompanyById = (company_id) => http.get(endpoints.getCompanyById(company_id));
export const updateCompany = (company_id, payload) => http.put(endpoints.updateCompany(company_id), payload);
export const toggleCompanyStatus = (company_id) => http.delete(endpoints.toggleCompanyStatus(company_id));

export const getAllOnboardedCompanies = () => http.get(endpoints.getAllOnboardedCompanies());
export const getAllPendingCompanies = () => http.get(endpoints.getAllPendingCompanies());
