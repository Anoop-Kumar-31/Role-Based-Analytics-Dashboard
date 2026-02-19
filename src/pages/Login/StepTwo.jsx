import React from "react";
import ProgressBar from "./ProgressBar";

const StepTwo = ({
  nextStep,
  prevStep,
  step,
  title,
  company,
  setCompany,
  currentRestaurantIndex,
  setCurrentRestaurantIndex,
}) => {
  // Company name
  const handleCompanyNameChange = (e) => {
    setCompany((c) => ({ ...c, company_name: e.target.value }));
  };

  // Restaurant count
  const handleRestaurantCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setCompany((c) => {
      const newRestaurants = Array.from({ length: count }, (_, i) => c.restaurants[i] || {
        name: "",
        location: "",
        revenueTargets: {
          january: "",
          february: "",
          march: "",
          april: "",
          may: "",
          june: "",
          july: "",
          august: "",
          september: "",
          october: "",
          november: "",
          december: "",
        },
        laborTarget: "",
        laborOverallPercentage: "",
        fohPercentage: "",
        bohPercentage: "",
        includeSalaries: "",
        fohSalaried: "",
        bohSalaried: "",
        cogsTarget: "",
        cogs: {
          food: "",
          pastry: "",
          beer: "",
          wine: "",
          liquor: "",
          naBeverage: "",
          smallware: "",
          other: "",
        },
      });
      return {
        ...c,
        number_of_restaurants: count,
        restaurants: newRestaurants,
      };
    });
    setCurrentRestaurantIndex(0);
  };

  // Restaurant field changes
  const handleInputChange = (index, field, value) => {
    setCompany((c) => {
      const updated = [...c.restaurants];
      updated[index][field] = value;
      return { ...c, restaurants: updated };
    });
  };

  const handleRevenueChange = (index, month, value) => {
    setCompany((c) => {
      const updated = [...c.restaurants];
      updated[index].revenueTargets[month] = value;
      return { ...c, restaurants: updated };
    });
  };

  const handleNestedInputChange = (index, category, value) => {
    setCompany((c) => {
      const updated = [...c.restaurants];
      updated[index].cogs[category] = value;
      return { ...c, restaurants: updated };
    });
  };

  const restaurant =
    company.restaurants.length > 0 ? company.restaurants[currentRestaurantIndex] : null;

  return (
    <div className="px-8 pb-8">
      <ProgressBar currentStep={step} title={title} />
      {/* Company Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          What is the name of the company?
        </label>
        <input
          type="text"
          value={company.company_name}
          onChange={handleCompanyNameChange}
          placeholder="Acme Corp"
          className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
        />
      </div>

      {/* Restaurant Count */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          How many restaurants does it represent?
        </label>
        <input
          type="Number"
          min="0"
          value={company.number_of_restaurants}
          onChange={handleRestaurantCountChange}
          className="w-full border border-[var(--border)] p-3 rounded-xl bg-[var(--filler)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent focus:bg-white transition-all"
        />
      </div>

      {/* Dynamic Restaurant Sections */}
      {company.restaurants.length > 0 && (
        <div key={currentRestaurantIndex} className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              Restaurant {currentRestaurantIndex + 1} Details
            </h3>
            <span className="text-xs font-semibold bg-[var(--filler)] text-[var(--text-secondary)] px-2 py-1 rounded-md border border-[var(--border)]">
              {currentRestaurantIndex + 1} / {company.restaurants.length}
            </span>
          </div>


          <div className="bg-[var(--filler)]/50 p-5 rounded-2xl border border-[var(--border)]">
            {/* Restaurant Name & Location */}
            <div className="mb-5 flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Restaurant Name</label>
                <input
                  type="text"
                  value={restaurant.name}
                  onChange={(e) =>
                    handleInputChange(
                      currentRestaurantIndex,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full border border-[var(--border)] p-3 rounded-xl bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                  placeholder="e.g. Downtown Diner"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Location</label>
                <input
                  type="text"
                  value={restaurant.location}
                  onChange={(e) =>
                    handleInputChange(
                      currentRestaurantIndex,
                      "location",
                      e.target.value
                    )
                  }
                  className="w-full border border-[var(--border)] p-3 rounded-xl bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                  placeholder="e.g. New York, NY"
                />
              </div>
            </div>

            {/* Revenue Targets */}
            <div className="mb-6">
              <label className="block text-base font-semibold text-[var(--text-primary)] mb-3">
                Revenue Targets <span className="text-xs font-normal text-[var(--text-tertiary)] ml-2">(Current Year)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
                ].map((month, mIndex) => (
                  <div key={mIndex}>
                    <label className="block text-xs font-medium text-[var(--text-tertiary)] mb-1">
                      {month}
                    </label>
                    <input
                      type="number" min="0"
                      placeholder="0"
                      value={restaurant.revenueTargets[month.toLowerCase()]}
                      onChange={(e) =>
                        handleRevenueChange(
                          currentRestaurantIndex,
                          month.toLowerCase(),
                          e.target.value
                        )
                      }
                      // remove no arrow ro increase and decrease

                      className="w-full border border-[var(--border)] p-2 rounded-lg bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all text-center no-spinner"
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-t border-[var(--border)] my-6" />

            {/* Labor Target */}
            <div className="mb-6">
              <label className="block text-base font-semibold text-[var(--text-primary)] mb-1">
                Labor Target
              </label>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">
                Do you have labor percentage targets (% of Revenue)?
              </label>
              <div className="flex gap-4">
                {["yes", "no"].map(opt => (
                  <label key={opt} className={`cursor-pointer px-4 py-1.5 rounded-lg border text-sm font-medium transition-all capitalize ${restaurant.laborTarget === opt ? "bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white" : "bg-white border-[var(--border)] text-[var(--text-secondary)]"}`}>
                    <input
                      type="radio"
                      name={`labor-${currentRestaurantIndex}`}
                      value={opt}
                      checked={restaurant.laborTarget === opt}
                      onChange={(e) => handleInputChange(currentRestaurantIndex, "laborTarget", e.target.value)}
                      className="hidden"
                    /> {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Labor Details dynamic */}
            {restaurant.laborTarget === "yes" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Overall labor target %
                    </label>
                    <input
                      type="number" min="0"
                      value={restaurant.laborOverallPercentage}
                      onChange={(e) =>
                        handleInputChange(
                          currentRestaurantIndex,
                          "laborOverallPercentage",
                          e.target.value
                        )
                      }
                      className="w-full border border-[var(--border)] p-3 rounded-xl bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                      placeholder="e.g. 20"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      FOH labor target %
                    </label>
                    <input
                      type="number" min="0"
                      value={restaurant.fohPercentage}
                      onChange={(e) =>
                        handleInputChange(
                          currentRestaurantIndex,
                          "fohPercentage",
                          e.target.value
                        )
                      }
                      className="w-full border border-[var(--border)] p-3 rounded-xl bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                      placeholder="e.g. 10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    BOH labor target %
                  </label>
                  <input
                    type="number" min="0"
                    value={restaurant.bohPercentage}
                    onChange={(e) =>
                      handleInputChange(
                        currentRestaurantIndex,
                        "bohPercentage",
                        e.target.value
                      )
                    }
                    className="w-full border border-[var(--border)] p-3 rounded-xl bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                    placeholder="e.g. 10"
                  />
                </div>

                <div className="mb-4 pt-4 border-t border-[var(--border)] border-dashed">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Include salaries in labor target?
                  </label>
                  <div className="flex gap-4">
                    {["yes", "no"].map(opt => (
                      <label key={opt} className={`cursor-pointer px-4 py-1.5 rounded-lg border text-sm font-medium transition-all capitalize ${restaurant.includeSalaries === opt ? "bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white" : "bg-white border-[var(--border)] text-[var(--text-secondary)]"}`}>
                        <input
                          type="radio"
                          name={`salaries-${currentRestaurantIndex}`}
                          value={opt}
                          checked={restaurant.includeSalaries === opt}
                          onChange={(e) => handleInputChange(currentRestaurantIndex, "includeSalaries", e.target.value)}
                          className="hidden"
                        /> {opt}
                      </label>
                    ))}
                  </div>

                  {restaurant.includeSalaries === "yes" && (
                    <div className="flex flex-col md:flex-row gap-4 mt-4 animate-fadeIn">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                          Combined FOH salaried amount
                        </label>
                        <input
                          type="number" min="0"
                          value={restaurant.fohSalaried}
                          onChange={(e) =>
                            handleInputChange(
                              currentRestaurantIndex,
                              "fohSalaried",
                              e.target.value
                            )
                          }
                          className="w-full border border-[var(--border)] p-3 rounded-xl bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                          placeholder="e.g. 15000"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                          Combined BOH salaried amount
                        </label>
                        <input
                          type="number" min="0"
                          value={restaurant.bohSalaried}
                          onChange={(e) =>
                            handleInputChange(
                              currentRestaurantIndex,
                              "bohSalaried",
                              e.target.value
                            )
                          }
                          className="w-full border border-[var(--border)] p-3 rounded-xl bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                          placeholder="e.g. 20000"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <hr className="border-t border-[var(--border)] my-6" />

            {/* CoGS Target */}
            <div className="mb-4">
              <label className="block text-base font-semibold text-[var(--text-primary)] mb-1">
                Cost of Goods Sold (CoGS)
              </label>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">
                Do you have CoGS percent targets (% of Revenue)?
              </label>
              <div className="flex gap-4 mb-4">
                {["yes", "no"].map(opt => (
                  <label key={opt} className={`cursor-pointer px-4 py-1.5 rounded-lg border text-sm font-medium transition-all capitalize ${restaurant.cogsTarget === opt ? "bg-[var(--primary-accent)] border-[var(--primary-accent)] text-white" : "bg-white border-[var(--border)] text-[var(--text-secondary)]"}`}>
                    <input
                      type="radio"
                      name={`cogs-${currentRestaurantIndex}`}
                      value={opt}
                      checked={restaurant.cogsTarget === opt}
                      onChange={(e) => handleInputChange(currentRestaurantIndex, "cogsTarget", e.target.value)}
                      className="hidden"
                    /> {opt}
                  </label>
                ))}
              </div>

              {/* Conditional COGS Fields */}
              {restaurant.cogsTarget === "yes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  {[
                    { label: "Food CoGS %", key: "food" },
                    { label: "Pastry CoGS %", key: "pastry" },
                    { label: "Beer CoGS %", key: "beer" },
                    { label: "Wine CoGS %", key: "wine" },
                    { label: "Liquor CoGS %", key: "liquor" },
                    { label: "NA Bev/Coffee CoGS %", key: "naBeverage" },
                    { label: "Smallware %", key: "smallware" },
                    { label: "All other CoGS %", key: "other" }
                  ].map((item) => (
                    <div key={item.key}>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                        {item.label}
                      </label>
                      <input
                        type="number" min="0"
                        placeholder="0"
                        value={restaurant.cogs[item.key]}
                        onChange={(e) =>
                          handleNestedInputChange(currentRestaurantIndex, item.key, e.target.value)
                        }
                        className="w-full border border-[var(--border)] p-3 rounded-xl bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-[var(--border)]">
              <button
                disabled={currentRestaurantIndex === 0}
                onClick={() => setCurrentRestaurantIndex((prev) => prev - 1)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentRestaurantIndex === 0
                  ? "text-[var(--text-tertiary)] cursor-not-allowed"
                  : "text-[var(--primary-accent)] hover:bg-[var(--filler)]"
                  }`}
              >
                ← Previous
              </button>

              <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                Restaurant {currentRestaurantIndex + 1} of {company.restaurants.length}
              </span>

              <button
                disabled={currentRestaurantIndex === company.restaurants.length - 1}
                onClick={() => setCurrentRestaurantIndex((prev) => prev + 1)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentRestaurantIndex === company.restaurants.length - 1
                  ? "text-[var(--text-tertiary)] cursor-not-allowed"
                  : "text-[var(--primary-accent)] hover:bg-[var(--filler)]"
                  }`}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={prevStep}
          className="bg-white border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--filler)] text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          className="bg-[var(--primary-accent)] hover:bg-[var(--primary-accent-hover)] text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-all shadow-sm"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
