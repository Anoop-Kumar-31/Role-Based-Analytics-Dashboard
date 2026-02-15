import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { X } from "lucide-react";
import logo from "../../assets/images/logo.png";
import OnboardingQuestionnaire from "./OnboardingQuestionnaire";
import { signin } from "../../services/modules/authService"; // <-- Import login API

import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";


const Login = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const dispatch = useDispatch();

  // Add state for form fields and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await signin({ email, password });
      console.log(res);
      // Get token from res.data.accessToken
      const { accessToken, user } = res?.data;
      // console.log(user)

      if (!accessToken || !user) {
        throw new Error("No response data from Server.");
      }
      // console.log(user, accessToken);
      dispatch(setCredentials({ user, token: accessToken }));

      localStorage.setItem("activePage", "Dashboard");
      onClose(true); // Go to dashboard
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = () => {
    alert(`Reset link sent to: ${forgotEmail}`);
    setShowForgotModal(false);
  };

  return (
    <div className="h-full w-full bg-gray-50 bg-opacity-95 flex items-center justify-center">
      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] flex justify-center items-start pt-10 z-[100]">
          <div className="bg-white rounded-lg shadow-lg w-[500px]">
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
              <h2 className="text-lg">Forgot Password?</h2>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-xl hover:text-gray-200"
              >
                <X size={24} className=" text-white hover:text-gray-300" />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="mb-3 text-gray-700">
                Enter your Email Id below to reset your password.
              </p>
              <input
                type="email"
                placeholder="Email Id"
                className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-blue-500"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
              />
              <hr className="border-t border-gray-200 my-3" />
              <div className="text-end">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleForgotSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Login Box */}
      <div className="relative w-[500px] bg-white p-8 shadow-[lightgray_0_0_40px_-20px] rounded-2xl pt-3">
        {/* ❌ Exit Button - Navigate to dashboard without login */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-colors"
          onClick={() => window.location.href = "/dashboard"}
          title="Exit to Dashboard (Demo Mode)"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="mb-6 text-start flex justify-center">
          <img
            src={logo}
            alt="App Logo"
            className="h-25 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">Log in</h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        {/* email */}
        <label className="block text-md font-semibold text-gray-800 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="w-full border-none p-3 rounded-[10px] bg-gray-100 placeholder-gray-450 text-gray-800 focus:outline-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* password */}
        <label className="block text-md font-semibold text-gray-800 mb-1">
          Password
        </label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border-none p-3 rounded-[10px] bg-gray-100 placeholder-gray-450 text-gray-800 focus:outline-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-4 right-4 text-gray-500"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-2 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="text-xs text-center text-gray-500 mb-4">
          Or click the ✕ button above to continue in demo mode
        </p>

        <div className="text-center">
          <p
            onClick={() => setShowForgotModal(true)}
            className="text-sm text-violet-600 font-medium cursor-pointer hover:text-violet-800"
          >
            Forgot Password?
          </p>

          <p
            className="mt-2 text-sm text-blue-500 font-medium cursor-pointer hover:text-blue-700"
            onClick={() => setShowQuestionnaire(true)}
          >
            Onboarding Questionnaire →
          </p>
        </div>
      </div>

      {/* ✅ Questionnaire Modal Rendered Here */}
      {showQuestionnaire && (
        <OnboardingQuestionnaire onClose={() => setShowQuestionnaire(false)} />
      )}
    </div>
  );
};

export default Login;
