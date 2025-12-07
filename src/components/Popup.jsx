import React, { useState } from "react";
import { X } from "lucide-react";

const Popup = ({ onClose, onSubmit }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pwd) => {
    // At least 5 chars, contains number, letter, and punctuation
    return (
      pwd.length >= 5 &&
      /[0-9]/.test(pwd) &&
      /[a-zA-Z]/.test(pwd) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 5 characters and include numbers, letters, and punctuation."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    // Simulate submit
    if (onSubmit) {
      onSubmit({ oldPassword, newPassword });
    }
    alert("Password updated!");
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#00000033] bg-opacity-80 flex items-center justify-center z-[999999999] backdrop-blur-xs">
      <form
        className="bg-white rounded-xl shadow-lg w-[clamp(100px,38%,600px)] p-8 flex flex-col gap-6 relative justify-center items-center"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-2 text-[var(--primary-black)]">Change Password</h2>
        <div className="flex flex-col gap-4 w-fill">
          <div>
            <label className="block font-semibold mb-1 text-[var(--main-blue)]">
              Old Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-[var(--main-blue)]">
              New Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <div className="text-[13px] text-red-800 mt-1">
              Enter a combination of at least five numbers, letters and punctuation marks (like ! and &).
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-[var(--main-blue)]">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-[var(--primary-blue)] hover:brightness-90 text-white font-semibold rounded-lg px-6 py-2 mt-2 transition-colors w-fit"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Popup;