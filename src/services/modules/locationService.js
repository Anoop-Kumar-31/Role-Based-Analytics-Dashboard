// src/services/modules/locationService.js

import http from '../httpService';
import endpoints from '../endpoints';

export const updateLocationData = (data) => http.put(endpoints.updateLocationData(), data);