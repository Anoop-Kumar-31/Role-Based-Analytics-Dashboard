# Blue Book (Manager's Log) API Specification

This document details the API endpoints and expected data payloads for the **Blue Book** feature (`BlueBook.jsx`). The frontend currently prepares a monolithic form submission, while the `blueBookService.js` suggests a resource-based structure (Daily Log + Sub-resources).

---

## 1. Daily Blue Book Log (Core Record)

**Goal:** Create or retrieve the main daily record for a restaurant.

### 1.1 Create Daily Log
**Endpoint:** `POST /api/v1/blue-book`
**Function:** `createBlueBook(payload)`

**Request Body (JSON):**
```json
{
  "restaurant_id": "string (UUID)",
  "date": "YYYY-MM-DD",
  "email": "user@example.com",
  "weather": "string",
  "sections": {
    "breakfast_sales": 1200.50,
    "breakfast_guests": 45,
    "lunch_sales": 2500.00,
    "lunch_guests": 120,
    "dinner_sales": 5000.75,
    "dinner_guests": 200,
    "total_sales": 8701.25,
    "total_sales_last_year": 8000.00,
    "food_sales": 6000.00,
    "lbw_sales": 2701.25,
    "hourly_labor_cost": 1500.00,
    "hourly_labor_percent": 17.2,
    "total_hours_worked": 120.5,
    "splh": 72.2
  },
  "status": "submitted" // optional, default: "draft"
}
```

### 1.2 Get Daily Log
**Endpoint:** `GET /api/v1/blue-book/:restaurant_id/:date`
**Function:** `getBlueBookByDate(restaurant_id, date)`

**Response Body:**
```json
{
  "blue_book_id": "string (UUID)",
  "restaurant_id": "string",
  "date": "2023-10-27",
  "weather": "Sunny",
  "stats": { ... }, // Same as 'sections' above
  "staff_notes": [ ... ],
  "misc_notes": [ ... ],
  "item_86s": [ ... ]
}
```

---

## 2. Staff Notes

**Goal:** Manage notes related to staff (e.g., Performance, Issues).
**Mapped Frontend Fields:** "Staff Notes", "Include salaried and managers..."

### 2.1 Create Staff Note
**Endpoint:** `POST /api/v1/blue-book/:blue_book_id/staff-notes`
**Function:** `createStaffNote(blue_book_id, payload)`

**Request Body:**
```json
{
  "note_content": "Server John Doe was exceptional tonight.",
  "category": "Performance", // Optional: "Performance", "Disciplinary", "General"
  "author_id": "user_id"
}
```

### 2.2 Update Staff Note
**Endpoint:** `PUT /api/v1/blue-book/staff-notes/:staff_note_id`
**Function:** `updateStaffNote(staff_note_id, payload)`

**Request Body:**
```json
{
  "note_content": "Updated content..."
}
```

### 2.3 Delete Staff Note
**Endpoint:** `DELETE /api/v1/blue-book/staff-notes/:staff_note_id`
**Function:** `deleteStaffNote(staff_note_id)`

---

## 3. Misc Notes

**Goal:** Manage general operational notes.
**Mapped Frontend Fields:** "WINS!", "Misses", "Maintenance Issues", "Misc Notes"

### 3.1 Create Misc Note
**Endpoint:** `POST /api/v1/blue-book/:blue_book_id/misc-notes`
**Function:** `createMiscNote(blue_book_id, payload)`

**Request Body:**
```json
{
  "note_content": "Refrigerator in back broke down.",
  "category": "Maintenance", // or "Wins", "Misses", "General"
  "severity": "High" // Optional
}
```

### 3.2 Update Misc Note
**Endpoint:** `PUT /api/v1/blue-book/misc-notes/:misc_note_id`
**Function:** `updateMiscNote(misc_note_id, payload)`

### 3.3 Delete Misc Note
**Endpoint:** `DELETE /api/v1/blue-book/misc-notes/:misc_note_id`
**Function:** `deleteMiscNote(misc_note_id)`

---

## 4. Item 86 (Out of Stock)

**Goal:** Track items that are 86'd (out of stock).
**Mapped Frontend Fields:** "86’d Items"

### 4.1 Create Item 86
**Endpoint:** `POST /api/v1/blue-book/:blue_book_id/item86`
**Function:** `createItem86(blue_book_id, payload)`

**Request Body:**
```json
{
  "item_name": "Ribeye Steak",
  "reason": "Supplier shortage",
  "quantity_wasted": 0 // Optional
}
```

### 4.2 Update Item 86
**Endpoint:** `PUT /api/v1/blue-book/item86/:item86_id`
**Function:** `updateItem86(id, payload)`

### 4.3 Delete Item 86
**Endpoint:** `DELETE /api/v1/blue-book/item86/:item86_id`
**Function:** `deleteItem86(id)`

### 4.4 Get All 86 Items
**Endpoint:** `GET /api/v1/blue-book/item86`
**Function:** `getAllItem86s()`

---

## Summary of Discrepancies
1.  **Monolithic vs. Granular:** `BlueBook.jsx` gathers all data (`formData` + `notesData`) and attempts a single submission. The backend API structure (inferred from services) supports granular sub-resources (`createStaffNote`, etc.).
    *   **Recommendation:** The `createBlueBook` endpoint should likely accept an initial array of notes/items to create them in one transaction, OR the frontend needs to loop through `notesData` and call the sub-resource APIs after the main log is created.
2.  **Restaurant Identification:** `BlueBook.jsx` currently uses `restaurant` (name) in its state, whereas the API typically requires `restaurant_id`.
