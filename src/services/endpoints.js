// src/services/endpoints.js

const base = "/api/v1";

const endpoints = {
  // Onboarding
  onboarding: () => `${base}/onboarding`,
  // app.patch(`${base}/reject/:company_id`, verifyToken, allowSuperAdminOnly, rest_onboardingController.markCompanyAsRejected);
  rejectCopmany: (companyId) => `${base}/onboarding/reject/${companyId}`,

  // Auth (LOGIN)
  signinUser: () => `${base}/users/signin`,

  // User
  createUser: () => `${base}/users`,
  addUser: () => `${base}/users`, // POST /users (no separate /add endpoint in your routes)
  getAllUsers: (company_id = "") => {
    const query = company_id ? `?company_id=${encodeURIComponent(company_id)}` : "";
    return `${base}/users${query}`;
  },
  getUserById: (user_id) => `${base}/users/${user_id}`,
  getUserByEmail: () => `${base}/users/by-email`, // email passed as query param in your backend `/by-email`
  updateUser: (user_id) => `${base}/users/${user_id}`,
  deleteUser: (user_id) => `${base}/users/${user_id}`,
  blockUser: (user_id) => `${base}/users/${user_id}`, // PATCH or PUT to toggle block
  getUserRestaurants: (user_id) => `${base}/users/restaurants/${user_id}`,
  getUserCompany: (user_id) => `${base}/users/company/${user_id}`,

  // Company
  createCompany: () => `${base}/companies`,
  getCompanyById: (company_id) => `${base}/companies/${company_id}`,
  updateCompany: (company_id) => `${base}/companies/${company_id}`,
  toggleCompanyStatus: (company_id) => `${base}/companies/${company_id}`,
  getAllOnboardedCompanies: () => `${base}/companies/onboarded`,
  getAllPendingCompanies: () => `${base}/companies/pending-onboarding`,

  // Blue Book
  createBlueBook: () => `${base}/blue-book`,
  getBlueBookByDate: (restaurant_id, date) => `${base}/blue-book/${restaurant_id}/${date}`,

  // Staff Notes (Blue Book)
  createStaffNote: (blue_book_id) => `${base}/blue-book/${blue_book_id}/staff-notes`,
  updateStaffNote: (staff_notes_id) => `${base}/blue-book/staff-notes/${staff_notes_id}`,
  deleteStaffNote: (staff_notes_id) => `${base}/blue-book/staff-notes/${staff_notes_id}`,
  getStaffNotesByBlueBookId: (blue_book_id) => `${base}/blue-book/staff-notes/by-bluebook/${blue_book_id}`,

  // Misc Notes (Blue Book)
  createMiscNote: (blue_book_id) => `${base}/blue-book/${blue_book_id}/misc-notes`,
  updateMiscNote: (misc_notes_id) => `${base}/blue-book/misc-notes/${misc_notes_id}`,
  getMiscNoteById: (misc_notes_id) => `${base}/blue-book/misc-notes/${misc_notes_id}`,
  deleteMiscNote: (misc_notes_id) => `${base}/blue-book/misc-notes/${misc_notes_id}`,
  getMiscNotesByBlueBookId: (blue_book_id) => `${base}/blue-book/misc-notes/by-bluebook/${blue_book_id}`,

  // Item86 (Blue Book)
  createItem86: (blue_book_id) => `${base}/blue-book/${blue_book_id}/item86`,
  getAllItem86s: () => `${base}/blue-book/item86`,
  getItem86ById: (id) => `${base}/blue-book/item86/${id}`,
  updateItem86: (id) => `${base}/blue-book/item86/${id}`,
  deleteItem86: (id) => `${base}/blue-book/item86/${id}`,
  getItem86sByBlueBookId: (blueBookId) => `${base}/blue-book/item86/by-bluebook/${blueBookId}`,

  // Orders
  createOrder: () => `${base}/orders`,
  getAllOrders: () => `${base}/orders`,
  getOrderById: (id) => `${base}/orders/${id}`,
  updateOrder: (id) => `${base}/orders/${id}`,
  deleteOrder: (id) => `${base}/orders/${id}`,
  voidOrder: (id) => `${base}/orders/${id}/void`,
  markOrderAsPaid: (id) => `${base}/orders/${id}/paid`,
  getOrdersByRestaurantId: (restaurantId) => `${base}/orders/by-restaurant/${restaurantId}`,
  getOrderWithItems: (id) => `${base}/orders/${id}/get-items`,

  // Order Items
  createItem: () => `${base}/orders/items`,
  getAllItems: () => `${base}/orders/items`,
  getItemById: (id) => `${base}/orders/items/${id}`,
  updateItem: (id) => `${base}/orders/items/${id}`,
  deleteItem: (id) => `${base}/orders/items/${id}`,
  voidItem: (id) => `${base}/orders/items/${id}/void`,
  refundItem: (id) => `${base}/orders/items/${id}/refund`,
  getItemsByOrderId: (orderId) => `${base}/orders/items/by-order/${orderId}`,

  // Restaurants
  createRestaurant: () => `${base}/restaurants`,
  getRestaurantById: (restaurant_id) => `${base}/restaurants/${restaurant_id}`,
  updateRestaurant: (restaurant_id) => `${base}/restaurants/${restaurant_id}`,
  toggleRestaurantStatus: (restaurant_id) => `${base}/restaurants/${restaurant_id}`,
  getAllRestaurants: (company_id = "") => {
    return company_id ? `${base}/restaurants/by-company/${company_id}` : `${base}/restaurants/by-company`;
  },

  // POS
  createPos: (restaurant_id) => `${base}/restaurants/${restaurant_id}/pos`,
  getAllPos: () => `${base}/restaurants/pos`,
  getPosById: (pos_id) => `${base}/restaurants/pos/${pos_id}`,
  updatePos: (pos_id) => `${base}/restaurants/pos/${pos_id}`,
  deletePos: (pos_id) => `${base}/restaurants/pos/${pos_id}`,
  getPosByRestaurantId: (restaurant_id) => `${base}/restaurants/pos/by-restaurant/${restaurant_id}`,

  // Invoice Categories
  createInvoiceCategory: (restaurant_id) => `${base}/restaurants/${restaurant_id}/invoice-category`,
  getAllInvoiceCategories: () => `${base}/restaurants/invoice-category`,
  getInvoiceCategoryById: (invoice_category_id) => `${base}/restaurants/invoice-category/${invoice_category_id}`,
  updateInvoiceCategory: (invoice_category_id) => `${base}/restaurants/invoice-category/${invoice_category_id}`,
  deleteInvoiceCategory: (invoice_category_id) => `${base}/restaurants/invoice-category/${invoice_category_id}`,

  // COGS Invoices
  createCogsInvoice: (restaurant_invoice_category_id) => `${base}/restaurants/invoice-category/${restaurant_invoice_category_id}/cogs-invoice`,
  getAllCogsInvoices: () => `${base}/restaurants/invoice-category/cogs-invoice`,
  getCogsInvoiceById: (cogs_invoice_id) => `${base}/restaurants/invoice-category/cogs-invoice/${cogs_invoice_id}`,
  updateCogsInvoice: (cogs_invoice_id) => `${base}/restaurants/invoice-category/cogs-invoice/${cogs_invoice_id}`,
  deleteCogsInvoice: (cogs_invoice_id) => `${base}/restaurants/invoice-category/cogs-invoice/${cogs_invoice_id}`,
  getCogsInvoicesByUserId: (user_id) => `${base}/restaurants/invoice-category/cogs-invoice/by-user/${user_id}`,
  getCogsInvoicesByCategoryId: (category_id) => `${base}/restaurants/invoice-category/cogs-invoice/by-category/${category_id}`,


  // Revenue (restaurants)
  createRevenue: (restaurant_id) => `${base}/restaurants/${restaurant_id}/revenue`,
  getAllRevenues: (res_ids = [], user_id = null) => {
    if (user_id) return `${base}/restaurants/revenue/all?user_id=${encodeURIComponent(user_id)}`;
    if (res_ids.length > 0) {
      const query = res_ids?.map(id => `restaurant_id=${encodeURIComponent(id)}`).join('&');
      return `${base}/restaurants/revenue/all?${query}`;
    }
    return `${base}/restaurants/revenue/all`;
  },
  updateRevenue: (revenue_id) => `${base}/restaurants/revenue/${revenue_id}`,
  deleteRevenue: (revenue_id) => `${base}/restaurants/revenue/${revenue_id}`,

  //Expense
  createExpense: () => `${base}/expense`,
  getExpense: (company_id = '') => `${base}/expense/${company_id}`, //?page=${page}&pageSize=${pageSize}
  deleteExpense: (expenseId) => `${base}/expense/${expenseId}`,
  updateExpense: (expenseId) => `${base}/expense/${expenseId}`,


  // Roles
  getAllRoles: () => `${base}/roles`,
  getPermissionsByRoleId: (role_id) => `${base}/roles/permissions/${role_id}`,

  // Auth Log
  getAuthLogs: () => `${base}/auth-log`,
  getAuthLogsByUserId: (user_id) => `${base}/auth-log/user/${user_id}`,
  getAuthLogById: (auth_log_id) => `${base}/auth-log/log/${auth_log_id}`,

  // Onboarding admin actions (CALL THIS WHEN TO ACCPET THE COMPANY REQ)
  onboardCompany: (company_id) => `${base}/onboarding/onboard/${company_id}`,

  //Location Page use
  updateLocationData: () => `${base}/location`,


  //AI invoice extractor
  // aiInvoiceExtractor: () => ``, // add in apiclinet if don't want localhost in frontend
};

export default endpoints;
