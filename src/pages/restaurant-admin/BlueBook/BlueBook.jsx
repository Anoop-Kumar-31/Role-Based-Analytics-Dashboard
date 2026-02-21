import { useState, useRef, useEffect } from "react";
import {
  FiChevronRight,
  FiArrowLeft,
  FiPlus,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRestaurantsByCompanyId } from "../../../services/modules/restaurantService";
import { createBlueBook, getBlueBookByDate } from "../../../services/modules/blueBookService";
import BlueBookForm from "./BlueBookForm";
import Table from "../../../components/Table";
import BlueBookEditPopUp from "./BlueBookEditPopUp";
import { Pencil } from "lucide-react";

const BlueBook = ({ setActivePage }) => {
  const userData = useSelector((state) => state.auth.user);
  const company_id = userData?.company_id;

  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  // Creation Form State
  const [formData, setFormData] = useState({
    restaurant: "",
    email: userData?.email || "",
    date: "",
  });

  // Check Logs State
  const [checkLogsData, setCheckLogsData] = useState({
    restaurant: "",
    date: "",
  });
  const [logsList, setLogsList] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const [isCheckingLogs, setIsCheckingLogs] = useState(false);
  const [isAddingData, setIsAddingData] = useState(false);

  // Dropdown for "Check Logs" restaurant selection
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurantsByCompanyId(company_id);
        if (response && Array.isArray(response.data)) {
          setAllRestaurants(response.data);
          const restaurantNames = response.data.map((r) => r.restaurant_name);
          setRestaurantOptions(restaurantNames);
          setFilteredRestaurants(restaurantNames);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        toast.error("Failed to load restaurant list.");
      }
    };
    if (company_id) fetchRestaurants();
  }, [company_id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = () => {
    setIsAddingData(false);
    setIsCheckingLogs(false);
    setLogsList([]);
    setCheckLogsData({ restaurant: "", date: "" });
  };

  // --- Creation Logic ---
  const handleCreateSubmit = async (data, notesData) => {
    // Find restaurant ID
    const selectedRestaurant = allRestaurants.find(
      (r) => r.restaurant_name === data.restaurant
    );

    if (!selectedRestaurant) {
      toast.error("Please select a valid restaurant.");
      return;
    }

    // Default to today's date if not provided
    const submissionDate = data.date || new Date().toISOString().split('T')[0];

    const payload = {
      restaurant_id: selectedRestaurant.restaurant_id || selectedRestaurant.id,
      date: submissionDate,
      email: data.email,
      weather: data.weather,
      breakfastSales: parseFloat(data.breakfastSales) || 0,
      breakfastGuests: parseInt(data.breakfastGuests) || 0,
      lunchSales: parseFloat(data.lunchSales) || 0,
      lunchGuests: parseInt(data.lunchGuests) || 0,
      dinnerSales: parseFloat(data.dinnerSales) || 0,
      dinnerGuests: parseInt(data.dinnerGuests) || 0,
      totalSales: parseFloat(data.totalSales) || 0,
      totalSalesLastYear: parseFloat(data.totalSalesLastYear) || 0,
      foodSales: parseFloat(data.foodSales) || 0,
      lbwSales: parseFloat(data.lbwSales) || 0,
      hourlyLabor: parseFloat(data.hourlyLabor) || 0,
      hourlyLaborPercent: parseFloat(data.hourlyLaborPercent) || 0,
      hoursWorked: parseFloat(data.hoursWorked) || 0,
      splh: parseFloat(data.splh) || 0,
      // Map dynamic fields to API keys
      item86s: notesData["86’d Items"].filter(n => n.trim()).map(comment => ({ comment })),
      miscNotes: notesData["Misc Notes"].filter(n => n.trim()).map(comment => ({ comment })),
      staffNotes: notesData["Staff Notes"].filter(n => n.trim()).map(comment => ({ comment })),
      callOuts: notesData["Include salaried and managers with explanation"].filter(n => n.trim()).map(comment => ({ comment })),
      maintenanceIssues: notesData["Maintenance Issues"].filter(n => n.trim()).map(comment => ({ comment })),
      misses: notesData["Misses"].filter(n => n.trim()).map(comment => ({ comment })),
      wins: notesData["WINS!"].filter(n => n.trim()).map(comment => ({ comment })),
    };

    try {
      // console.log("Payload:", payload);
      const response = await createBlueBook(payload);

      if (response && response.blueBook) {
        toast.success("Blue Book created successfully!");
        handleBack();
      }
    } catch (error) {
      console.error("Failed to create blue book:", error);
      toast.error("Failed to create blue book.");
    }
  };

  // --- Check Logs Logic ---
  const handleCheckLogsChange = (e) => {
    const { name, value } = e.target;
    setCheckLogsData((prev) => ({ ...prev, [name]: value }));

    if (name === "restaurant") {
      setDropdownOpen(true);
      const filtered = restaurantOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  const handleSelectRestaurantLogs = (name) => {
    setCheckLogsData((prev) => ({ ...prev, restaurant: name }));
    setDropdownOpen(false);
  };

  const handleCheckLogsSubmit = async (e) => {
    e.preventDefault();
    setLogsList([]);

    const selectedRestaurant = allRestaurants.find(
      (r) => r.restaurant_name === checkLogsData.restaurant
    );

    if (!selectedRestaurant) {
      toast.error("Please select a valid restaurant.");
      return;
    }
    if (!checkLogsData.date) {
      toast.error("Please select a date.");
      return;
    }

    try {
      const response = await getBlueBookByDate(selectedRestaurant.restaurant_id || selectedRestaurant.id, checkLogsData.date);
      if (response && response.blueBook) {
        // response.bluebook could be an object (single log) or array depending on backend, assuming single object based on "ByDate"
        const logItem = Array.isArray(response.blueBook) ? response.blueBook[0] : response.blueBook;
        if (logItem) {
          // Enrich with restaurant name for display if needed, though we know it
          setLogsList([{ ...logItem, restaurant_name: checkLogsData.restaurant }]);
        } else {
          toast.error("No Blue Book found for this date.");
        }
      } else {
        toast.error("No Blue Book found for this date.");
      }

    } catch (error) {
      console.error("Failed to fetch blue book logs:", error);
      toast.error("Failed to fetch logs.");
    }
  };

  const handleEditClick = (row) => {
    setSelectedLog(row);
    setIsEditPopupOpen(true);
  };

  const handleEditClose = (shouldRefresh) => {
    setIsEditPopupOpen(false);
    setSelectedLog(null);
    if (shouldRefresh) {
      // Trigger re-fetch
      // Synthetically call submit to refresh list
      handleCheckLogsSubmit({ preventDefault: () => { } });
    }
  };

  // define table structure
  const HeadingData = {
    th: [
      { title: "Date" },
      { title: "Restaurant" },
      { title: "Total Sales" },
      { title: "Guest Count" }, // combining breakfast+lunch+dinner guests? or just showing one?
      { title: "Weather" },
      { title: "Actions" },
    ],
  };

  const formatLogDataForTable = (logs) => {
    return logs.map(log => ({
      date: log.date?.split('T')[0],
      restaurant: log.restaurant_name || checkLogsData.restaurant,
      totalSales: `$${parseFloat(log.total_sales || 0).toFixed(2)}`,
      guestCount: (parseInt(log.breakfast_guests) || 0) + (parseInt(log.lunch_guests) || 0) + (parseInt(log.dinner_guests) || 0),
      weather: log.weather,
    }));
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

          {/* MAIN MENU BUTTONS */}
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

          {/* ADD DATA FORM */}
          {isAddingData && (
            <BlueBookForm
              initialData={{ email: userData?.email || "" }}
              companyId={company_id}
              allRestaurants={allRestaurants}
              setAllRestaurants={setAllRestaurants}
              onSubmit={handleCreateSubmit}
              onCancel={handleBack}
            />
          )}

          {/* CHECK LOGS VIEW */}
          {isCheckingLogs && (
            <div>
              <form onSubmit={handleCheckLogsSubmit} className="space-y-6 mb-8 border-b pb-8">
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Select Restaurant <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="restaurant"
                      autoComplete="off"
                      value={checkLogsData.restaurant}
                      onChange={handleCheckLogsChange}
                      onClick={() => {
                        if (!dropdownOpen) {
                          setCheckLogsData((prev) => ({ ...prev, restaurant: "" }));
                          setFilteredRestaurants(restaurantOptions);
                        }
                        setDropdownOpen(true);
                      }}
                      placeholder="Enter restaurant name"
                      required
                      className="w-full outline-none border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent pr-10 transition-all"
                    />
                  </div>
                  {dropdownOpen && (
                    <ul className="absolute z-10 bg-white w-full border border-[var(--border)] border-t-0 max-h-48 overflow-y-auto rounded-b-xl shadow-lg text-sm mt-1">
                      {filteredRestaurants.length === 0 ? (
                        <li className="px-4 py-2 text-[var(--text-tertiary)]">No match found</li>
                      ) : (
                        filteredRestaurants.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectRestaurantLogs(option)}
                            className="px-4 py-2 hover:bg-[var(--primary-light)] cursor-pointer text-[var(--text-primary)] transition-colors"
                          >
                            {option}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Select Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={checkLogsData.date}
                    onChange={handleCheckLogsChange}
                    required
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="px-9 py-2.5 bg-[var(--primary-accent)] text-white rounded-xl hover:bg-[var(--primary-accent-hover)] text-sm font-medium transition-all duration-200 hover:shadow-md"
                  >
                    Check
                  </button>
                </div>
              </form>

              {/* RESULTS TABLE */}
              {logsList.length > 0 && (
                <Table
                  HeadingData={HeadingData}
                  bodyData={formatLogDataForTable(logsList)}
                  actionData={[
                    ({ rowIndex }) => (
                      <Pencil
                        size={16}
                        className="cursor-pointer text-green-600"
                        onClick={() => handleEditClick(logsList[rowIndex])}
                      />
                    )
                  ]}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {isEditPopupOpen && selectedLog && (
        <BlueBookEditPopUp
          data={selectedLog}
          onClose={handleEditClose}
          companyId={company_id}
          allRestaurants={allRestaurants}
        />
      )}
    </div>
  );
};

export default BlueBook;
