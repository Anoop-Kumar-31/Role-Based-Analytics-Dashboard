import http from '../httpService';
import endpoints from '../endpoints';

// 🍽️ Restaurants
export const createRestaurant = (payload) => http.post(endpoints.createRestaurant(), payload);
export const getRestaurantById = (restaurant_id) => http.get(endpoints.getRestaurantById(restaurant_id));
export const updateRestaurant = (restaurant_id, payload) => http.put(endpoints.updateRestaurant(restaurant_id), payload);
export const toggleRestaurantStatus = (restaurant_id) => http.delete(endpoints.toggleRestaurantStatus(restaurant_id));
export const getRestaurantsByCompanyId = (company_id= "") => http.get(endpoints.getAllRestaurants(company_id));

// POS
export const createPos = (restaurant_id, payload) => http.post(endpoints.createPos(restaurant_id), payload);
export const getAllPos = () => http.get(endpoints.getAllPos());
export const getPosById = (pos_id) => http.get(endpoints.getPosById(pos_id));
export const updatePos = (pos_id, payload) => http.put(endpoints.updatePos(pos_id), payload);
export const deletePos = (pos_id) => http.delete(endpoints.deletePos(pos_id));
export const getPosByRestaurantId = (restaurant_id) => http.get(endpoints.getPosByRestaurantId(restaurant_id));

// Invoice Categories
export const createInvoiceCategory = (restaurant_id, payload) => http.post(endpoints.createInvoiceCategory(restaurant_id), payload);
export const getAllInvoiceCategories = () => http.get(endpoints.getAllInvoiceCategories());
export const getInvoiceCategoryById = (invoice_category_id) => http.get(endpoints.getInvoiceCategoryById(invoice_category_id));
export const updateInvoiceCategory = (invoice_category_id, payload) => http.put(endpoints.updateInvoiceCategory(invoice_category_id), payload);
export const deleteInvoiceCategory = (invoice_category_id) => http.delete(endpoints.deleteInvoiceCategory(invoice_category_id));

// COGS Invoices
export const createCogsInvoice = (restaurant_invoice_category_id, payload) => http.post(endpoints.createCogsInvoice(restaurant_invoice_category_id), payload);
export const getAllCogsInvoices = () => http.get(endpoints.getAllCogsInvoices());
export const getCogsInvoiceById = (cogs_invoice_id) => http.get(endpoints.getCogsInvoiceById(cogs_invoice_id));
export const updateCogsInvoice = (cogs_invoice_id, payload) => http.put(endpoints.updateCogsInvoice(cogs_invoice_id), payload);
export const deleteCogsInvoice = (cogs_invoice_id) => http.delete(endpoints.deleteCogsInvoice(cogs_invoice_id));
export const getCogsInvoicesByUserId = (user_id) => http.get(endpoints.getCogsInvoicesByUserId(user_id));
export const getCogsInvoicesByCategoryId = (category_id) => http.get(endpoints.getCogsInvoicesByCategoryId(category_id));

// Revenue (Blue Book)
export const createRevenue = (restaurant_id, payload) => http.post(endpoints.createRevenue(restaurant_id), payload);
export const getAllRevenues = (res_ids = [], user_id = null) => http.get(endpoints.getAllRevenues(res_ids,user_id));
export const updateRevenue = (revenue_id, payload) => http.put(endpoints.updateRevenue(revenue_id), payload);
export const deleteRevenue = (revenue_id) => http.delete(endpoints.deleteRevenue(revenue_id));
