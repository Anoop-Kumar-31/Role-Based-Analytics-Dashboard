import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--primary-accent)]/5 rounded-full blur-[80px]"></div>

      <div className="relative flex flex-col items-center animate-fadeIn">
        {/* Logo with pulse */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-[var(--primary-accent)]/20 rounded-full blur-xl animate-pulse-slow"></div>
          <img
            src="/LOGOnew.png"
            alt="BreadCrumbs"
            className="h-24 w-auto object-contain relative z-10 animate-pulse-slow"
          />
        </div>

        {/* Brand Text */}
        <div className="mb-6 flex flex-col items-center text-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent">
            Role Based Access Control Analytics
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-semibold mt-1">
            Financial Analytics
          </p>
          <p className="text-[10px] italic tracking-[0.1em] text-[var(--text-tertiary)] font-semibold mt-1">
            By- Anoop Kumar
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-48 h-1 bg-[var(--filler)] rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] rounded-full animate-shimmer"
            style={{
              width: "60%",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s linear infinite"
            }}
          ></div>
        </div>

        {/* Status Text */}
        <p className="mt-4 text-[11px] text-[var(--text-secondary)] animate-pulse">
          Starting your experience...
        </p>
      </div>

      {/* Decorative footer elements */}
      <div className="absolute bottom-8 flex items-center gap-2 text-[var(--text-tertiary)] text-[10px]">
        <span>Precision</span>
        <span className="w-1 h-1 bg-[var(--border)] rounded-full"></span>
        <span>Insight</span>
        <span className="w-1 h-1 bg-[var(--border)] rounded-full"></span>
        <span>Growth</span>
      </div>
    </div>
  );
};

export default Loading;
