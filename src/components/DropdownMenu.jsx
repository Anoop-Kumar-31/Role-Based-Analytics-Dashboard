import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice"; // Adjust path

import { persistor } from "../store/index.js"; // Adjust path


const DropdownMenu = ({ setActivePage, closeDropdown, setPopup, setIsLoggedIn }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    console.log("Logging out...");

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
        absolute top-full right-0 mt-[5px] bg-white text-[var(--primary-black)]
        shadow-[0_2px_8px_#00000033] rounded-[8px] w-full z-10
      "
    >
      <div
        className="
          px-5 py-2 cursor-pointer border-b border-[#eaeaea]
          transition-all duration-200 hover:bg-[var(--filler)]
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
          px-5 py-2 cursor-pointer border-b border-[#eaeaea]
          transition-all duration-200 hover:bg-[var(--filler)]
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
          px-5 py-2 cursor-pointer transition-all duration-200 hover:bg-[var(--filler)]
        "
        onClick={handleLogOut}
      >
        Logout
      </div>
    </div>
  );
}

export default DropdownMenu;
