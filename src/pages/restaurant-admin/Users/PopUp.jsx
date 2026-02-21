import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { useSelector } from "react-redux";

import { getAllRoles } from "../../../services/modules/roleService";
import { getRestaurantsByCompanyId } from "../../../services/modules/restaurantService";

import { addUser, getUserByEmail, updateUser } from "../../../services/modules/userService"

const UserInfoForm = ({ form, setForm, roleOptions, restaurantOptions }) => {

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-6 mb-6">
        {/* First Name */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="user_first_name">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            id="user_first_name"
            className="w-full border rounded px-3 py-2"
            value={form.user_first_name}
            onChange={e => setForm(f => ({ ...f, user_first_name: e.target.value }))}
            placeholder="Enter first name"
            required
          />
        </div>
        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="user_last_name">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            id="user_last_name"
            className="w-full border rounded px-3 py-2"
            value={form.user_last_name}
            onChange={e => setForm(f => ({ ...f, user_last_name: e.target.value }))}
            placeholder="Enter last name"
            required
          />
        </div>
        {/* Email */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="user_email">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="user_email"
            className="w-full border rounded px-3 py-2"
            type="email"
            value={form.user_email}
            onChange={e => setForm(f => ({ ...f, user_email: e.target.value }))}
            placeholder="user@email.com"
            required
          />
        </div>
        {/* Phone Number */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="user_phone_no">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            id="user_phone_no"
            className="w-full border rounded px-3 py-2"
            value={form.user_phone_no}
            onChange={e => setForm(f => ({ ...f, user_phone_no: e.target.value }))}
            placeholder="000-000-0000"
            required
          />
        </div>
      </div>

      {!["Super_Admin", "Company_Admin"].includes(form.role) && (
        <>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="restaurant">
              Restaurant <span className="text-red-600">*</span>
            </label>
            <select
              id="restaurant"
              className="w-full border rounded px-3 py-2"
              value={form.restaurant}
              onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))}
              required
            >
              <option value="">Select a restaurant</option>
              {restaurantOptions?.map((r, idx) => (
                <option key={`${r}-${idx}`} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="role">
              Role Type <span className="text-red-600">*</span>
            </label>
            <select
              id="role"
              className="w-full border rounded px-3 py-2"
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              required
            >
              <option value="">Select a role</option>
              {roleOptions?.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};


const UserReviewForm = ({ form }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Review Information</h2>
    <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-6 mb-6">
      <div>
        <span className="font-semibold">First Name:</span>
        <div>{form.user_first_name}</div>
      </div>
      <div>
        <span className="font-semibold">Last Name:</span>
        <div>{form.user_last_name}</div>
      </div>
      <div>
        <span className="font-semibold">Email:</span>
        <div>{form.user_email}</div>
      </div>
      <div>
        <span className="font-semibold">Phone Number:</span>
        <div>{form.user_phone_no}</div>
      </div>
      <div className="col-span-2">
        <span className="font-semibold">Restaurant:</span>
        <div>{form.restaurant}</div>
      </div>
      <div className="col-span-2">
        <span className="font-semibold">Role:</span>
        <div>{form.role}</div>
      </div>
    </div>
  </div>
);

const PopUp = ({ onClose, data, formType = "edit" }) => {
  // Split fullName into user_first_name and user_last_name only once on mount
  // console.log(data)
  const initialForm = React.useMemo(() => {
    if (data && data.fullName) {
      const parts = data.fullName.trim().split(" ");
      return {
        ...data,
        user_first_name: parts[0] || "",
        user_last_name: parts.slice(1).join(" ") || "",
        restaurant: data.restaurant,
        role: data.role,
        user_phone_no: data.phone_number,
        user_email: data.user_email,
      };
    }
    return {
      user_first_name: "",
      user_last_name: "",
      user_email: "",
      user_phone_no: "",
      restaurant: "",
      role: "",
    };
  }, [data]);

  const [form, setForm] = useState(initialForm);
  const [page, setPage] = useState(0);
  // const [allRestaurants , setAllRestaurants] = useState();
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  // const [allRoles, setAllRoles] = useState()
  const [roleOptions, setRoleOptions] = useState([])

  const userData = useSelector((state) => state.auth.user); // get user from redux
  const company_id = userData?.company_id;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurantsByCompanyId(company_id);
        const roles = await getAllRoles();
        // setAllRoles(roles);
        // setAllRestaurants(response);

        if (roles && Array.isArray(roles.data)) {
          const roleNames = roles?.data?.map((r) => r.role_name);
          // console.log(roleNames);
          setRoleOptions(roleNames);
        } else {
          throw new Error("Invalid roles data format");
        }

        if (response && Array.isArray(response.data)) {
          const restaurantNames = response?.data?.map((r) => r.restaurant_name);
          setRestaurantOptions(restaurantNames);
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

  const pages = [
    <UserInfoForm key="user-info" form={form} setForm={setForm} restaurantOptions={restaurantOptions} roleOptions={roleOptions} />,
    <UserReviewForm key="user-review" form={form} />
  ];

  const handleSubmit = async (props) => {
    // console.log(props);
    const parts = props.fullName.trim().split(" ");
    const first_name = parts.shift();
    const last_name = parts.join(" "); // MAYBE THE LAST NAME HAVE MORE WORDS then 1

    const req = {
      user_first_name: first_name,
      user_last_name: last_name,
      role: props.role,
      restaurant_name: props.restaurant,
      user_phone_no: props.user_phone_no,
      user_email: props.user_email
    }
    if (formType == "create") {
      try {
        const response = await addUser(req);
        // console.log(response);
        toast.success("User added successfully");
      } catch (error) {
        console.error("❌ Failed to add user:", error);
        toast.error(`${error}`);
      }
    } else {
      try {
        const response = await updateUser(form.user_id, req);
        // console.log(response);
        toast.success("User updated successfully");
      } catch (error) {
        console.error("❌ Failed to update user:", error);
        toast.error(`${error}`);
      }
    }
  }

  const handleNext = () => {
    if (page === 0) {
      const { user_first_name, user_last_name, user_email, user_phone_no, restaurant, role } = form;
      if (!user_first_name || !user_last_name || !user_email || !user_phone_no || !restaurant || !role) {
        toast.error("Please fill all required fields!", {
          position: "top-right",
          duration: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }
    }

    if (page < pages.length - 1) {
      setPage(prev => prev + 1);
    } else {
      const { user_first_name, user_last_name, user_email, user_phone_no, restaurant, role } = form;
      const fullName = user_first_name + ' ' + user_last_name
      handleSubmit({ fullName, user_email, user_phone_no, restaurant, role });
      onClose(true);
    }
  };

  const handleBack = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 h-[calc(100vh-60px)] bg-[#00000033] backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white w-[50%] h-fit p-8 flex flex-col justify-between
                      max-md:w-full max-md:h-full max-md:p-2 max-md:rounded-none rounded-2xl">
        <section className="h-fill mb-8 h-[90%] px-3 overflow-y-scroll max-md:px-1 max-md:mb-4">
          {pages[page]}
        </section>
        <section className="flex justify-end gap-3 max-md:gap-2 max-md:flex-col-reverse">
          <button
            className="px-5 py-2 rounded-lg bg-white hover:bg-[#ffaaaa] border-2 border-red-900 text-red-900 max-md:w-full"
            onClick={() => {
              setForm({
                user_first_name: "",
                user_last_name: "",
                user_email: "",
                user_phone_no: "",
                restaurant: "",
                role: "",
              });
              onClose(false);
            }}
          >
            Close
          </button>
          {page > 0 && (
            <button
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 max-md:w-full"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white max-md:w-full"
            onClick={handleNext}
          >
            {page === pages.length - 1 ? "Submit" : "Next"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default PopUp;
