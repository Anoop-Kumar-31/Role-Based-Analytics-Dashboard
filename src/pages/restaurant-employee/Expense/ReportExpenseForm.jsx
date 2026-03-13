import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import {
  RestaurantField,
  EmailField,
  DateField,
  TypeField,
} from "./ExpenseFormFields";

import { getRestaurantsByCompanyId } from '../../../services/modules/restaurantService';

import { useSelector } from "react-redux";

import { createExpense, updateExpense } from "../../../services/modules/expenseService";

const addFormData = (data, formData, setFormData, setAmounts) => {
  if (formData.type === "Salary") {
    setFormData({
      ...formData,
      salaryAmount: data.amount,
    });
  } else if (formData.type === "One-Time Expense") {
    setFormData({
      ...formData,
      oneTimeCategory: data.description || "",
      oneTimeAmount: data.amount,
    });
  } else if (formData.type === "Other") {
    setFormData({
      ...formData,
      otherDetails: data.description || "",
      otherAmount: data.amount,
    });
  } else if (formData.type === "Invoice") {
    const amounts = (data.invoices || []).reduce((acc, info) => {
      const catName = info.salesCategory?.sales_category_name;
      if (catName && info.unit_price !== undefined) {
        const amount = Number(info.unit_price) * Number(info.quantity || 1);
        acc[catName] = (acc[catName] || 0) + amount;
      }
      return acc;
    }, {});
    setAmounts(amounts);
    setFormData({
      ...formData,
      amounts,
    });
  }
  return formData;
};

const ReportExpenseForm = ({ onClose, data = {}, type = "create" }) => {
  // console.log("data: ", data)
  const userData = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    submission_date: data.createdAt ? data.createdAt.split("T")[0] : new Date().toISOString().split("T")[0],
    restaurant: data.restaurant?.restaurant_name,
    email: type === "edit" ? data.user?.email : userData.email,
    expense_date: data.date,
    type: data.category,
  });
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantOptions);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [amounts, setAmounts] = useState({});

  const totalAmount = Object.values(amounts).reduce((acc, val) => acc + val, 0);

  useEffect(() => {
    if (!formData.type) return;
    if (type === "edit") {
      addFormData(data, formData, setFormData, setAmounts);
    }
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurantsByCompanyId();
        setAllRestaurants(response.data);
        if (response && Array.isArray(response.data)) {
          const restaurantNames = response.data.map((r) => r.restaurant_name);
          setRestaurantOptions(restaurantNames);
          setFilteredRestaurants(restaurantNames);
        } else {
          throw new Error("Invalid restaurant data format");
        }
      } catch (error) {
        toast.error("Failed to load restaurant list.");
      }
    };
    fetchRestaurants();
  }, []);

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "restaurant") {
      setDropdownOpen(true);
      const filtered = restaurantOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  const handleSelectRestaurant = (name, index) => {
    setFormData((prev) => ({
      ...prev,
      restaurant: allRestaurants[index].restaurant_name,
      restaurant_id: allRestaurants[index]?.restaurant_id,
    }));
    setFilteredRestaurants(restaurantOptions);
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.restaurant ||
      !formData.email ||
      !formData.expense_date ||
      !formData.type
    ) {
      toast.error("Please fill all required fields!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "amounts") {
        // stringify amounts if present
        formPayload.append("amounts", JSON.stringify(amounts));
      } else if (key === "submission_date") {
        // always use today’s date (or keep existing if you want)
        formPayload.append("submission_date", new Date().toISOString().split("T")[0]);
      } else {
        formPayload.append(key, formData[key]);
      }
    });

    if (type === "create") {
      formPayload.append("amounts", JSON.stringify(amounts));
      formPayload.append("submission_date", new Date().toISOString().split("T")[0]);

      toast.promise(
        createExpense(formPayload, { headers: { "Content-Type": "multipart/form-data" } }),
        {
          loading: "Reporting expense...",
          success: (response) => {
            onClose(true, response.data);
            return "Expense reported successfully!";
          },
          error: (err) => {
            console.error("Error reporting expense:", err);
            return "Failed to report expense. Please try again.";
          },
        },
        {
          position: "top-center",
          duration: 2000,
        }
      );

    } else {
      toast.promise(
        updateExpense(data.expense_id, formPayload, { headers: { "Content-Type": "multipart/form-data" } }),
        {
          loading: "Updating expense...",
          success: (response) => {
            onClose(true, response.data);
            return "Expense updated successfully!";
          },
          error: (err) => {
            console.error("Error updating expense:", err);
            return "Failed to update expense. Please try again.";
          },
        },
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }
  };

  const handleAmountChange = (category, value) => {
    setAmounts({
      ...amounts,
      [category]: parseFloat(value) || 0,
    });
  };

  return (
    <div className="inset-0 backdrop-blur-xs w-full flex flex-col gap-2 items-center justify-center">
      <div className="max-w-4xl w-[60%] mx-auto bg-gray-200 px-4 py-2 mb-8 rounded-md">
        <div className="text-xl font-light text-gray-800 flex items-center space-x-2">
          <span
            onClick={() => onClose(false)}
            className="text-gray-500 cursor-pointer hover:text-gray-800"
          >
            Expenses
          </span>
          <FiChevronRight className="text-blue-600 text-xl" />
          <span className="text-black">Report an Expense</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg w-[60%] h-[100%] p-8 flex flex-col justify-between max-md:w-full max-md:h-full max-md:p-2 max-md:rounded-none">
        <div className="flex items-between justify-between">
          <h2 className="text-2xl font-bold mb-4">Report an Expense</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <RestaurantField
            value={formData.restaurant}
            onChange={handleChange}
            onClick={() => {
              if (!dropdownOpen) {
                setFormData((prev) => ({ ...prev, restaurant: "" }));
                setFilteredRestaurants(restaurantOptions);
              }
              setDropdownOpen((prev) => !prev);
            }}
            dropdownOpen={dropdownOpen}
            filteredRestaurants={filteredRestaurants}
            onSelect={handleSelectRestaurant}
            dropdownRef={dropdownRef}
            type={type}
          />

          <EmailField value={formData.email} onChange={handleChange} type={type} />

          <DateField value={formData.expense_date} onChange={handleChange} type={type} />

          <TypeField value={formData.type} onChange={handleChange} type={type} />

          {/* Dynamic Fields Based on Type */}
          {formData.type === "Salary" && (
            <div className="mt-6">
              <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
                What is the total yearly salary amount you wish to add?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="any"
                name="salaryAmount"
                value={formData.salaryAmount || ""}
                onChange={handleChange}
                required
                placeholder="e.g: 23000"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          )}

          {formData.type === "Invoice" && (
            <>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-[var(--main-blue)]">
                  Enter the Totals by Category
                </h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="text-sm text-left text-gray-700 border-none transparent">
                      <tr>
                        <th className="py-3 px-4 border-gray-200">Category</th>
                        <th className="py-3 px-4 border-gray-200">Amount ($)</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        "Beer",
                        "Liquor",
                        "Wine",
                        "NA Beverage",
                        "Food",
                        "Pastry",
                        "Retail",
                        "Smallware",
                        "Linen",
                        "Others",
                        "Tax",
                      ].map((category, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border">{category}</td>
                          <td className="py-0 px-0 border">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              name={category}
                              value={amounts[category] ?? ""}
                              onChange={(e) =>
                                handleAmountChange(category, e.target.value)
                              }
                              placeholder="Enter amount"
                              className="w-full h-full px-2 py-3 border-none outline-none text-sm bg-transparent"
                            />
                          </td>
                        </tr>
                      ))}

                      <tr className="font-md">
                        <td className="py-2 px-4 border">Total</td>
                        <td className="py-2 px-2 border">
                          {totalAmount === 0 ? "Total Amount" : totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </>
          )}

          {/* One-time Expense */}
          {formData.type === "One-Time Expense" && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
                  What is the category of your one-time expense?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="oneTimeCategory"
                  value={formData.oneTimeCategory}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
                />
              </div>

              <div>
                <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
                  What is the one-time expense amount you would like to report?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  name="oneTimeAmount"
                  value={formData.oneTimeAmount}
                  onChange={handleChange}
                  required
                  placeholder="e.g: 23000"
                  className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Other */}
          {formData.type === "Other" && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
                  What is the "other" expense you would like to report?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="otherDetails"
                  value={formData.otherDetails}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
                />
              </div>

              <div>
                <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
                  What is the amount of the expense?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  name="otherAmount"
                  value={formData.otherAmount}
                  onChange={handleChange}
                  required
                  placeholder="e.g: 23000"
                  className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          )}

          <hr className="border-0.5 border-black mt-14" />

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex items-center gap-2 px-7 py-2 bg-white text-[var(--primary-blue)] border-2 border-[var(--primary-blue)] rounded-md hover:bg-purple-50"
            >
              <span className="text-xl font-bold leading-none">×</span>
              Cancel
            </button>
            <button
              type="submit"
              className="px-9 py-2 bg-[var(--primary-blue)] text-white rounded-md hover:bg-emerald-600 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportExpenseForm;
