// src/layout/RestaurantEmployeeLayout.jsx
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const RestaurantEmployeeLayout = () => (
  <div>
    <Outlet />
  </div>
);

export default RestaurantEmployeeLayout;
