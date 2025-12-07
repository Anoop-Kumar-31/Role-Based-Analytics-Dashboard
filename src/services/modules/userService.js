// src/services/modules/userService.js
import http from '../httpService';
import endpoints from '../endpoints';

// 👤 User CRUD
export const createUser = (payload) => http.post(endpoints.createUser(), payload);
export const addUser = (payload) => http.post(endpoints.addUser(), payload);
export const getAllUsers = (company_id="") => http.get(endpoints.getAllUsers(company_id));
export const getUserById = (user_id) => http.get(endpoints.getUserById(user_id));
export const getUserByEmail = (email) => http.get(endpoints.getUserByEmail(), { params: { email } });
export const updateUser = (user_id, payload) => http.put(endpoints.updateUser(user_id), payload);
export const deleteUser = (user_id) => http.delete(endpoints.deleteUser(user_id));
export const blockUser = (user_id) => http.patch(endpoints.blockUser(user_id)); // assumes PATCH
export const getUserRestaurants = (user_id) => http.get(endpoints.getUserRestaurants(user_id)); // use this to get all res in comp by just sending user_is
export const getUserCompany = (user_id) => http.get(endpoints.getUserCompany(user_id));
