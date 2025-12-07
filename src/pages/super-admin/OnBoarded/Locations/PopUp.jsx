import React, { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaSync } from "react-icons/fa";
import { LaborTargetForm, RevenueForm, RestaurantInfo, CoGSTargetForm } from "./Forms";

import { getRestaurantById } from '../../../../services/modules/restaurantService'
import { updateLocationData } from '../../../../services/modules/locationService'
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


// const pages = [
//   <RestaurantInfo key="restaurant-info" />,
//   <RevenueForm key="revenue-form" />,
//   <LaborTargetForm key="labor-target-form" />,
//   <CoGSTargetForm key="cogs-target-form" />,
// ];

const PopUp = ({ onClose, selectedRestaurant }) => {
  const [formData, setFormData] = useState({
    restaurant_name: '',
    restaurant_location: '',
    revenue_targets: {},
    labor_target: {},
    cogs_target: {},
    // add other fields as needed or initialize fully empty
  });
  const user = useSelector((state) => state.auth.user);

  // Fetch full restaurant data when selectedRestaurant changes and initialize formData
  useEffect(() => {
  async function fetchData() {
    try {
      if (!selectedRestaurant?.restaurant_id) return;

      const restaurantData = await getRestaurantById(selectedRestaurant.restaurant_id);

      const monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
      ];

      const revenueTargets = restaurantData.data.forecasts?.reduce((acc, f) => {
        const key = monthNames[f.forecast_month - 1];
        if (key) acc[key] = f.forecast_amount ?? 0;
        return acc;
      }, {}) || {};

      const laborTarget = restaurantData.data.targets?.length > 0
        ? { ...restaurantData.data.targets[0] }
        : {};

      const cogsTarget = restaurantData.data.targets?.length > 0
        ? {
            food: restaurantData.data.targets[0].food,
            pastry: restaurantData.data.targets[0].pastry,
            beer: restaurantData.data.targets[0].beer,
            wine: restaurantData.data.targets[0].wine,
            liquor: restaurantData.data.targets[0].liquor,
            NA_Bev: restaurantData.data.targets[0].NA_Bev,
            smallwares: restaurantData.data.targets[0].smallwares,
            others: restaurantData.data.targets[0].others,
          }
        : {};

      // Flags for target existence
      const ignoredKeys = ['created_at', 'created_by', 'updated_at', 'updated_by', 'restaurant_id' , 'year', 'month', 'is_active'];

      const hasValue = val => val !== null && val !== undefined && val !== '' && val !== 0;

      const has_labor_target = Object.entries(laborTarget || {})
        .filter(([key]) => !ignoredKeys.includes(key))   // exclude system keys
        .some(([, val]) => hasValue(val));

      const has_cogs_target = Object.entries(cogsTarget || {})
        .filter(([key]) => !ignoredKeys.includes(key))
        .some(([, val]) => hasValue(val));

      console.log(laborTarget)
      // New   — includes_salaries flag
      const has_included_salaries =
        (laborTarget.foh_combined_salaried !== null &&
         laborTarget.foh_combined_salaried !== undefined &&
         laborTarget.foh_combined_salaried !== '' &&
         laborTarget.foh_combined_salaried !== 0) ||
        (laborTarget.boh_combined_salaried !== null &&
         laborTarget.boh_combined_salaried !== undefined &&
         laborTarget.boh_combined_salaried !== '' &&
         laborTarget.foh_combined_salaried !== 0);
      // console.log(hasCogsTarget, hasLaborTarget)

      setFormData({
        restaurant_name: restaurantData.data.restaurant_name || '',
        restaurant_location: restaurantData.data.restaurant_location || '',
        revenue_targets: revenueTargets,
        labor_target: {
          ...laborTarget,
          has_included_salaries: has_included_salaries,  // add inside labor_target object
          has_labor_target: has_labor_target,
        },
        cogs_target: {
          ...cogsTarget,
          has_cogs_target: has_cogs_target,
        }
      });

    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  }

  fetchData();
}, [selectedRestaurant]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    //Formating the req.body and send to the server
    const body = {
      id: selectedRestaurant.restaurant_id,
      restaurantsData: {
        restaurant_name: formData.restaurant_name,
        restaurant_location: formData.restaurant_location
      },
      forecastsData: formData.revenue_targets,
      targetsData: {
        ...formData.labor_target,
        ...formData.cogs_target,
        year: (new Date()).getFullYear(),
      },
      updated_by: user.id,
      updated_at: new Date(),
    };

    // Instead of manually awaiting then success toast:
    await toast.promise(
      updateLocationData(body), // This should return a Promise
      {
        loading: 'Updating restaurant data...',
        success: 'Restaurant data updated successfully!',
        error: 'Failed to update restaurant data.',
      }
    )
    .then(() => {
      onClose(); // Close modal on success
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      // onClose() on error only if you want to close anyway
    });
  };

  return (
    <div className="inset-0 backdrop-blur-xs w-full flex flex-col gap-2 items-center justify-center" id="black-screen">
      <div className="max-w-4xl w-[60%] mx-auto bg-gray-200 px-4 py-2 mb-8 rounded-md">
        <div className="text-xl font-light text-gray-800 flex items-center space-x-2">
          <span
            onClick={()=>onClose(false)}
            className="text-gray-500 cursor-pointer hover:text-gray-800"
          >
            All Locations
          </span>
          <FiChevronRight className="text-blue-600 text-xl" />
          <span className="text-black">Edit</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg w-[60%] h-[100%] p-8 flex flex-col justify-between max-md:w-full max-md:h-full max-md:p-2 max-md:rounded-none" id="pop-up">
        <section className="flex flex-col h-fill mb-8 h-[90%] px-3 overflow-y-scroll max-md:px-1 max-md:mb-4 gap-8" id="form-section">
          <RestaurantInfo
            restaurantData={{
              restaurant_name: formData.restaurant_name,
              restaurant_location: formData.restaurant_location
            }}
            setFormData={setFormData}
          />

          <RevenueForm
            revenueTargetsData={formData.revenue_targets}
            setFormData={setFormData}
          />

          <LaborTargetForm
            laborTargetData={formData.labor_target}
            setFormData={setFormData}
          />

          <CoGSTargetForm
            cogsTargetData={formData.cogs_target}
            setFormData={setFormData}
          />

        </section>
        <section className="flex justify-center max-md:grid max-md:grid-cols-2 gap-2" id="button-section">
          <button
            className="button px-8 py-2 rounded-lg bg-white hover:shadow-md/30 border-2 border-[var(--primary-blue)] text-[var(--primary-blue)] max-md:w-full"
            onClick={()=>onClose(false)}
          >
            Close
          </button>
          <button
            className="button px-8 py-2 rounded-lg bg-[var(--primary-blue)] hover:shadow-md/30 text-white hover:bg-emerald-600 max-md:w-full col-span-2 flex items-center justify-center gap-1"
            onClick={handleSubmit}
          >
            <FaSync/> &nbsp;Update
          </button>
        </section>
      </div>
    </div>
  );
};

export default PopUp;