import http from '../httpService';
import endpoints from '../endpoints';

export const createExpense = (data) => http.post(endpoints.createExpense(), data);

export const getExpense = () => 
  http.get(endpoints.getExpense());

export const deleteExpense = (expenseId) => http.delete(endpoints.deleteExpense(expenseId));

export const updateExpense = (expenseId, data) => http.patch(endpoints.updateExpense(expenseId), data);
