import http from '../httpService';
import endpoints from '../endpoints';

// 📝 Auth Logs (Super_Admin only)
export const getAuthLogs = () => http.get(endpoints.getAuthLogs());
export const getAuthLogsByUserId = (user_id) => http.get(endpoints.getAuthLogsByUserId(user_id));
export const getAuthLogById = (auth_log_id) => http.get(endpoints.getAuthLogById(auth_log_id));
