import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { LaborTargetForm, RevenueForm, RestaurantInfo, CoGSTargetForm } from "./Forms";

const pages = [
  <RestaurantInfo key="restaurant-info" />,
  <RevenueForm key="revenue-form" />,
  <LaborTargetForm key="labor-target-form" />,
  <CoGSTargetForm key="cogs-target-form" />,
];

const PopUp = ({ onClose }) => {

  const handleSubmit = () => {
      alert('Users info have been saved successfully!')
      onClose();
  };

  const handleBack = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="inset-0 backdrop-blur-xs w-full flex flex-col gap-2 items-center justify-center" id="black-screen">
      <div className="max-w-4xl w-[60%] mx-auto bg-gray-200 px-4 py-2 mb-8 rounded-md">
        <div className="text-xl font-light text-gray-800 flex items-center space-x-2">
          <span
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-800"
          >
            All Locations
          </span>
          <FiChevronRight className="text-blue-600 text-xl" />
          <span className="text-black">Edit</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg w-[60%] h-[100%] p-8 flex flex-col justify-between
                      max-md:w-full max-md:h-full max-md:p-2 max-md:rounded-none" id="pop-up">
        <section className="flex flex-col h-fill mb-8 h-[90%] px-3 overflow-y-scroll max-md:px-1 max-md:mb-4 gap-8" id="form-section">
          {pages[0]}
          {pages[1]}
          {pages[2]}
          {pages[3]}
        </section>
        <section className="flex justify-end max-md:grid max-md:grid-cols-2 gap-2" id="button-section">
          <button
            className="button px-5 py-2 rounded-lg bg-white hover:bg-[#ffaaaa] border-2 border-red-900 text-red-900 max-md:w-full"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="button px-5 py-2 rounded-lg bg-[var(--primary-blue)] text-white hover:brightness-90 max-md:w-full col-span-2"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </section>
      </div>
    </div>
  );
};

export default PopUp;