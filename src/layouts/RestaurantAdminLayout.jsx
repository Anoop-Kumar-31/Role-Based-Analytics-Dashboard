// src/layout/RestaurantAdminLayout.jsx
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const RestaurantAdminLayout = () => (
  <div>
    <Outlet />
  </div>
);

export default RestaurantAdminLayout;