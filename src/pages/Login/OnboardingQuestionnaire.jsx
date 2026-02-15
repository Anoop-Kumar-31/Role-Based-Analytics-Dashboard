import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import logo from "../../assets/images/logo.png";
import { X } from "lucide-react";
import { onboarding } from "../../services/modules/authService";

import toast from "react-hot-toast";

const OnboardingQuestionnaire = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1 state
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    preferred_contact_method: "",
    preferred_contact_other: "",
  });

  // Step 2 state
  const [company, setCompany] = useState({
    company_name: "",
    number_of_restaurants: 0,
    restaurants: [],
  });

  // Step 3 state
  const [toastData, setToastData] = useState({
    uses_toast_pos: "",
    platform: "",
    ssh_data_exports_enabled: "",
    need_help_enabling_exports: "",
  });

  // Step 2: Restaurant navigation
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Submit handler
  const handleSubmit = async () => {
    setLoading(true); // See next section
    // Format restaurants
    const formattedRestaurants = company.restaurants.map((r) => ({
      restaurant_name: r.name,
      location: r.location,
      revenue_targets: r.revenueTargets,
      labor_target: {
        has_labor_target: r.laborTarget === "no",
        overall_labor_target: r.laborOverallPercentage,
        foh_target: r.fohPercentage,
        boh_target: r.bohPercentage,
        includes_salaries: r.includeSalaries === "no",
        foh_combined_salaried: r.fohSalaried,
        boh_combined_salaried: r.bohSalaried,
      },
      cogs_target: {
        has_cogs_target: r.cogsTarget === "no",
        food: r.cogs.food,
        pastry: r.cogs.pastry,
        beer: r.cogs.beer,
        wine: r.cogs.wine,
        liquor: r.cogs.liquor,
        NA_Bev: r.cogs.naBeverage,
        smallwares: r.cogs.smallware,
        others: r.cogs.other,
      },
    }));

    const payload = {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        preferred_contact_method: user.preferred_contact_method,
        ...(user.preferred_contact_method === "Other" && { preferred_contact_method: user.preferred_contact_other }),
      },
      company: {
        company_name: company.company_name,
        number_of_restaurants: company.number_of_restaurants,
        restaurants: formattedRestaurants,
      },
      toast: {
        uses_toast_pos: toastData.uses_toast_pos === "Yes",
        platform: toastData.platform,
        ssh_data_exports_enabled: toastData.ssh_data_exports_enabled === "Yes",
        need_help_enabling_exports: toastData.need_help_enabling_exports === "Yes",
      },
    };

    try {
      console.log(payload)
      const res = await toast.promise(
        onboarding(payload),
        {
          loading: "Onboarding in progress...",
          success: (res) => {
            // you can inspect response here and decide message
            console.log("Success response:", res);
            return "Onboarding successful!";
          },
          error: (err) => {
            const errMsg = err?.error || String(err);
            if (errMsg.includes("already exists")) {
              toast('Try to Login!', {
                icon: '🔗',
              });
              return "Used Email already registered.";
            }
            return "Failed to onboard user. Please try again.";
          },
        }
      );
      onClose();

    } catch (err) {
      console.error("Unexpected error caught:", err.error);
      // onClose();
    } finally {
      setLoading(false);
    }
  }

  // step titles
  const stepTitles = {
    1: "Basic Details",
    2: "Restaurant Information",
    3: "Toast Information",
  };

  return (
    <div className="fixed inset-0 z-[1000001] bg-blue-100 flex flex-col items-center overflow-y-auto py-10">
      {/*  Logo  */}
      <img
        src={logo}
        alt="App Logo"
        className="h-25 text-semibold mb-1 object-contain max-md:w-[60%] max-md:mb-5"
      />

      {/*  form box  */}
      <div className="bg-white w-[clamp(350px,60%,800px)] p-6 rounded-xl shadow-lg relative">

        {/* Close Button */}
        <div className="text-end mb-4 absolute top-4 right-4">
          <button
            onClick={() => onClose()}
            className="text-3xl text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* Step content */}
        {step === 1 && (
          <StepOne
            nextStep={nextStep}
            step={step}
            title={stepTitles[step]}
            user={user}
            setUser={setUser}
          />
        )}
        {step === 2 && (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            step={step}
            title={stepTitles[step]}
            company={company}
            setCompany={setCompany}
            currentRestaurantIndex={currentRestaurantIndex}
            setCurrentRestaurantIndex={setCurrentRestaurantIndex}
          />
        )}
        {step === 3 && (
          <StepThree
            prevStep={prevStep}
            step={step}
            title={stepTitles[step]}
            toast={toastData}
            setToastData={setToastData}
            onSubmit={() => handleSubmit()}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
