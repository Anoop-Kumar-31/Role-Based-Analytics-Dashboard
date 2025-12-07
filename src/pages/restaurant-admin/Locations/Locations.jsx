import { useState, useEffect, useCallback, useRef} from "react";
import { Pencil } from "lucide-react";
import Table from "../../../components/Table";
import PopUp from "./PopUp";
// import mockData from './mockData.json';
import { toast } from "react-hot-toast";

import { getUserRestaurants } from "../../../services/modules/userService";
import { useSelector } from "react-redux";

const HeadingData = {
  th: [
    { title: "Restaurant Name" },
    { title: "Address" },
    { title: "Update on" },
    { title: "Actions" },
  ],
};

const Locations = () => {
  const [popUp, setPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [restaurants, setRestaurants] = useState({});
  const [allResponse, setAllResponse] = useState({});
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const hasFetched = useRef(false);
  const user = useSelector((state) => state.auth.user);
  const user_id = user?.id;
  // console.log(user);

  // ⏬ Fetch restaurants
  useEffect(() => {
    if (!user_id || hasFetched.current) return;
    hasFetched.current = true;

    const fetchRestaurants = async () => {
      try {
        const response = await toast.promise(
          getUserRestaurants(user_id),
          {
            loading: "Fetching restaurant locations...",
            success: "Locations loaded!",
            error: "Failed to fetch locations.",
          },
          { success: { duration: 2000 }, error: { duration: 2000 } }
        );
        if (response?.restaurants) {
          setAllResponse(response.restaurants);
          const mapped = response.restaurants.map(({ restaurant_name, restaurant_location, updated_at }) => ({
            name: restaurant_name,
            address: restaurant_location,
            updateOn: updated_at ? new Date(updated_at).toLocaleDateString() : "N/A",
          }));
          setRestaurants(mapped);
        }
      } catch (error) {
        console.error("API failed, loading mock data:", error);
      }
    };

    fetchRestaurants();
  }, [user_id]);

  // Handle edit
  const handleEdit = (e, index) => {
    e.stopPropagation();
    setEditIndex(index);
    console.log("selected res:\n",allResponse[index])
    setSelectedRestaurant(allResponse[index])
    setPopup(true);
    console.log("Edit index:", popUp);
  };

  // Handle popup close
  const handleOnClose = useCallback((res) => {
    setPopup(false);
    res &&
          toast.success("User's data Updated successfully!", {
            position: "top-center",
            duration: 2000,
          })
  }, []);

  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 max-md:p-1">
      {popUp ? (
        <PopUp
          onClose={handleOnClose}
          selectedRestaurant={selectedRestaurant}
        />
      ) : (
        <>
          {/* Top Section */}
          <section className="flex flex-col justify-between bg-[var(--background)] items-center w-full gap-[15px]  py-2">
            <div className="flex flex-row justify-between  items-center w-[100%]">
              <h1 className="text-3xl font-bold text-[var(--primary-black)] self-center">
                Restaurants&apos; Location
              </h1>
            </div>
          </section>

          {/* Table Section */}
          <section className=" py-[30px] pb-[120px] w-[100%] overflow-scroll flex justify-start max-md:px-1">
            <Table
              HeadingData={HeadingData}
              bodyData={Array.isArray(restaurants) ? restaurants : []}
              actionData={[
                ({ rowIndex }) => (
                  <Pencil
                    size={16}
                    strokeWidth={3}
                    color="#559955"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleEdit(e, rowIndex)}
                  />
                )
              ]}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default Locations;