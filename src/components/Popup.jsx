import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../services/endpoints";
import toast from "react-hot-toast";

const Popup = ({ onClose }) => {
  const { user } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (oldPassword === newPassword) {
      setError("Old password and new password cannot be the same.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 5 characters and include numbers, letters, and punctuation."
      );
      return;
    }

    const response = await toast.promise(
      updateUser(user?.user_id),
      {
        loading: 'Updating user Information...',
        success: 'User Information updated successfully!',
        error: 'Failed to update user Information.',
      },
      { success: { duration: 3500 }, error: { duration: 2000 } }
    );
    if (response.status === 200) onClose();
    else setError("Failed to update user Information. Try again later.");

  };

  return (
    <div className="fixed inset-0 h-full bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        className="bg-white rounded-2xl shadow-elevated w-[clamp(100px,38%,600px)] flex flex-col gap-5 relative justify-center items-center overflow-hidden animate-slideUp"
        onSubmit={handleSubmit}
      >
        <div className="h-1 w-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)]" />
        <button
          type="button"
          className="absolute top-5 right-4 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors p-1 rounded-lg hover:bg-[var(--filler)]"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-[var(--text-primary)] px-8 pt-4">Change Password</h2>
        <div className="flex flex-col gap-4 w-full px-8">
          <div>
            <label className="block font-medium mb-1.5 text-[var(--text-secondary)] text-sm">
              Old Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
          </div>
          <div>
            <label className="block font-medium mb-1.5 text-[var(--text-secondary)] text-sm">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <div className="text-xs text-[var(--text-tertiary)] mt-1.5">
              Enter a combination of at least five numbers, letters and punctuation marks (like ! and &).
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1.5 text-[var(--text-secondary)] text-sm">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
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
          className="bg-[var(--primary-accent)] hover:bg-[var(--primary-accent-hover)] text-white font-semibold rounded-xl px-6 py-2.5 mb-6 transition-colors w-fit text-sm shadow-sm hover:shadow-md"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Popup;