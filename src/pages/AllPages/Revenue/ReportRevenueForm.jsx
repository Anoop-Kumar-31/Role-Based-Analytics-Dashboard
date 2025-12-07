import { useState, useRef, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";

const restaurantOptions = [
  "Bloom Southern Kitchen",
  "The Stables Kitchen & Beer Garden",
  "Olive Tree Café",
  "Blue River Dine",
  "Mountain View Eats",
  "Coastal Breeze Grill",
  "The Rustic Spoon",
  "Urban Garden Lounge",
  "Golden Fork",
  "Lakeview Terrace Bistro",
];

const ReportRevenueForm = ({ setActivePage }) => {
  // form data
  const [formData, setFormData] = useState({
    restaurant: "Olive Tree Café",
    email: "",
    date: "",
    type: "",
  });

  const [filteredRestaurants, setFilteredRestaurants] =
    useState(restaurantOptions);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "restaurant") {
      setDropdownOpen(true);
      const filtered = restaurantOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  const handleSelectRestaurant = (name) => {
    setFormData((prev) => ({ ...prev, restaurant: name }));
    setFilteredRestaurants(restaurantOptions);
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-6 bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto bg-gray-200 px-4 py-2 mb-8 rounded-md">
        <div className="text-xl font-light text-gray-800 flex items-center space-x-2">
          <span
            onClick={() => setActivePage("Revenue")}
            className="text-gray-500 cursor-pointer hover:text-gray-800"
          >
            Revenue
          </span>
          <FiChevronRight className="text-blue-600 text-xl" />
          <span className="text-black">Report Revenue and Cost for Period</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex justify-center px-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-b-xl px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Report Revenue and Cost for Period
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Field */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                What restaurant is this report for?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="restaurant"
                autoComplete="off"
                value={formData.restaurant}
                onChange={handleChange}
                onClick={() => {
                  if (!dropdownOpen) {
                    setFormData((prev) => ({ ...prev, restaurant: "" }));
                    setFilteredRestaurants(restaurantOptions);
                  }
                  setDropdownOpen((prev) => !prev);
                }}
                placeholder="Enter restaurant name"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm focus:ring-2 focus:ring-blue-400"
              />
              {dropdownOpen && (
                <ul className="absolute z-10 bg-white w-full border border-t-0 border-gray-300 max-h-48 overflow-y-auto rounded-b-md shadow-md text-sm">
                  {filteredRestaurants.length === 0 ? (
                    <li className="px-4 py-2 text-gray-500">No match found</li>
                  ) : (
                    filteredRestaurants.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectRestaurant(option)}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {option}
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="danielr@takeflightrg.com"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-md font-semibold text-blue-900 mb-2">
                What is the date range for this report?{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Start Date */}
                <div className="w-full md:w-1/2">
                  <label className="block text-sm text-gray-700 mt-1 mb-1">
                    Starting Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-700 cursor-pointer"
                  />
                </div>

                {/* End Date */}
                <div className="w-full md:w-1/2">
                  <label className="block text-sm text-gray-700 mt-1 mb-1">
                    Ending Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Revenue for Period */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Revenue for period
              </label>
              <input
                type="number"
                name="revenue"
                value={formData.revenue || ""}
                onChange={handleChange}
                required
                placeholder="Enter revenue amount"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Divider */}
            <hr className="border-1 border-black mt-9" />

            {/* FOH & BOH Labor Fields */}
            <div className="flex flex-col md:flex-row gap-4 mt-10">
              {/* FOH Labor */}
              <div className="w-full md:w-1/2">
                <label className="block text-md font-semibold text-blue-900 mb-2">
                  FOH labor for period <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="fohLabor"
                  value={formData.fohLabor || ""}
                  onChange={handleChange}
                  required
                  placeholder="Enter FOH labor cost"
                  className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
                />
              </div>

              {/* BOH Labor */}
              <div className="w-full md:w-1/2">
                <label className="block text-md font-semibold text-blue-900 mb-2">
                  BOH labor for period <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="bohLabor"
                  value={formData.bohLabor || ""}
                  onChange={handleChange}
                  required
                  placeholder="Enter BOH labor cost"
                  className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
                />
              </div>
            </div>

            {/* Total other labour for Period */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Total Other labour for period
              </label>
              <input
                type="number"
                name="revenue"
                value={formData.revenue || ""}
                onChange={handleChange}
                required
                placeholder="Enter other labour cost"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Divider */}
            <hr className="border-1 border-black mt-10" />

            {/* Revenue from Food Sales */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Revenue from Food Sales
              </label>
              <input
                type="number"
                name="foodRevenue"
                value={formData.foodRevenue || ""}
                onChange={handleChange}
                required
                placeholder="Enter food revenue"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Revenue from Beer Sales */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Revenue from Beer Sales
              </label>
              <input
                type="number"
                name="beerRevenue"
                value={formData.beerRevenue || ""}
                onChange={handleChange}
                placeholder="Enter beer revenue"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Revenue from Liquor Sales */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Revenue from Liquor Sales
              </label>
              <input
                type="number"
                name="liquorRevenue"
                value={formData.liquorRevenue || ""}
                onChange={handleChange}
                placeholder="Enter liquor revenue"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Revenue from Wine Sales */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Revenue from Wine Sales
              </label>
              <input
                type="number"
                name="wineRevenue"
                value={formData.wineRevenue || ""}
                onChange={handleChange}
                placeholder="Enter wine revenue"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Revenue from NA Beverage Sales */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Revenue from NA Beverage Sales
              </label>
              <input
                type="number"
                name="naBeverageRevenue"
                value={formData.naBeverageRevenue || ""}
                onChange={handleChange}
                placeholder="Enter non-alcoholic beverage revenue"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Revenue from Other Sales */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Revenue from Other Sales
              </label>
              <input
                type="number"
                name="otherRevenue"
                value={formData.otherRevenue || ""}
                onChange={handleChange}
                placeholder="Enter other sales revenue"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Divider */}
            <hr className="border-1 border-black mt-10" />
        
            {/* Total Guests */}
            <div>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Total Guests 
              </label>
              <input
                type="number"
                name="totalGuests"
                value={formData.totalGuests || ""}
                onChange={handleChange}
                required
                placeholder="Enter total number of guests"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setActivePage("Revenue")}
                className="flex items-center gap-2 px-7 py-2 bg-white text-purple-500 border border-purple-300 rounded-md hover:bg-purple-50"
              >
                <span className="text-xl font-bold leading-none">×</span>
                Cancel
              </button>
              <button
                type="submit"
                className="px-9 py-2 bg-purple-600 text-white rounded-md hover:bg-green-800 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportRevenueForm;
