import React, { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
// import "./Dashboard.css";
import { Funnel } from "lucide-react";
import DashboardIframe from "./DashboardIframe";
import RestaurantDropdown from "../../../components/RestaurantDropdown";
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
  const [iframeData, setIframeData] = useState({}); // This will store iframe of dashboard

  // Fetch restaurants from backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurantsByCompanyId(); // Adjust based on your API return format
        // console.log(response)
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
        // ADD A BACKEND CALL HERE TO APPLY THE FILTER---------------------------------
        // LET SAY WE GOT AN I FRAME IN THE DASHBOARD THAT SHOWS THE DATA now send it to DashboardIframe component
        const iframe = {}
        setIframeData(iframe);
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
    }
  }, [validateDates]);

  return (
    <div className="flex flex-col items-center bg-[var(--background)] overflow-scroll max-md:p-3">
      {/* Top Section */}
      <section className="flex flex-col justify-between bg-[var(--background)] items-center w-full gap-[15px] p-5 pt-7 max-md:p-0">
        <div className="flex flex-col justify-between gap-[15px] items-start w-[100%]">
          <h1 className="text-3xl font-bold text-[var(--primary-black)]  ">Dashboard</h1>
          <div className="flex w-[clamp(200px,50%,600px)] text-[var(--primary-black)] h-fit max-md:w-full">
            <RestaurantDropdown
              options={restaurants}
              selected={selected}
              setSelected={setSelected}
              onSubmit={onSubmit}
            />
          </div>
        </div>

      </section>

      {/* Bottom Section */}
      <section className="flex-grow flex flex-col items-center w-[100%] p-5 py-0 gap-6 max-md:p-0">
        {/* Filter Container */}
        {/* <div className="flex flex-col w-full bg-white shadow-[0_2px_3px_#00000033] rounded-[10px] py-2">
          <section>
            <h1 className="px-5 mt-2 mb-0 text-[var(--primary-black)] text-lg">Filters</h1>
          </section>
          <section className="flex w-full justify-between flex-wrap text-base">
            <section className="flex items-center gap-2 flex-grow max-w-fit flex-wrap m-0 px-5">
              <span className="font-semibold">Time Period: </span>
              <p className="m-0">From</p>
              <input
                type="date"
                name="from-date"
                value={timePeriod[0]}
                onChange={e => handleDateChange(0, e.target.value)}
                className="bg-[var(--background)] border border-[var(--light-grey)] rounded-[10px] px-4 py-2 focus:shadow-[0_0_0_1px_var(--secondary-blue)] focus:outline-none"
              />
              <p className="m-0">To</p>
              <input
                type="date"
                name="to-date"
                value={timePeriod[1]}
                onChange={e => handleDateChange(1, e.target.value)}
                className="bg-[var(--background)] border border-[var(--light-grey)] rounded-[10px] px-4 py-2 focus:shadow-[0_0_0_1px_var(--secondary-blue)] focus:outline-none"
              />
              <button
                type="button"
                onClick={applyFilter}
                className="bg-[var(--primary-blue)] text-white border-none px-4 py-2 rounded-[10px] flex items-center justify-center gap-1 font-medium text-base transition hover:brightness-90"
              >
                <Funnel size={19} />Apply
              </button>
              {error && (
                <div className="text-red-600 mt-2 bg-white/60 backdrop-blur-sm shadow-[0_0_2px_black] absolute px-3 py-1 rounded-[10px] text-sm translate-x-[75%] translate-y-full">
                  {error}
                </div>
              )}
            </section>
            <aside className="flex justify-between items-center flex-grow gap-2 max-w-fit flex-wrap m-2 px-5">
              <button
                className="bg-[var(--primary-blue)] text-white border-none px-4 py-2 rounded-[10px] font-medium text-base transition hover:brightness-90"
                type="button"
                onClick={() => handleQuickFilter("Last Day")}
              >
                Last Day
              </button>
              <button
                className="bg-[var(--primary-blue)] text-white border-none px-4 py-2 rounded-[10px] font-medium text-base transition hover:brightness-90"
                type="button"
                onClick={() => handleQuickFilter("Last Week")}
              >
                Last Week
              </button>
              <button
                className="bg-[var(--primary-blue)] text-white border-none px-4 py-2 rounded-[10px] font-medium text-base transition hover:brightness-90"
                type="button"
                onClick={() => handleQuickFilter("Last Year")}
              >
                Last Year
              </button>
            </aside>
          </section>
        </div> */}
        <DashboardIframe active={active} setActive={setActive} iframeData={iframeData} />
      </section>
    </div>
  );
};

export default Dashboard;
