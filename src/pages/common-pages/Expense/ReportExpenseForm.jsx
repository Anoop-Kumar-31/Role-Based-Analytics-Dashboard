import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  RestaurantField,
  EmailField,
  DateField,
  TypeField,
} from "./ExpenseFormFields";

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

const ReportExpenseForm = ({ onClose, data = {} }) => {
  const [formData, setFormData] = useState({
    submissionDate: data.submissionDate || "",
    restaurant: data.restaurant || "Olive Tree Café",
    email: data.email || "",
    expenseDate: data.expenseDate || "",
    reportingType: data.reportingType || "",
    // type: data.type || "",
  });

  const [filteredRestaurants, setFilteredRestaurants] =
    useState(restaurantOptions);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploadToQuickBooks, setUploadToQuickBooks] = useState(false);
  const dropdownRef = useRef(null);
  const [amounts, setAmounts] = useState({});

  const totalAmount = Object.values(amounts).reduce((acc, val) => acc + val, 0);

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
    ...(name === "type" ? { reportingType: value } : {}),
  }));

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
  if (
    !formData.restaurant ||
    !formData.email ||
    !formData.expenseDate ||
    !formData.type
  ) {
    toast.error("Please fill all required fields!", {
      position: "top-center",
      autoClose: 2000,
    });
    return;
  }
  const formattedData = {
    ...formData,
    submissionDate: new Date().toISOString().split("T")[0],
  };
  onClose(true, {submissionDate: formattedData.submissionDate, restaurant: formattedData.restaurant, email: formattedData.email, expenseDate: formattedData.expenseDate, reportingType: formattedData.reportingType });
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
        <h2 className="text-2xl font-bold mb-4">Report an Expense</h2>
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
          />

          <EmailField value={formData.email} onChange={handleChange} />

          <DateField value={formData.expenseDate} onChange={handleChange} />

          <TypeField value={formData.type} onChange={handleChange} />

          {/* Dynamic Fields Based on Type */}
          {/* salary */}
          {formData.type === "Salary" && (
            <div className="mt-6">
              <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
                What is the total yearly salary amount you wish to add?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="salaryAmount"
                value={formData.salaryAmount}
                onChange={handleChange}
                required
                placeholder="e.g: 23000"
                className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          )}

          {/* Invoice */}
          {formData.type === "Invoice" && (
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
                      {uploadToQuickBooks && (
                        <th className="py-3 px-4 border-none">Expense Type</th>
                      )}
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
                      "Tax",
                    ].map((category, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border">{category}</td>
                        <td className="py-0 px-0 border">
                          <input
                            type="number"
                            name={amounts[category] || ""}
                            onChange={(e) =>
                              handleAmountChange(category, e.target.value)
                            }
                            placeholder="Enter amount"
                            className="w-full h-full px-2 py-3 border-none outline-none text-sm bg-transparent"
                          />
                        </td>
                        {uploadToQuickBooks && (
                          <td className="py-2 px-2 border">
                            <select className="w-full px-0 py-0 bg-transparent border-none outline-none focus:ring-0 focus:border-transparent ">
                              <option value="Accounting fees">
                                Accounting fees
                              </option>
                              <option value="Advertisement And Marketing">
                                Advertisement And Marketing
                              </option>
                              <option value="Glassware">Glassware</option>
                              <option value="Dairy Cost">Dairy Cost</option>
                              <option value="Meals">Meals</option>
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}

                    <tr className="font-md">
                      <td className="py-2 px-4 border">Total</td>
                      <td className="py-2 px-2 border">
                        {totalAmount === 0
                          ? "Total Amount"
                          : totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Upload to QuickBooks & Vendor Info */}
              <div className="mt-3 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="quickbooksUpload"
                    checked={uploadToQuickBooks}
                    onChange={(e) => setUploadToQuickBooks(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="quickbooksUpload"
                    className="text-sm font-medium text-gray-700"
                  >
                    Upload to QuickBooks
                  </label>
                </div>

                {/*  */}
                {uploadToQuickBooks && (
                  <div className="mt-1 overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                      <tbody className="text-sm">
                        <tr>
                          <td className="py-2 px-4 border w-1/4">
                            Vendor Name
                          </td>
                          <td className="py-0 px-0 border">
                            <input
                              type="text"
                              placeholder="Enter vendor name"
                              className="w-full h-full px-2 py-3 border-none outline-none bg-transparent"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border">Invoice No.</td>
                          <td className="py-0 px-0 border">
                            <input
                              type="text"
                              placeholder="Enter invoice number"
                              className="w-full h-full px-2 py-3 border-none outline-none bg-transparent"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/*one time expense  */}
          {formData.type === "One-time Expense" && (
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

          {/* Other  */}
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

          {/* Divider */}
          <hr className="border-0.5 border-black mt-14" />

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex items-center gap-2 px-7 py-2 bg-white text-[var(--primary-blue)] border-2 border-[var(--primary-blue)] hover:shadow-md/30 rounded-md hover:bg-purple-50"
            >
              <span className="text-xl font-bold leading-none">×</span>
              Cancel
            </button>
            <button
              type="submit"
              className="px-9 py-2 bg-[var(--primary-blue)] text-white rounded-md hover:bg-emerald-600 hover:shadow-md/30 transition-colors duration-300"
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
