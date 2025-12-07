// src/components/Unauthorized.jsx
import React from "react";

const Unauthorized = () => (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <h1>🚫 403 - Unauthorized</h1>
    <p>This route is not permitted for your role or login state.</p>
  </div>
);

export default Unauthorized;
