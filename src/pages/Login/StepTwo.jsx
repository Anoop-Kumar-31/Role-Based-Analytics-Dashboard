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
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Onboarding Questionnaire
      </h2>

      <ProgressBar step={step} title={title} />

      <hr className="border-t border-gray-200 my-4" />

      {/* Company Name */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          What is the name of the company?
        </label>
        <input
          type="text"
          value={company.company_name}
          onChange={handleCompanyNameChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Restaurant Count */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          How many restaurants does it represent?
        </label>
        <input
          type="Number"
          min="0"
          value={company.number_of_restaurants}
          onChange={handleRestaurantCountChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Dynamic Restaurant Sections */}
      {company.restaurants.length > 0 && (
        <div key={currentRestaurantIndex} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Add Restaurant {currentRestaurantIndex + 1} Details
          </h3>
          
          {/* Restaurant Name & Location */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block font-medium mb-1">Restaurant Name</label>
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
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="w-full">
              <label className="block font-medium mb-1">Location</label>
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
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          {/* Revenue Targets */}
          <div className="mb-4">
            <label className="block text-2xl font-semibold mb-2">
              Revenue Targets
            </label>
            <div className="grid grid-cols-1 text-xl md:grid-cols-2 gap-4">
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, mIndex) => (
                <div key={mIndex}>
                  <label className="block text-sm">
                    {month} Target (current year)
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.revenueTargets[month.toLowerCase()]}
                    onChange={(e) =>
                      handleRevenueChange(
                        currentRestaurantIndex,
                        month.toLowerCase(),
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Labor Target */}
          <div className="mb-4">
            <label className="block text-2xl font-semibold mb-1">
              Labor Target
            </label>
            <label className="block mb-1">
              Do you have labor percentage targets (% of Revenue)?
            </label>
            <div className="flex gap-4 text-lg">
              <label>
                <input
                  type="radio"
                  name={`labor-${currentRestaurantIndex}`}
                  value="yes"
                  checked={restaurant.laborTarget === "yes"}
                  onChange={(e) =>
                    handleInputChange(
                      currentRestaurantIndex,
                      "laborTarget",
                      e.target.value
                    )
                  }
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name={`labor-${currentRestaurantIndex}`}
                  value="no"
                  checked={restaurant.laborTarget === "no"}
                  onChange={(e) =>
                    handleInputChange(
                      currentRestaurantIndex,
                      "laborTarget",
                      e.target.value
                    )
                  }
                />{" "}
                No
              </label>
            </div>
          </div>

          {/* Labor Details dynamic */}
          {restaurant.laborTarget === "yes" && (
            <div className="space-y-4 mt-3">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block font-medium text-gray-700 mb-1">
                    What is your overall labor percentage target (% of Revenue)?
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
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="e.g., 20"
                  />
                </div>
                <div className="w-full">
                  <label className="block font-medium text-gray-700 mb-1">
                    What is your Front of House (FOH) labor target?
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
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  What is your Back of House (BOH) labor target?
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
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="e.g., 10"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Do you have any salaries you want to include in your labor
                  target?
                </label>
                <div className="flex gap-4 text-lg text-gray-700">
                  <label>
                    <input
                      type="radio"
                      name={`salaries-${currentRestaurantIndex}`}
                      value="yes"
                      checked={restaurant.includeSalaries === "yes"}
                      onChange={(e) =>
                        handleInputChange(
                          currentRestaurantIndex,
                          "includeSalaries",
                          e.target.value
                        )
                      }
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`salaries-${currentRestaurantIndex}`}
                      value="no"
                      checked={restaurant.includeSalaries === "no"}
                      onChange={(e) =>
                        handleInputChange(
                          currentRestaurantIndex,
                          "includeSalaries",
                          e.target.value
                        )
                      }
                    />{" "}
                    No
                  </label>
                </div>

                {restaurant.includeSalaries === "yes" && (
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="w-full">
                      <label className="block font-medium text-gray-700 mb-1">
                        What is your combined FOH salaried amount?
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
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="e.g., 15000"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block font-medium text-gray-700 mb-1">
                        What is your combined BOH salaried amount?
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
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="e.g., 20000"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CoGS Target */}
          <div className="mb-4">
            <label className="block text-2xl font-semibold mb-1">
              Cost of Goods Sold (CoGS)
            </label>
            <label className="block font-medium text-basemb-1">
              Do you have CoGS percent targets (% of Revenue)?
            </label>
            <div className="flex gap-4 text-lg text-gray-700 mb-4">
              <label>
                <input
                  type="radio"
                  name={`cogs-${currentRestaurantIndex}`}
                  value="yes"
                  checked={restaurant.cogsTarget === "yes"}
                  onChange={(e) =>
                    handleInputChange(currentRestaurantIndex, "cogsTarget", e.target.value)
                  }
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name={`cogs-${currentRestaurantIndex}`}
                  value="no"
                  checked={restaurant.cogsTarget === "no"}
                  onChange={(e) =>
                    handleInputChange(currentRestaurantIndex, "cogsTarget", e.target.value)
                  }
                />{" "}
                No
              </label>
            </div>

            {/* Conditional COGS Fields */}
            {restaurant.cogsTarget === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Food & Pastry */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Food CoGS %
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.cogs.food}
                    onChange={(e) =>
                      handleNestedInputChange(currentRestaurantIndex, "food", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Pastry CoGS %
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.cogs.pastry}
                    onChange={(e) =>
                      handleNestedInputChange(currentRestaurantIndex, "pastry", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Beer & Wine */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Beer CoGS %
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.cogs.beer}
                    onChange={(e) =>
                      handleNestedInputChange(currentRestaurantIndex, "beer", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Wine CoGS %
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.cogs.wine}
                    onChange={(e) =>
                      handleNestedInputChange(currentRestaurantIndex, "wine", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Liquor & NA Bev/Coffee */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Liquor CoGS %
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.cogs.liquor}
                    onChange={(e) =>
                      handleNestedInputChange(currentRestaurantIndex, "liquor", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    NA Bev/Coffee CoGS %
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.cogs.naBeverage}
                    onChange={(e) =>
                      handleNestedInputChange(
                        currentRestaurantIndex,
                        "naBeverage",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Smallware & Other */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Smallware % (paper goods, silver or plasticware, etc.)
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.cogs.smallware}
                    onChange={(e) =>
                      handleNestedInputChange(
                        currentRestaurantIndex,
                        "smallware",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    All other CoGS % (cleaning supplies, aprons, rags, etc.)
                  </label>
                  <input
                    type="number" min="0"
                    placeholder="e.g., 23"
                    value={restaurant.cogs.other}
                    onChange={(e) =>
                      handleNestedInputChange(currentRestaurantIndex, "other", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
              </div>
            )}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center my-6">
            <button
              disabled={currentRestaurantIndex === 0}
              onClick={() => setCurrentRestaurantIndex((prev) => prev - 1)}
              className={`px-4 py-2 rounded-lg ${
                currentRestaurantIndex === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              ← Previous Restaurant
            </button>

            <span className="text-lg font-semibold">
              {currentRestaurantIndex + 1} of {company.restaurants.length}
            </span>

            <button
              disabled={currentRestaurantIndex === company.restaurants.length - 1}
              onClick={() => setCurrentRestaurantIndex((prev) => prev + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentRestaurantIndex === company.restaurants.length - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next Restaurant →
            </button>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-800 text-lg px-6 py-3 rounded-lg hover:bg-gray-400"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
