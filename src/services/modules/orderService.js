import http from '../httpService';
import endpoints from '../endpoints';

// 🧾 Orders
export const createOrder = (payload) => http.post(endpoints.createOrder(), payload);
export const getAllOrders = () => http.get(endpoints.getAllOrders());
export const getOrderById = (id) => http.get(endpoints.getOrderById(id));
export const updateOrder = (id, payload) => http.put(endpoints.updateOrder(id), payload);
export const deleteOrder = (id) => http.delete(endpoints.deleteOrder(id));
export const voidOrder = (id) => http.patch(endpoints.voidOrder(id));
export const markOrderAsPaid = (id) => http.patch(endpoints.markOrderAsPaid(id));
export const getOrdersByRestaurantId = (restaurantId) => http.get(endpoints.getOrdersByRestaurantId(restaurantId));
export const getOrderWithItems = (id) => http.get(endpoints.getOrderWithItems(id));

// Items associated with Orders
export const createItem = (payload) => http.post(endpoints.createItem(), payload);
export const getAllItems = () => http.get(endpoints.getAllItems());
export const getItemById = (id) => http.get(endpoints.getItemById(id));
export const updateItem = (id, payload) => http.put(endpoints.updateItem(id), payload);
export const deleteItem = (id) => http.delete(endpoints.deleteItem(id));
export const voidItem = (id) => http.patch(endpoints.voidItem(id));
export const refundItem = (id) => http.patch(endpoints.refundItem(id));
export const getItemsByOrderId = (orderId) => http.get(endpoints.getItemsByOrderId(orderId));
