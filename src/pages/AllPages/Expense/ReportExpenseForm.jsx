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

const ReportExpenseForm = ({ setActivePage }) => {
  // form data
  const [formData, setFormData] = useState({
    restaurant: "Olive Tree Café",
    email: "",
    date: "",
    type: "",

    // dynamic fields
    salaryAmount: "",
    oneTimeCategory: "",
    oneTimeAmount: "",
    otherDetails: "",
    otherAmount: "",
    invoiceField: "",
  });

  const [filteredRestaurants, setFilteredRestaurants] =
    useState(restaurantOptions);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [uploadToQuickBooks, setUploadToQuickBooks] = useState(false);
  const [amounts, setAmounts] = useState({});

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

  const handleAmountChange = (category, value) => {
    setAmounts({
      ...amounts,
      [category]: parseFloat(value) || 0,
    });
  };

  const totalAmount = Object.values(amounts).reduce((acc, val) => acc + val, 0);

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-6 bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto bg-gray-200 px-6 py-3 mb-8 rounded-md">
        <div className="text-xl font-light text-gray-800 flex items-center space-x-2">
          <span
            onClick={() => setActivePage("Expense")}
            className="text-gray-500 cursor-pointer hover:text-gray-800"
          >
            Expenses
          </span>
          <FiChevronRight className="text-blue-600 text-xl" />
          <span className="text-black">Report an Expense</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex justify-center px-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-b-xl px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Report an Expense
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Field */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-md font-semibold text-blue-900 mb-2">
                What restaurant is this expense for?{" "}
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
                What date did the restaurant incur the expense?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 text-gray-500 py-4 text-sm cursor-pointer"
              />
            </div>

            {/* Type */}
            <div className="flex flex-col">
              <label className="block text-md font-semibold text-blue-900 mb-2">
                Are you reporting an invoice, salary, a one-time expense, or
                something else?
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className={`w-full border border-gray-300 rounded-md px-4 py-4 text-sm pr-10 appearance-none bg-white outline-none ${
                    formData.type === "" ? "text-gray-400" : "text-black"
                  }`}
                >
                  <option value="">Please select</option>
                  <option value="Salary">Salary</option>
                  <option value="Invoice">Invoice</option>
                  <option value="One-time Expense">One-time Expense</option>
                  <option value="Other">Other</option>
                </select>

                {/* Custom chevron icon */}
                <div className="pointer-events-none absolute right-12 top-1/2 transform -translate-y-1/2 text-black">
                  <FiChevronDown size={24} />
                </div>
              </div>
            </div>

            {/* Dynamic Fields Based on Type */}
            {/* salary */}
            {formData.type === "Salary" && (
              <div className="mt-6">
                <label className="block text-md font-semibold text-blue-900 mb-2">
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
                <h3 className="text-lg font-semibold mb-4 text-blue-900">
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
                              onChange={(e) => handleAmountChange(category, e.target.value)}
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
                        <td className="py-2 px-2 border">{totalAmount === 0 ? "Total Amount" : totalAmount.toFixed(2)}</td>
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
                  <label className="block text-md font-semibold text-blue-900 mb-2">
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
                  <label className="block text-md font-semibold text-blue-900 mb-2">
                    What is the one-time expense amount you would like to
                    report? <span className="text-red-500">*</span>
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
                  <label className="block text-md font-semibold text-blue-900 mb-2">
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
                  <label className="block text-md font-semibold text-blue-900 mb-2">
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
            <hr className="border-1 border-black mt-14" />

            {/* Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setActivePage("Expense")}
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

export default ReportExpenseForm;
