import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[var(--background)]">
      <div className="w-10 h-10 border-[3px] border-[var(--border)] border-t-[var(--primary-accent)] rounded-full animate-spin"></div>
      <p className="mt-3 text-sm text-[var(--text-tertiary)] font-medium">Loading...</p>
    </div>
  );
};

export default Loading;