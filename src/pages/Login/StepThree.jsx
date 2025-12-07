import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const StepThree = ({ prevStep, step, title, toast,  setToastData, onSubmit }) => {
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
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Onboarding Questionnaire
      </h2>

      <ProgressBar step={step} title={title} />
      <hr className="border-t border-gray-200 my-4" />

      {/* Is Toast your Point of Sale? */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          Is Toast your Point of Sale?
        </label>
        <div className="flex gap-6 mt-2">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center gap-2 text-[16px] text-gray-800">
              <input
                type="radio"
                name="toastPOS"
                value={option}
                checked={toast.uses_toast_pos === option}
                onChange={(e) =>  setToastData((t) => ({ ...t, uses_toast_pos: e.target.value }))}
                className="accent-blue-600 text-xl"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Show platform input if No */}
      {toast.uses_toast_pos === "No" && (
        <div className="mb-6">
          <label className="block font-semibold mb-1">
            If no, which platform do you use?
          </label>
          <input
            type="text"
            value={toast.platform}
            onChange={(e) =>  setToastData((t) => ({ ...t, platform: e.target.value }))}
            placeholder="Enter platform name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      {/* Show SSH export questions if Yes */}
      {toast.uses_toast_pos === "Yes" && (
        <>
          <div className="mb-6">
            <label className="block font-semibold mb-1">
              Have you turned on the SSH Data Exports in Toast? <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-6 mt-2">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-[16px] text-gray-800">
                  <input
                    type="radio"
                    name="sshEnabled"
                    value={option}
                    checked={toast.ssh_data_exports_enabled === option}
                    onChange={(e) =>  setToastData((t) => ({ ...t, ssh_data_exports_enabled: e.target.value }))}
                    className="accent-blue-600 text-xl"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">
              Would you like us to help you turn those on?
            </label>
            <div className="flex gap-6 mt-2">
              {["Yes", "No", "N/A"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-[16px] text-gray-800">
                  <input
                    type="radio"
                    name="needHelp"
                    value={option}
                    checked={toast.need_help_enabling_exports === option}
                    onChange={(e) =>  setToastData((t) => ({ ...t, need_help_enabling_exports: e.target.value }))}
                    className="accent-blue-600 text-xl"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-800 text-lg px-6 py-3 rounded-lg hover:bg-gray-400"
        >
          ← Back
        </button>
        <button
          onClick={()=> handleSubmit()}
          disabled={loading}
           className={`bg-green-600 text-white text-lg px-8 py-3 rounded-lg hover:bg-green-700 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default StepThree;
