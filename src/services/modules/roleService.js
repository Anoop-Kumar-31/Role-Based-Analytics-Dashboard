import http from '../httpService';
import endpoints from '../endpoints';

// 🛡️ Roles
export const getAllRoles = () => http.get(endpoints.getAllRoles());
export const getPermissionsByRoleId = (role_id) => http.get(endpoints.getPermissionsByRoleId(role_id));
