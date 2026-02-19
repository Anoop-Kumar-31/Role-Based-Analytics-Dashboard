import { useState, useRef, useEffect } from "react";
import {
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRestaurantsByCompanyId } from "../../../services/modules/restaurantService";

const BlueBook = ({ setActivePage }) => {
  const userData = useSelector((state) => state.auth.user);
  const company_id = userData?.company_id;

  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [formData, setFormData] = useState({
    restaurant: "",
    email: "",
    date: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurantsByCompanyId(company_id);
        console.log(response)
        if (response && Array.isArray(response.data)) {
          const restaurantNames = response.data.map((r) => r.restaurant_name);
          console.log(restaurantNames)
          setRestaurantOptions(restaurantNames);
          setFilteredRestaurants(restaurantNames);
        } else {
          throw new Error("Invalid restaurant data format");
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        toast.error("Failed to load restaurant list.");
      }
    };
    if (company_id) fetchRestaurants();
  }, [company_id]);
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
    <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-6 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto bg-[var(--filler)] px-4 py-2 mb-8 rounded-xl">
        <div className="text-xl font-light text-[var(--text-primary)] flex items-center space-x-2">
          <span
            onClick={() => setActivePage("Dashboard")}
            className="text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors"
          >
            Home
          </span>
          <FiChevronRight className="text-[var(--primary-accent)] text-xl" />
          <span className="text-[var(--text-primary)]">Manager’s Blue Book</span>
        </div>
      </div>

      <div className="flex justify-center px-6">
        <div className="w-full max-w-4xl bg-white shadow-card rounded-2xl px-6 py-8 border border-[var(--border)]">
          {(isCheckingLogs || isAddingData) && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:underline mb-4"
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>
          )}

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Manager’s Blue Book</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isAddingData && (
              <div className="relative" ref={dropdownRef}>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
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
                    className="w-full outline-none border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent pr-10 transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none text-xl">
                    {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                {dropdownOpen && (
                  <ul className="absolute z-10 bg-white w-full border border-[var(--border)] border-t-0 max-h-48 overflow-y-auto rounded-b-xl shadow-lg text-sm mt-1">
                    {filteredRestaurants.length === 0 ? (
                      <li className="px-4 py-2 text-[var(--text-tertiary)]">No match found</li>
                    ) : (
                      filteredRestaurants.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectRestaurant(option)}
                          className="px-4 py-2 hover:bg-[var(--primary-light)] cursor-pointer text-[var(--text-primary)] transition-colors"
                        >
                          {option}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            )}

            {isCheckingLogs && !isAddingData && (
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Date of the report? <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                />
              </div>
            )}

            {isAddingData && (
              <>
                <div>
                  <label className="block font-medium text-sm mb-1 text-[var(--text-secondary)]">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                    placeholder="danielr@takeflightrg.com"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-sm mb-1 text-[var(--text-secondary)]">Weather</label>
                  <input
                    type="text"
                    name="weather"
                    value={formData.weather || ""}
                    onChange={handleChange}
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
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
                      <label className="block font-medium text-sm text-[var(--text-primary)]">{field}</label>
                      <button
                        type="button"
                        onClick={() => addNoteField(field)}
                        className="bg-[var(--primary-accent)] text-white text-sm rounded-full w-6 h-6 flex items-center justify-center hover:bg-[var(--primary-accent-hover)] transition-colors"
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
                          className="w-full border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
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
                    className="px-6 py-2.5 bg-white border border-[var(--border)] rounded-xl hover:bg-[var(--filler)] text-[var(--text-secondary)] text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-[var(--primary-accent)] text-white rounded-xl hover:bg-[var(--primary-accent-hover)] text-sm font-medium transition-all duration-200 hover:shadow-md"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {!isCheckingLogs && !isAddingData && (
              <div className="flex justify-center gap-4 pt-4 font-medium">
                <button
                  type="button"
                  onClick={() => setIsCheckingLogs(true)}
                  className="flex items-center gap-2 px-7 py-2.5 bg-white text-[var(--primary-accent)] border-2 border-[var(--primary-accent)] rounded-xl hover:shadow-md text-sm transition-all duration-200"
                >
                  Check Logs
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingData(true)}
                  className="px-9 py-2.5 bg-[var(--primary-accent)] text-white rounded-xl hover:bg-[var(--primary-accent-hover)] hover:shadow-md text-sm transition-all duration-200"
                >
                  Add Today's Data
                </button>
              </div>
            )}

            {isCheckingLogs && !isAddingData && (
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-9 py-2.5 bg-[var(--primary-accent)] text-white rounded-xl hover:bg-[var(--primary-accent-hover)] text-sm font-medium transition-all duration-200 hover:shadow-md"
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
    <label className="block text-sm font-medium mb-1 text-[var(--text-secondary)]">{label}</label>
    <input
      type="number"
      name={name}
      onChange={onChange}
      className="w-full border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
    />
  </div>
);

export default BlueBook;
