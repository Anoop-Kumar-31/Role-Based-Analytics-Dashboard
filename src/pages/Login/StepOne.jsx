import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const StepOne = ({ nextStep, step, title, user, setUser }) => {
  return (
    <div className="px-8 pb-8">
      <ProgressBar currentStep={step} title={title} />
      {/* name */}
      <div className="grid grid-cols-2 gap-5 mb-5 max-md:grid-cols-1">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser((u) => ({ ...u, first_name: e.target.value }))}
            className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
            placeholder="Jane"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={user.last_name}
            onChange={(e) => setUser((u) => ({ ...u, last_name: e.target.value }))}
            className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email, Number */}
      <div className="grid grid-cols-2 gap-5 mb-5 max-md:grid-cols-1">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={user.email}
            onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))}
            className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="(555) 123-4567"
            value={user.phone_number}
            onChange={(e) => setUser((u) => ({ ...u, phone_number: e.target.value }))}
            className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* preferred contact method */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Preferred Contact Method <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-4">
          {["Phone", "Email", "Text", "Other"].map((option) => (
            <label key={option}
              className={`
                cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium transition-all
                ${user.preferred_contact_method === option
                  ? "bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white shadow-md"
                  : "bg-white border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
                }
              `}
            >
              <input
                type="radio"
                name="contactMethod"
                value={option}
                className="hidden"
                onChange={() => setUser((u) => ({ ...u, preferred_contact_method: option }))}
                checked={user.preferred_contact_method === option}
              />
              {option}
            </label>
          ))}
        </div>

        {/*  Show input field if 'Other' is selected */}
        {user.preferred_contact_method === "Other" && (
          <div className="mt-3 animate-fadeIn">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Please Specify
            </label>
            <input
              type="text"
              value={user.preferred_contact_other}
              onChange={(e) => setUser((u) => ({ ...u, preferred_contact_other: e.target.value }))}
              placeholder="e.g. WhatsApp"
              className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
            />
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="text-end pt-2">
        <button
          onClick={nextStep}
          className="bg-[var(--primary-accent)] hover:bg-[var(--primary-accent-hover)] text-white font-semibold py-2.5 px-8 rounded-xl shadow-sm transition-all text-sm"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
};

export default StepOne;
