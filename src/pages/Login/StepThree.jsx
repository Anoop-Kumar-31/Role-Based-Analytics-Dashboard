import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const StepThree = ({ prevStep, step, title, toast, setToastData, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(); // Await the async function
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 pb-8">
      <ProgressBar currentStep={step} title={title} />
      {/* Is Toast your Point of Sale? */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Is Toast your Point of Sale?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <label key={option} className={`cursor-pointer px-5 py-2 rounded-lg border text-sm font-medium transition-all ${toast.uses_toast_pos === option ? "bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white" : "bg-white border-[var(--border)] text-[var(--text-secondary)]"}`}>
              <input
                type="radio"
                name="toastPOS"
                value={option}
                checked={toast.uses_toast_pos === option}
                onChange={(e) => setToastData((t) => ({ ...t, uses_toast_pos: e.target.value }))}
                className="hidden"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Show platform input if No */}
      {toast.uses_toast_pos === "No" && (
        <div className="mb-6 animate-fadeIn">
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            If no, which platform do you use?
          </label>
          <input
            type="text"
            value={toast.platform}
            onChange={(e) => setToastData((t) => ({ ...t, platform: e.target.value }))}
            placeholder="e.g. Clover, Square"
            className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
          />
        </div>
      )}

      {/* Show SSH export questions if Yes */}
      {toast.uses_toast_pos === "Yes" && (
        <div className="animate-fadeIn">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Have you turned on the SSH Data Exports in Toast? <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((option) => (
                <label key={option} className={`cursor-pointer px-5 py-2 rounded-lg border text-sm font-medium transition-all ${toast.ssh_data_exports_enabled === option ? "bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white" : "bg-white border-[var(--border)] text-[var(--text-secondary)]"}`}>
                  <input
                    type="radio"
                    name="sshEnabled"
                    value={option}
                    checked={toast.ssh_data_exports_enabled === option}
                    onChange={(e) => setToastData((t) => ({ ...t, ssh_data_exports_enabled: e.target.value }))}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Would you like us to help you turn those on?
            </label>
            <div className="flex gap-4">
              {["Yes", "No", "N/A"].map((option) => (
                <label key={option} className={`cursor-pointer px-5 py-2 rounded-lg border text-sm font-medium transition-all ${toast.need_help_enabling_exports === option ? "bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white" : "bg-white border-[var(--border)] text-[var(--text-secondary)]"}`}>
                  <input
                    type="radio"
                    name="needHelp"
                    value={option}
                    checked={toast.need_help_enabling_exports === option}
                    onChange={(e) => setToastData((t) => ({ ...t, need_help_enabling_exports: e.target.value }))}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)] mt-6">
        <button
          onClick={prevStep}
          className="bg-white border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--filler)] text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
        >
          ← Back
        </button>
        <button
          onClick={() => handleSubmit()}
          disabled={loading}
          className={`bg-[var(--primary-accent)] hover:bg-[var(--primary-accent-hover)] text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-all shadow-sm ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default StepThree;
