# API Inventory Report

This document lists all API endpoints defined in the frontend application, detailing the service functions, HTTP methods, endpoint URLs, and expected payloads/arguments.

## 1. Authentication & Logs
**File:** `src/services/modules/authService.js`, `src/services/modules/authLogService.js`

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `signin` | POST | `/api/v1/users/signin` | `credentials` (presumed `{email, password}`) | In Use |
| `onboarding` | POST | `/api/v1/onboarding` | `data` | In Use |
| `getAuthLogs` | GET | `/api/v1/auth-log` | - | In Use |
| `getAuthLogsByUserId` | GET | `/api/v1/auth-log/user/:user_id` | `user_id` | In Use |
| `getAuthLogById` | GET | `/api/v1/auth-log/log/:auth_log_id` | `auth_log_id` | In Use |

## 2. User Management
**File:** `src/services/modules/userService.js`

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `createUser` / `addUser` | POST | `/api/v1/users` | `payload` (User details) | In Use |
| `getAllUsers` | GET | `/api/v1/users?company_id=...` | `company_id` (optional) | In Use |
| `getUserById` | GET | `/api/v1/users/:user_id` | `user_id` | In Use |
| `getUserByEmail` | GET | `/api/v1/users/by-email` | Query param: `email` | In Use |
| `updateUser` | PUT | `/api/v1/users/:user_id` | `user_id`, `payload` | In Use |
| `deleteUser` | DELETE | `/api/v1/users/:user_id` | `user_id` | In Use |
| `blockUser` | PATCH | `/api/v1/users/:user_id` | `user_id` | In Use |
| `getUserRestaurants` | GET | `/api/v1/users/restaurants/:user_id` | `user_id` | In Use |
| `getUserCompany` | GET | `/api/v1/users/company/:user_id` | `user_id` | In Use |

## 3. Company Management
**File:** `src/services/modules/companyService.js`

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `createCompany` | POST | `/api/v1/companies` | `payload` | In Use |
| `getCompanyById` | GET | `/api/v1/companies/:company_id` | `company_id` | In Use |
| `updateCompany` | PUT | `/api/v1/companies/:company_id` | `company_id`, `payload` | In Use |
| `toggleCompanyStatus` | DELETE | `/api/v1/companies/:company_id` | `company_id` | In Use |
| `getAllOnboardedCompanies` | GET | `/api/v1/companies/onboarded` | - | In Use |
| `getAllPendingCompanies` | GET | `/api/v1/companies/pending-onboarding` | - | In Use |

## 4. Restaurant Management
**File:** `src/services/modules/restaurantService.js`

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `createRestaurant` | POST | `/api/v1/restaurants` | `payload` | In Use |
| `getRestaurantById` | GET | `/api/v1/restaurants/:restaurant_id` | `restaurant_id` | In Use |
| `updateRestaurant` | PUT | `/api/v1/restaurants/:restaurant_id` | `restaurant_id`, `payload` | In Use |
| `toggleRestaurantStatus` | DELETE | `/api/v1/restaurants/:restaurant_id` | `restaurant_id` | In Use |
| `getRestaurantsByCompanyId`| GET | `/api/v1/restaurants/by-company/:company_id` | `company_id` (optional) | In Use |

## 5. Expense Management
**File:** `src/services/modules/expenseService.js`

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `createExpense` | POST | `/api/v1/expense` | `data` (FormData) | In Use |
| `getExpense` | GET | `/api/v1/expense/:company_id` | `company_id` (optional) | In Use |
| `deleteExpense` | DELETE | `/api/v1/expense/:expenseId` | `expenseId` | In Use |
| `updateExpense` | PATCH | `/api/v1/expense/:expenseId` | `expenseId`, `data` | In Use |

## 6. Revenue Management
**File:** `src/services/modules/restaurantService.js` (Mixed in)

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `createRevenue` | POST | `/api/v1/restaurants/:restaurant_id/revenue` | `restaurant_id`, `payload` | In Use |
| `getAllRevenues` | GET | `/api/v1/restaurants/revenue/all` | `res_ids` (array), `user_id` (optional) | In Use |
| `updateRevenue` | PUT | `/api/v1/restaurants/revenue/:revenue_id` | `revenue_id`, `payload` | In Use |
| `deleteRevenue` | DELETE | `/api/v1/restaurants/revenue/:revenue_id` | `revenue_id` | In Use |

## 7. Blue Book (Manager's Log)
**File:** `src/services/modules/blueBookService.js`
> [!NOTE]
> These services are defined but **NOT connected** in the frontend `BlueBook.jsx` component yet.

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `createBlueBook` | POST | `/api/v1/blue-book` | `payload` | **Unused** |
| `getBlueBookByDate` | GET | `/api/v1/blue-book/:restaurant_id/:date` | `restaurant_id`, `date` | **Unused** |
| `createStaffNote` | POST | `/api/v1/blue-book/:id/staff-notes` | `blue_book_id`, `payload` | **Unused** |
| `updateStaffNote` | PUT | `/api/v1/blue-book/staff-notes/:id` | `staff_notes_id`, `payload` | **Unused** |
| `deleteStaffNote` | DELETE | `/api/v1/blue-book/staff-notes/:id` | `staff_notes_id` | **Unused** |
| `createMiscNote` | POST | `/api/v1/blue-book/:id/misc-notes` | `blue_book_id`, `payload` | **Unused** |
| *... (Item86 & other notes)* | ... | ... | ... | **Unused** |

## 8. Orders & Items
**File:** `src/services/modules/orderService.js`
> [!NOTE]
> These services are defined but **no usage found** in the scanned frontend codebase.

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `createOrder` | POST | `/api/v1/orders` | `payload` | **Unused** |
| `getAllOrders` | GET | `/api/v1/orders` | - | **Unused** |
| `getOrderById` | GET | `/api/v1/orders/:id` | `id` | **Unused** |
| *... (Items CRUD)* | ... | ... | ... | **Unused** |

## 9. Location & Onboarding
**File:** `src/services/modules/locationService.js`, `src/services/modules/onboardingService.js`

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `updateLocationData` | PUT | `/api/v1/location` | `data` | In Use |
| `onboardCompany` | PATCH | `/api/v1/onboarding/onboard/:company_id` | `company_id` | In Use |
| `rejectCompany` | PATCH | `/api/v1/onboarding/reject/:company_id` | `company_id` | In Use |

## 10. AI Services
**File:** `src/services/modules/invoiceService.js`

| Service Function | Method | Endpoint | Arguments / Payload | Status |
| :--- | :--- | :--- | :--- | :--- |
| `processInvoice` | POST | *(Defined in endpointsAiServices)* | `file` (FormData) | In Use |
