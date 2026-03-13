import http from '../httpService';
import endpoints from '../endpoints';

export const pingHealth = () => http.get(endpoints.pingHealth());