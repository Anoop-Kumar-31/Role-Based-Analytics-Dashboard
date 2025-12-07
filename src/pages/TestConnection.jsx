// src/pages/TestConnection.jsx
import { useEffect, useState } from "react";
import http from "../services/httpService";
import endpoints from "../services/endpoints";

const TestConnection = () => {
  const [message, setMessage] = useState("sample message");

  // useEffect(() => {
  //   http.get(endpoints.getAllUsers()) // or any GET endpoint you have
  //     .then((data) => setMessage("✅ Connected! Got users."))
  //     .catch((err) => setMessage("❌ Failed to connect: " + err.message));
  // }, []);

  return <div>{message}</div>;
};

export default TestConnection;