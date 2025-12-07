// src/App.jsx
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";

import {  logout } from "./store/slices/authSlice";

// import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
// import "react-toastify/dist/ReactToastify.css";

import Popup from "./components/Popup";
import AppRoutes from "./routes/AppRoutes";

// Page sets per portal type
const PORTAL_PAGES = {
  superAdmin: ["Dashboard", "Expense", "Revenue", "Rest. Onboarding", "Rest. Onboarded", "Users"],
  restaurantAdmin: ["Dashboard", "Expense", "Revenue", "Blue Book", "Users", "Locations"],
  restaurantEmployee: ["Dashboard", "Expense", "Revenue", "Blue Book"],
};

const PAGE_TO_ROUTE = {
  Login: "/login",
  Dashboard: "/dashboard",
  Expense: "/expense",
  ReportExpenseForm: "/expense/report",
  Revenue: "/revenue",
  ReportRevenueForm: "/revenue/report",
  "Blue Book": "/blue-book",
  Users: "/users",
  Locations: "/locations",
  "My Profile": "/profile",
  "Rest. Onboarding": "/onboarding",
  "Rest. Onboarded": "/onboarded",
};

function AppContent() {
  const [popup, setPopup] = useState(false);
  const [portal, setPortal] = useState("");
  const token = useSelector((state) => state.auth?.token);
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!(token || localStorage.getItem("x-access-token")));
  
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  // Update isLoggedIn when redux token changes
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (token){
          setPortal(decoded.role=="Super_Admin"? "superAdmin" : decoded.role=="Company_Admin"? "restaurantAdmin" : "restaurantEmployee");
        }
        
        if (decoded.exp < currentTime) {
          // Token expired
          toast.error("Session expired. Please login again.");
          dispatch(logout());
          setIsLoggedIn(false);
          navigate("/login");
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        dispatch(logout());
        setIsLoggedIn(false);
        navigate("/login");
      }
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [token, dispatch, navigate]);


  // Redirect based on login status
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    } else if (isLoggedIn && window.location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // Handle login result from Login page
  const handleLoginClose = (loggedIn) => {
    if (loggedIn) {
      setIsLoggedIn(true);
      localStorage.setItem("activePage", "Dashboard");
      navigate("/dashboard");
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <div className="App relative min-h-screen">
      {/* Portal Switcher */}


      {/* Render all routes, pass portal info */}
      <AppRoutes
        portal={portal}
        isLoggedIn={isLoggedIn}
        handleLoginClose={handleLoginClose}
        PORTAL_PAGES={PORTAL_PAGES}
        PAGE_TO_ROUTE={PAGE_TO_ROUTE}
        setPopup= {setPopup}
        setIsLoggedIn={setPopup}
      />

      {/* Popup, if open */}
      {popup && <Popup onClose={() => setPopup(false)} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* <ToastContainer className="z-[1000000]" /> */}
      <Toaster className="z-[10000000]" />
      <AppContent />
    </Router>
  );
}

export default App;
