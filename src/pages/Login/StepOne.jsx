import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const StepOne = ({ nextStep, step, title, user, setUser }) => {
  return (
    <div className="p-6 max-md:p-0">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Onboarding Questionnaire
      </h2>

      <ProgressBar step={step} title={title} />

      <hr className="border-t border-gray-200 my-4" />

      {/* name */}
      <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
        <div>
          <label className="block font-semibold mb-1">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser((u) => ({ ...u, first_name: e.target.value }))}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={user.last_name}
            onChange={(e) => setUser((u) => ({ ...u, last_name: e.target.value }))}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Email, Number */}
      <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
        <div>
          <label className="block font-semibold mb-1">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="example@example.com"
            value={user.email}
            onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="(000) 000-0000"
            value={user.phone_number}
            onChange={(e) => setUser((u) => ({ ...u, phone_number: e.target.value }))}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* preferred contact method */}
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-[16px]">
          Preferred Contact Method <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-6 mt-2 max-md:gap-4">
          {["Phone", "Email", "Text", "Other"].map((option) => (
            <label key={option} htmlFor={`contactMethod-${option}`} className="flex items-center gap-0 text-[16px] text-gray-800 cursor-pointer" >
              <input type="radio" id={`contactMethod-${option}`} name="contactMethod" value={option} className="peer hidden" 
                onChange={() => setUser((u) => ({ ...u, preferred_contact_method: option }))}
                checked={user.preferred_contact_method === option}
              />
              <span className="w-5 h-5 inline-block border-2 border-blue-400 rounded-full mr-1 peer-checked:border-blue-800 peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-400 peer-focus:ring-opacity-50 transition-all duration-200 ease-in-out scale-80" >
              </span>
              {option}
            </label>
          ))}
        </div>

        {/*  Show input field if 'Other' is selected */}
        {user.preferred_contact_method === "Other" && (
          <div className="mt-4">
            <label className="block font-semibold mb-1">
              If Other, Please Specify
            </label>
            <input
              type="text"
              value={user.preferred_contact_other}
              onChange={(e) => setUser((u) => ({ ...u, preferred_contact_other: e.target.value }))}
              className="w-full border border-gray-300 p-3 rounded placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="text-end">
        <button
          onClick={nextStep}
          className="bg-blue-600 text-white text-xl px-10 py-3 hover:bg-blue-700 rounded-lg"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepOne;
