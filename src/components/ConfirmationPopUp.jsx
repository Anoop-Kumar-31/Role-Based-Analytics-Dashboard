import React, { useEffect } from 'react';
import { AlertCircle, X, CheckCircle2 } from 'lucide-react';

const ConfirmationPopUp =({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", type="negative" })=>{
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
    <div className="fixed inset-0 bg-[#00000033] backdrop-blur-xs flex items-center justify-center z-999999999">
      <div className="bg-white flex flex-col gap-5 rounded-2xl shadow-xl p-5 w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100 mb-20">
        <div className="flex justify-end ">
          {/* Close button with XCircle icon */}
          <button
            onClick={()=>onCancel()}
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <div className="text-center mt-2 px-4">
          {type === "positive" ? (
            <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
          ) : (
            <AlertCircle className="mx-auto text-yellow-400 mb-4" size={48} />
          )}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6 break-keep">{message}</p>
        </div>
        <div className="flex justify-around space-x-4 px-4">
          <button
            onClick={()=>onCancel()}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={()=>onConfirm()}
            className={`flex-1 px-4 py-2 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-75 font-medium
              ${type === "positive"
                ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
                : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
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