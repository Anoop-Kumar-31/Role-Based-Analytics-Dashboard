import { useState, useRef, useEffect } from "react";
import {
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

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

const BlueBook = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    restaurant: "Olive Tree Café",
    email: "",
    date: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantOptions);
  const [isCheckingLogs, setIsCheckingLogs] = useState(false);
  const [isAddingData, setIsAddingData] = useState(false);
  const dropdownRef = useRef(null);

  const dynamicFields = [
    "Include salaried and managers with explanation",
    "86’d Items",
    "WINS!",
    "Misses",
    "Staff Notes",
    "Maintenance Issues",
    "Misc Notes",
  ];

  const [notesData, setNotesData] = useState(
    dynamicFields.reduce((acc, field) => {
      acc[field] = [""];
      return acc;
    }, {})
  );

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
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    console.log("Notes:", notesData);
  };

  const handleBack = () => {
    setIsAddingData(false);
    setIsCheckingLogs(false);
  };

  const handleNoteChange = (field, index, value) => {
    const updated = [...notesData[field]];
    updated[index] = value;
    setNotesData({ ...notesData, [field]: updated });
  };

  const addNoteField = (field) => {
    setNotesData({ ...notesData, [field]: [...notesData[field], ""] });
  };

  const removeNoteField = (field, index) => {
    const updated = notesData[field].filter((_, i) => i !== index);
    setNotesData({ ...notesData, [field]: updated });
  };

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-gray-200 px-4 py-2 mb-8 rounded-md">
        <div className="text-xl font-light text-gray-800 flex items-center space-x-2">
          <span
            onClick={() => setActivePage("Dashboard")}
            className="text-gray-500 cursor-pointer hover:text-gray-800"
          >
            Home
          </span>
          <FiChevronRight className="text-blue-600 text-xl" />
          <span className="text-black">Manager’s Blue Book</span>
        </div>
      </div>

      <div className="flex justify-center px-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-b-xl px-6 py-8">
          {(isCheckingLogs || isAddingData) && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:underline mb-4"
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-4">Manager’s Blue Book</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isAddingData && (
              <div className="relative" ref={dropdownRef}>
                <label className="block text-md font-semibold text-blue-900 mb-2">
                  What restaurant is this report for? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
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
                      setDropdownOpen(true);
                    }}
                    placeholder="Enter restaurant name"
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm focus:ring-2 focus:ring-blue-400 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xl">
                    {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
              </div>
            )}

            {isCheckingLogs && !isAddingData && (
              <div>
                <label className="block text-md font-semibold text-blue-900 mb-2">
                  Date of the report? <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            {isAddingData && (
              <>
                <div>
                  <label className="block font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3"
                    placeholder="danielr@takeflightrg.com"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Weather</label>
                  <input
                    type="text"
                    name="weather"
                    value={formData.weather || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3"
                  />
                </div>

                <hr className="my-10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField name="breakfastSales" label="Breakfast Sales ($)" onChange={handleChange} />
                  <InputField name="breakfastGuests" label="Breakfast Guest Count" onChange={handleChange} />
                  <InputField name="lunchSales" label="Lunch Sales ($)" onChange={handleChange} />
                  <InputField name="lunchGuests" label="Lunch Guest Count" onChange={handleChange} />
                  <InputField name="dinnerSales" label="Dinner Sales ($)" onChange={handleChange} />
                  <InputField name="dinnerGuests" label="Dinner Guest Count" onChange={handleChange} />
                </div>

                <hr className="my-10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField name="totalSales" label="Total Sales ($)" onChange={handleChange} />
                  <InputField name="totalSalesLastYear" label="Total Sales Last Year ($)" onChange={handleChange} />
                  <InputField name="foodSales" label="Total Food Sales ($)" onChange={handleChange} />
                  <InputField name="lbwSales" label="Total LBW Sales ($)" onChange={handleChange} />
                  <InputField name="hourlyLabor" label="Total Hourly Labor ($)" onChange={handleChange} />
                  <InputField name="hourlyLaborPercent" label="Total Hourly Labor (%)" onChange={handleChange} />
                  <InputField name="hoursWorked" label="Total Hours Worked" onChange={handleChange} />
                  <InputField name="splh" label="Sales Per Labor Hour (SPLH)" onChange={handleChange} />
                </div>

                <hr className="my-10" />

                {dynamicFields.map((field) => (
                  <div key={field} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block font-semibold">{field}</label>
                      <button
                        type="button"
                        onClick={() => addNoteField(field)}
                        className="bg-blue-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    {notesData[field].map((val, idx) => (
                      <div key={idx} className="relative mb-2">
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleNoteChange(field, idx, e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                        {idx > 0 && (
                          <button
                            type="button"
                            onClick={() => removeNoteField(field, idx)}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            <FiMinus className="text-xs" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 bg-white border border-gray-400 rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {!isCheckingLogs && !isAddingData && (
              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCheckingLogs(true)}
                  className="flex items-center gap-2 px-7 py-2 bg-white text-purple-500 border border-purple-300 rounded-md hover:bg-purple-50"
                >
                  <span className="text-xl font-bold leading-none">×</span>
                  Check Logs
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingData(true)}
                  className="px-9 py-2 bg-purple-600 text-white rounded-md hover:bg-green-800 transition-colors duration-300"
                >
                  Add Today's Data
                </button>
              </div>
            )}

            {isCheckingLogs && !isAddingData && (
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-9 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                  Check
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ name, label, onChange }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      type="number"
      name={name}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-4 py-2"
    />
  </div>
);

export default BlueBook;
