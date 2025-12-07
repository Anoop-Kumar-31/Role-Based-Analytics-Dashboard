// src/services/modules/authService.js

import http from '../httpService';
import endpoints from '../endpoints';

export const signin = (credentials) => http.post(endpoints.signinUser(), credentials);
export const onboarding = (data) => http.post(endpoints.onboarding(), data);
