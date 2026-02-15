import http from '../httpService';
import endpoints from '../endpoints';

export const createExpense = (data) => http.post(endpoints.createExpense(), data);

//make company_id optional
export const getExpense = (company_id = '') => http.get(endpoints.getExpense(company_id));

export const deleteExpense = (expenseId) => http.delete(endpoints.deleteExpense(expenseId));

export const updateExpense = (expenseId, data) => http.patch(endpoints.updateExpense(expenseId), data);
