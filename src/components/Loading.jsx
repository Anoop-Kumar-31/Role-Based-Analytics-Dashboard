import React, { useState, useEffect } from "react";
import { SiSupabase, SiRender } from "react-icons/si";

const Spinner = () => (
  <span className="flex gap-[3px] items-center">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1 h-1 rounded-full bg-[var(--primary-accent)]"
        style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
      />
    ))}
  </span>
);

const ServiceRow = ({ icon: Icon, iconColor, name, detail }) => (
  <div className="flex items-center gap-2 py-2 px-2.5 rounded-lg bg-white border border-[var(--border)]">
    <div className="flex-shrink-0">
      <Icon size={15} color={iconColor} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-semibold text-[var(--text-primary)] leading-tight">{name}</p>
      <p className="text-[9px] text-[var(--text-secondary)] leading-tight">{detail}</p>
    </div>
    <Spinner />
  </div>
);

const Loading = () => {
  const [showWarmup, setShowWarmup] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowWarmup(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--primary-accent)]/5 rounded-full blur-[50px]" />

      <div className="relative flex flex-col items-center animate-fadeIn mb-25">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-[var(--primary-accent)]/20 rounded-full blur-xl animate-pulse-slow" />
          <img
            src="/LOGOnew.png"
            alt="BreadCrumbs"
            className="h-24 w-auto object-contain relative z-10 animate-pulse-slow"
          />
        </div>

        {/* Brand Text */}
        <div className="mb-6 flex flex-col items-center text-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent">
            Role Based Access Control Dashboard
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-semibold mt-1">
            Financial Analytics
          </p>
          <p className="text-[10px] italic tracking-[0.1em] text-[var(--text-tertiary)] font-semibold mt-1">
            By- Anoop Kumar
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-[var(--filler)] rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] rounded-full"
            style={{
              width: "0%",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s linear infinite, loading-bar-fill 3s forwards ease-in-out"
            }}
          />
        </div>

        <p className="mt-4 text-[11px] text-[var(--text-secondary)] animate-pulse">
          Starting your experience...
        </p>
      </div>

      {/* Warmup Card — absolutely positioned below center so it never shifts the logo/text */}
      {showWarmup && (
        <div className="absolute top-[58%] w-[270px] rounded-xl border border-[var(--border)] bg-white shadow-md overflow-hidden animate-fadeIn mt-10">
          {/* Card Header */}
          <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-2 border-b border-[var(--border)] bg-[var(--filler)]">
            <span className="text-[var(--primary-accent)] text-md">⏳</span>
            <p className="text-[11px] font-bold text-amber-500">Services are starting up</p>
          </div>

          {/* Service rows */}
          <div className="flex flex-col gap-1.5 px-2.5 py-2.5">
            <ServiceRow
              icon={SiRender}
              iconColor="#000000"
              name="Backend Server"
              detail="Render · Waking from sleep"
            />
            <ServiceRow
              icon={SiSupabase}
              iconColor="#3ECF8E"
              name="Database"
              detail="Supabase · Connecting"
            />
          </div>

          {/* Friendly note */}
          <div className="px-3 pb-3 border-t border-[var(--border)] bg-[var(--filler)]/50 pt-2 flex items-center gap-1">
            <span className="text-[var(--primary-accent)] text-sm">💡</span>
            <p className="text-[9px] text-gray-400 leading-relaxed italic">
              Servers sleep when idle to save costs — first load takes ~10-15 sec. Totally normal!
            </p>
          </div>
        </div>
      )}

      {/* Decorative footer */}
      <div className="absolute bottom-8 flex items-center gap-2 text-[var(--text-tertiary)] text-[10px]">
        <span>Precision</span>
        <span className="w-1 h-1 bg-[var(--border)] rounded-full" />
        <span>Insight</span>
        <span className="w-1 h-1 bg-[var(--border)] rounded-full" />
        <span>Growth</span>
      </div>
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[var(--text-tertiary)]">
        Free hosting · First load may be slow
      </p>
    </div>
  );
};

export default Loading;
