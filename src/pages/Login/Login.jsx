import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { X } from "lucide-react";
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
      // console.log(res);
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
    // <div className="h-full w-full flex items-center justify-center bg-[var(--background)]">
    // make the wallaper steach to fit 
    <div className="h-full w-full flex items-center justify-center bg-[url('/background.png')] bg-cover bg-center">
      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-10 z-[100]">
          <div className="bg-white rounded-2xl shadow-elevated w-[500px] overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white px-5 py-3.5 flex justify-between items-center">
              <h2 className="text-base font-semibold">Forgot Password?</h2>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={20} className="text-white/70 hover:text-white" />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="mb-3 text-[var(--text-secondary)] text-sm">
                Enter your Email Id below to reset your password.
              </p>
              <input
                type="email"
                placeholder="Email Id"
                className="w-full mb-4 p-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
              />
              <hr className="border-t border-[var(--border)] my-3" />
              <div className="text-end">
                <button
                  className="bg-[var(--primary-accent)] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[var(--primary-accent-hover)] transition-colors"
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
      <div className="relative w-[440px] max-w-[95%] bg-white p-8 shadow-elevated rounded-2xl animate-fadeIn drop-shadow-[0_0_10px_rgba(0,0,0,0.25)]">
        {/* ❌ Exit Button - Navigate to dashboard without login */}
        {/* <button
          type="button"
          className="absolute top-4 right-4 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--filler)] rounded-xl p-1.5 transition-all duration-200"
          onClick={() => window.location.href = "/dashboard"}
          title="Exit to Dashboard (Demo Mode)"
        >
          <X size={20} />
        </button> */}

        {/* Logo */}
        <div className="mb-6 text-start flex justify-center">
          <img
            src="/LOGOnew.png"
            alt="App Logo"
            className="h-20 object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold mb-5 text-[var(--text-primary)]">Log in</h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded-xl">{error}</div>
        )}

        {/* email */}
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* password */}
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          Password
        </label>
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3.5 right-3.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[var(--primary-accent)] hover:bg-[var(--primary-accent-hover)] text-white font-semibold py-3 rounded-xl mb-2 disabled:opacity-60 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {/* <p className="text-xs text-center text-[var(--text-tertiary)] mb-4">
          Or click the ✕ button above to continue in demo mode
        </p> */}

        <div className="text-center">
          <p
            onClick={() => setShowForgotModal(true)}
            className="text-sm text-[var(--primary-accent)] font-medium cursor-pointer hover:text-[var(--primary-accent-hover)] transition-colors"
          >
            Forgot Password?
          </p>

          <p
            className="mt-2 text-sm text-[var(--secondary-accent)] font-medium cursor-pointer hover:text-sky-600 transition-colors"
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
