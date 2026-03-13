import http from '../httpService';
import endpoints from '../endpoints';

// 🍽️ Restaurants
export const createRestaurant = (payload) => http.post(endpoints.createRestaurant(), payload);
export const getRestaurantById = (restaurant_id) => http.get(endpoints.getRestaurantById(restaurant_id));
export const updateRestaurant = (restaurant_id, payload) => http.put(endpoints.updateRestaurant(restaurant_id), payload);
export const deleteRestaurant = (restaurant_id) => http.delete(endpoints.deleteRestaurant(restaurant_id));
export const getRestaurantsByCompanyId = (company_id = "") => http.get(endpoints.getAllRestaurants(company_id));

// Revenue
export const createRevenue = (restaurant_id, payload) => http.post(endpoints.createRevenue(restaurant_id), payload);
export const getAllRevenues = (res_ids = [], user_id = null) => http.get(endpoints.getAllRevenues(res_ids, user_id));
export const updateRevenue = (revenue_id, payload) => http.put(endpoints.updateRevenue(revenue_id), payload);
export const deleteRevenue = (revenue_id) => http.delete(endpoints.deleteRevenue(revenue_id));
