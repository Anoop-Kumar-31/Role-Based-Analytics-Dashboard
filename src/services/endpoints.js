// src/services/endpoints.js

const base = "/api/v1";

const endpoints = {

  pingHealth: () => `/health`,

  // Onboarding
  onboarding: () => `${base}/onboarding`,
  rejectCopmany: (companyId) => `${base}/onboarding/reject/${companyId}`,
  onboardCompany: (company_id) => `${base}/onboarding/onboard/${company_id}`,

  // Auth (LOGIN)
  signinUser: () => `${base}/users/signin`,

  // User
  addUser: () => `${base}/users`,
  getAllUsers: (company_id = "") => {
    const query = company_id ? `?company_id=${encodeURIComponent(company_id)}` : "";
    return `${base}/users${query}`;
  },
  getUserById: (user_id) => `${base}/users/${user_id}`,
  getUserByEmail: () => `${base}/users/by-email`,
  updateUser: (user_id) => `${base}/users/${user_id}`,
  deleteUser: (user_id) => `${base}/users/${user_id}`,
  blockUser: (user_id) => `${base}/users/${user_id}/block`,
  getUserRestaurants: (user_id) => `${base}/users/restaurants/${user_id}`,

  // Company
  createCompany: () => `${base}/companies`,
  getCompanyById: (company_id) => `${base}/companies/${company_id}`,
  updateCompany: (company_id) => `${base}/companies/${company_id}`,
  getAllOnboardedCompanies: () => `${base}/companies/onboarded`,
  getAllPendingCompanies: () => `${base}/companies/pending-onboarding`,

  // Blue Book
  createBlueBook: () => `${base}/blue-book`,
  getBlueBookByDate: (restaurant_id, date) => `${base}/blue-book/${restaurant_id}/${date}`,
  updateBlueBook: (blue_book_id) => `${base}/blue-book/${blue_book_id}`,
  deleteBlueBook: (blue_book_id) => `${base}/blue-book/${blue_book_id}`,

  // Restaurants
  createRestaurant: () => `${base}/restaurants`,
  getRestaurantById: (restaurant_id) => `${base}/restaurants/${restaurant_id}`,
  updateRestaurant: (restaurant_id) => `${base}/restaurants/${restaurant_id}`,
  deleteRestaurant: (restaurant_id) => `${base}/restaurants/${restaurant_id}`,
  getAllRestaurants: (company_id = "") => {
    return company_id
      ? `${base}/restaurants/by-company/${company_id}`
      : `${base}/restaurants/by-company`;
  },

  // Revenue
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

  // Expense
  createExpense: () => `${base}/expense`,
  getExpense: (company_id = '') => `${base}/expense/${company_id}`,
  deleteExpense: (expenseId) => `${base}/expense/${expenseId}`,
  updateExpense: (expenseId) => `${base}/expense/${expenseId}`,

  // Roles
  getAllRoles: () => `${base}/roles`,

  // Location
  updateLocationData: () => `${base}/location`,

  // Dashboard Stats
  getDashboardStats: () => `${base}/dashboard/stats`,
};

export default endpoints;
