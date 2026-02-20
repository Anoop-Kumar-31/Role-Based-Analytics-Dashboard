// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages and layouts
import Profile from "../pages/common-pages/Profile/Profile";
import Dashboard from "../pages/common-pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Unauthorized from "../components/Unauthorized";

// Super Admin Pages
import SAUsers from "../pages/super-admin/Users/Users";
import SAOnBoarding from "../pages/super-admin/OnBoarding/OnBoarding";
import SAOnBoarded from "../pages/super-admin/OnBoarded/OnBoarded";
import SAExpense from "../pages/super-admin/Expense/Expense";
import SARevenue from "../pages/super-admin/Revenue/Revenue";

// Restaurant Admin Pages
import RAExpense from "../pages/restaurant-admin/Expense/Expense";
import RARevenue from "../pages/restaurant-admin/Revenue/Revenue";
import RABlueBook from "../pages/restaurant-admin/BlueBook/BlueBook";
import RAUsers from "../pages/restaurant-admin/Users/Users";
import RALocations from "../pages/restaurant-admin/Locations/Locations";

// Restaurant Employee Pages
import REExpense from "../pages/restaurant-employee/Expense/Expense";
import RERevenue from "../pages/restaurant-employee/Revenue/Revenue";
import REBlueBook from "../pages/restaurant-employee/BlueBook/BlueBook";

// Layout (generic)
import PortalLayout from "../components/PortalLayout";

const ProtectedRoute = ({ isLoggedIn, children }) => children
// isLoggedIn ? children : <Navigate to="/login" replace />;

const AppRoutes = ({ portal, isLoggedIn, handleLoginClose, PAGE_TO_ROUTE, PORTAL_PAGES, setPopup, setIsLoggedIn }) => (
  <Routes>
    {/* Login Route */}
    <Route
      path="/login"
      element={
        isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onClose={handleLoginClose} />
      }
    />

    {/* Portal based routing */}
    {portal === "superAdmin" && (
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PortalLayout allowedPages={PORTAL_PAGES.superAdmin} portal={portal} pageToRoute={PAGE_TO_ROUTE} setPopup={setPopup} setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<SAUsers />} />
        <Route path="onboarding" element={<SAOnBoarding />} />
        <Route path="onboarded" element={<SAOnBoarded />} />
        <Route path="expense" element={<SAExpense />} />
        <Route path="revenue" element={<SARevenue />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    )}

    {portal === "restaurantAdmin" && (
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PortalLayout allowedPages={PORTAL_PAGES.restaurantAdmin} portal={portal} pageToRoute={PAGE_TO_ROUTE} setPopup={setPopup} setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="expense" element={<RAExpense />} />
        <Route path="revenue" element={<RARevenue />} />
        <Route path="blue-book" element={<RABlueBook />} />
        <Route path="users" element={<RAUsers />} />
        <Route path="locations" element={<RALocations />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    )}

    {portal === "restaurantEmployee" && (
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PortalLayout allowedPages={PORTAL_PAGES.restaurantEmployee} portal={portal} pageToRoute={PAGE_TO_ROUTE} setPopup={setPopup} setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="expense" element={<REExpense />} />
        <Route path="revenue" element={<RERevenue />} />
        <Route path="blue-book" element={<REBlueBook />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    )}

    {/* Always available */}
    <Route path="*" element={<Unauthorized />} />
  </Routes>
);

export default AppRoutes;
