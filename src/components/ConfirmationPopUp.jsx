import React, { useEffect } from 'react';
import { AlertCircle, X, CheckCircle2 } from 'lucide-react';

const ConfirmationPopUp = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", type = "negative" }) => {
  // Use useEffect to prevent body scrolling when the popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'unset'; // Re-enable scrolling
    }
    // Cleanup function to re-enable scrolling if the component unmounts while open
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 h-[calc(100vh-60px)] bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white flex flex-col gap-4 rounded-2xl shadow-elevated w-full max-w-lg transform transition-all duration-300 overflow-hidden animate-slideUp mb-20">
        <div className={`h-1 w-full ${type === 'positive' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`} />
        <div className="flex justify-end px-5 pt-3">
          {/* Close button with X icon */}
          <button
            onClick={() => onCancel()}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none p-1 rounded-lg hover:bg-[var(--filler)]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="text-center px-6">
          {type === "positive" ? (
            <CheckCircle2 className="mx-auto text-emerald-500 mb-3" size={44} />
          ) : (
            <AlertCircle className="mx-auto text-amber-400 mb-3" size={44} />
          )}
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1.5">{title}</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-4 break-keep">{message}</p>
        </div>
        <div className="flex justify-center gap-3 px-6 pb-5">
          <button
            onClick={() => onCancel()}
            className="flex-1 px-4 py-2.5 bg-[var(--filler)] text-[var(--text-secondary)] rounded-xl hover:bg-[var(--border)] transition-colors focus:outline-none font-medium text-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={() => onConfirm()}
            className={`flex-1 px-4 py-2.5 rounded-xl transition-colors focus:outline-none font-medium text-sm
              ${type === "positive"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopUp;