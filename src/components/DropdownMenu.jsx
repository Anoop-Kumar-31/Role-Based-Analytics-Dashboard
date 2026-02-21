import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice"; // Adjust path

import { persistor } from "../store/index.js"; // Adjust path


const DropdownMenu = ({ setActivePage, closeDropdown, setPopup, setIsLoggedIn }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // console.log("Logging out...");

    localStorage.removeItem("x-access-token"); // ✅ correct key
    dispatch(logout());
    persistor.purge(); // ✅ clear redux
    setIsLoggedIn(false); // if you need local component state
    closeDropdown();
    navigate("/login"); // ✅ redirect
    setActivePage("Login")
  };

  return (
    <div
      className="
        absolute top-full right-0 mt-2 bg-white text-[var(--text-primary)]
        shadow-elevated rounded-xl w-full z-10 overflow-hidden animate-slideDown
        border border-[var(--border)]
      "
    >
      <div
        className="
          px-4 py-2.5 cursor-pointer border-b border-[var(--border)]
          transition-all duration-200 hover:bg-[var(--filler)] text-sm font-medium
        "
        onClick={() => {
          setActivePage('My Profile');
          navigate("/profile");
          closeDropdown();
        }}
      >
        Profile
      </div>
      <div
        className="
          px-4 py-2.5 cursor-pointer border-b border-[var(--border)]
          transition-all duration-200 hover:bg-[var(--filler)] text-sm font-medium
        "
        onClick={() => {
          setPopup(true);
          closeDropdown();
        }}
      >
        Change Password
      </div>
      <div
        className="
          px-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-red-50 text-sm font-medium text-red-600
        "
        onClick={handleLogOut}
      >
        Logout
      </div>
    </div>
  );
}

export default DropdownMenu;
