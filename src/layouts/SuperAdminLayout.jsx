// src/layouts/SuperAdminLayout.jsx
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const SuperAdminLayout = () => (
  <div>
    <Outlet />
  </div>
);

export default SuperAdminLayout;
