import React, { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
// import "./Dashboard.css";
import { Funnel } from "lucide-react";
import DashboardIframe from "./DashboardIframe";
import RestaurantDropdown from "../../../components/RestaurantDropdown";
import { getDashboardStats } from "../../../services/modules/dashboardService";
import { getRestaurantsByCompanyId } from "../../../services/modules/restaurantService";

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState();
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState("prime");
  const [timePeriod, setTimePeriod] = useState(["", ""]);
  const [error, setError] = useState("");
  const [dashboardStats, setDashboardStats] = useState(null);

  // Fetch restaurants from backend
  useEffect(() => {
    const fetchStats = async (start = "", end = "") => {
      try {
        console.log("fetching the stats")
        const response = await getDashboardStats(start, end);
        console.log(response)
        if (response) {
          setDashboardStats(response);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
        toast.error("Failed to load dashboard statistics");
      }
    };
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurantsByCompanyId(); // Adjust based on your API return format
        console.log(response)
        setAllRestaurants(response);
        if (response && Array.isArray(response.data)) {
          const restaurantNames = response.data.map((r) => r.restaurant_name);
          setRestaurants(restaurantNames);
          setRestaurantOptions(restaurantNames);
          setFilteredRestaurants(restaurantNames); // Initialize filtered list too
        } else {
          throw new Error("Invalid restaurant data format");
        }
      } catch (error) {
        console.error("❌ Failed to fetch restaurants:", error);
        toast.error("Failed to load restaurant list.");
      }
    };

    fetchRestaurants();
    fetchStats(); // Fetch initial stats
  }, []);

  // Validate dates
  const validateDates = useCallback((from, to) => {
    setError("");
    console.log("Validating dates:", from, to);
    if (from && to && from > to) {
      setError("From date cannot be greater than To date.");
      setTimeout(() => setError(""), 3000);
      return false;
    }
    const today = new Date().toISOString().split("T")[0];
    if ((from && from > today) || (to && to > today)) {
      setError("Please select a date within the current date.");
      setTimeout(() => setError(""), 3000);
      return false;
    }
    return true;
  }, []);

  // Handle date input change
  const handleDateChange = useCallback((index, value) => {
    const updated = [...timePeriod];
    updated[index] = value;
    if (validateDates(updated[0], updated[1])) {
      setTimePeriod(updated);
    }
  }, [timePeriod, validateDates]);

  // Submit selected restaurants
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    // Replace with actual backend call
    console.log("Selected Restaurants:", selected);
  }, [selected]);

  // Apply filter based on selected dates
  const applyFilter = useCallback(() => {
    const [from, to] = timePeriod;
    if (from && to) {
      if (validateDates(from, to)) {
        fetchStats(from, to);
        console.log("Filter applied with dates:", from, to);
        setActive("prime");
      }
    } else {
      setError("Please select both From and To dates.");
      setTimeout(() => setError(""), 3000);
    }
  }, [timePeriod, validateDates]);

  // Handle quick filter buttons
  const handleQuickFilter = useCallback((type) => {
    const today = new Date();
    let from = "", to = "";
    switch (type) {
      case "Last Day":
        to = today.toISOString().split("T")[0];
        from = new Date(today);
        from.setDate(today.getDate() - 1);
        from = from.toISOString().split("T")[0];
        break;
      case "Last Week":
        to = today.toISOString().split("T")[0];
        from = new Date(today);
        from.setDate(today.getDate() - 7);
        from = from.toISOString().split("T")[0];
        break;
      case "Last Year":
        to = today.toISOString().split("T")[0];
        from = new Date(today);
        from.setFullYear(today.getFullYear() - 1);
        from = from.toISOString().split("T")[0];
        break;
      // case "All Time":
      //   from = "";
      //   to = "";
      //   break;
      default:
        from = "";
        to = "";
    }
    if (validateDates(from, to)) {
      setTimePeriod([from, to]);
      fetchStats(from, to);
    }
  }, [validateDates]);

  return (
    <div className="flex flex-col items-center bg-[var(--background)] overflow-auto max-md:p-3">
      {/* Top Section */}
      {/* <section className="flex flex-col justify-between bg-[var(--background)] items-center w-full gap-4 p-5 pt-5 max-md:p-0">
        <div className="flex flex-col justify-between gap-4 items-start w-full">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
          <div className="flex w-[clamp(200px,50%,600px)] text-[var(--text-primary)] h-fit max-md:w-full">
            <RestaurantDropdown
              options={restaurants}
              selected={selected}
              setSelected={setSelected}
              onSubmit={onSubmit}
            />
          </div>
        </div>

      </section> */}

      {/* Bottom Section */}
      <section className="flex-grow flex flex-col items-center w-full p-5 py-0 gap-5 max-md:p-0">
        {/* Filter Container */}
        <div className="flex flex-col w-full bg-white shadow-sm border border-gray-200 rounded-xl py-4 transition-all hover:shadow-md">
          <section className="px-5 mb-4 border-b border-gray-100 pb-2">
            <p className="text-gray-400 italic text-xs">Filter currently not working</p>
            <h1 className="text-gray-800 text-lg font-semibold flex items-center gap-2">
              <Funnel size={20} className="text-[var(--primary-blue)]" />
              Filters
            </h1>
          </section>
          <section className="flex w-full justify-between flex-wrap text-sm gap-4 px-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-medium text-gray-600">Time Period:</span>
              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                <input
                  type="date"
                  value={timePeriod[0]}
                  onChange={(e) => handleDateChange(0, e.target.value)}
                  className="bg-transparent border-none text-gray-700 text-sm focus:ring-0 cursor-pointer"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="date"
                  value={timePeriod[1]}
                  onChange={(e) => handleDateChange(1, e.target.value)}
                  className="bg-transparent border-none text-gray-700 text-sm focus:ring-0 cursor-pointer"
                />
              </div>
              <button
                type="button"
                onClick={applyFilter}
                className="bg-[var(--primary-blue)] text-white px-4 py-1.5 rounded-lg flex items-center gap-2 font-medium transition hover:bg-blue-600 shadow-sm active:scale-95"
              >
                Apply
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {["Last Week", "Last Month", "Last Year"].map((filter) => (
                <button
                  key={filter}
                  className="bg-white text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg font-medium text-sm transition hover:bg-gray-50 hover:text-[var(--primary-blue)] hover:border-[var(--primary-blue)] active:scale-95"
                  type="button"
                  onClick={() => handleQuickFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {error && (
              <div className="w-full text-red-500 text-xs mt-2 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
          </section>
        </div>

        <DashboardIframe active={active} setActive={setActive} stats={dashboardStats} />
      </section>
    </div>
  );
};

export default Dashboard;
