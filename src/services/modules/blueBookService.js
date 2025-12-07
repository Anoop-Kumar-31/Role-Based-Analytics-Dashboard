import http from '../httpService';
import endpoints from '../endpoints';

// 📔 Blue Book
export const createBlueBook = (payload) => http.post(endpoints.createBlueBook(), payload);
export const getBlueBookByDate = (restaurant_id, date) => http.get(endpoints.getBlueBookByDate(restaurant_id, date));

// Staff Notes
export const createStaffNote = (blue_book_id, payload) => http.post(endpoints.createStaffNote(blue_book_id), payload);
export const updateStaffNote = (staff_notes_id, payload) => http.put(endpoints.updateStaffNote(staff_notes_id), payload);
export const deleteStaffNote = (staff_notes_id) => http.delete(endpoints.deleteStaffNote(staff_notes_id));
export const getStaffNotesByBlueBookId = (blue_book_id) => http.get(endpoints.getStaffNotesByBlueBookId(blue_book_id));

// Misc Notes
export const createMiscNote = (blue_book_id, payload) => http.post(endpoints.createMiscNote(blue_book_id), payload);
export const updateMiscNote = (misc_notes_id, payload) => http.put(endpoints.updateMiscNote(misc_notes_id), payload);
export const getMiscNoteById = (misc_notes_id) => http.get(endpoints.getMiscNoteById(misc_notes_id));
export const deleteMiscNote = (misc_notes_id) => http.delete(endpoints.deleteMiscNote(misc_notes_id));
export const getMiscNotesByBlueBookId = (blue_book_id) => http.get(endpoints.getMiscNotesByBlueBookId(blue_book_id));

// Item86
export const createItem86 = (blue_book_id, payload) => http.post(endpoints.createItem86(blue_book_id), payload);
export const getAllItem86s = () => http.get(endpoints.getAllItem86s());
export const getItem86ById = (id) => http.get(endpoints.getItem86ById(id));
export const updateItem86 = (id, payload) => http.put(endpoints.updateItem86(id), payload);
export const deleteItem86 = (id) => http.delete(endpoints.deleteItem86(id));
export const getItem86sByBlueBookId = (blueBookId) => http.get(endpoints.getItem86sByBlueBookId(blueBookId));
