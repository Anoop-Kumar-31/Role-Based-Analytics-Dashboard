import http from '../httpService';
import endpoints from '../endpoints';

// 📔 Blue Book
export const createBlueBook = (payload) => http.post(endpoints.createBlueBook(), payload);
export const getBlueBookByDate = (restaurant_id, date) => http.get(endpoints.getBlueBookByDate(restaurant_id, date));
export const updateBlueBook = (blue_book_id, payload) => http.put(endpoints.updateBlueBook(blue_book_id), payload);