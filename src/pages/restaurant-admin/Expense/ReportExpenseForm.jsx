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

import { processInvoice } from "../../../services/modules/invoiceService";

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
  console.log("data: ", data)
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
  const [isQuickbook, setIsQuickbook] = useState(false);
  const [uploadToQuickBooks, setUploadToQuickBooks] = useState(false);

  // File upload states
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // State to store parsed invoice response
  const [invoiceData, setInvoiceData] = useState(null);
  const [parsedItems, setParsedItems] = useState([]);

  const [quickbookData, setQuickbookData] = useState({
    vendorName: "",
    invoiceNumber: "",
  });

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

  // File drag & drop handlers and upload
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      uploadInvoiceFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      uploadInvoiceFile(selectedFile);
    }
  };

  // Upload file to backend and store invoice data in state
  const uploadInvoiceFile = async (file) => {

    try {
      const response = await toast.promise(
        processInvoice(file),
        {
          loading: "Analyzing submitted invoice...",
          success: "Invoice file Analysed successfully!",
          error: (err) => `Upload failed: ${err.message || err}`,
        }
      );

      const data = response;

      setInvoiceData(data);
      setParsedItems(data.items || []);
      setAmounts(recalculateAmounts(data.items || []));
      return data;
    } catch (error) {
      console.error("Invoice file upload error:", error);
      throw error;
    }
  };

  const normalizeCategory = (cat) => {
    if (cat === "Non-Alcoholic Beverages") return "NA Beverage";
    // add more mappings here if needed in future
    return cat;
  };

  const recalculateAmounts = (items) => {
    const totals = {
      Beer: 0, Liquor: 0, Wine: 0, "NA Beverage": 0, Food: 0,
      Pastry: 0, Retail: 0, Smallware: 0, Linen: 0, Others: 0, Tax: 0
    };
    items.forEach(item => {
      const cat = normalizeCategory(item.category);
      totals[cat] = (totals[cat] || 0) + (Number(item.unit_price) * Number(item.quantity || 0));
    });
    return totals;
  };


  const handleRemoveFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // reset file input
    }
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
    if (file) {
      formPayload.append("file", file);
    }

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
      const response = toast.promise(
        updateExpense(data.expense_id, formPayload, { headers: { "Content-Type": "multipart/form-data" } }),
        {
          loading: "Updating expense...",
          success: (response) => {
            console.log("response: ", response)
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
  const handleParsedItemChange = (idx, field, value) => {
    setParsedItems(prev => {
      const newItems = [...prev];
      if (field === 'quantity') {
        newItems[idx][field] = Number(value) || 0;
      } else {
        newItems[idx][field] = value;
      }
      setAmounts(recalculateAmounts(newItems));
      return newItems;
    });
  };

  const handleQuickbookConnect = () => {
    try {
      if (!formData.restaurant) {
        throw new Error("Restaurant is required to connect to QuickBooks.");
      }
      setIsQuickbook(true);
      toast.success("QuickBooks connected successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
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
          {!isQuickbook && (
            <button
              onClick={handleQuickbookConnect}
              className="flex items-center gap-2 px-4 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-250 font-semibold"
            >
              Connect Quickbook
            </button>
          )}
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
              {/* Upload Drag & Drop Section */}
              <div
                className={`w-full my-4 border-2 border-dashed rounded-md flex flex-col items-center justify-center py-8 cursor-pointer 
                  ${dragActive ? "border-blue-600 bg-blue-100" : "border-gray-400 bg-white"}`}

                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <span onClick={() => inputRef.current.click()} className="flex flex-col justify-center items-center" >
                  <input
                    ref={inputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
                    alt="Upload"
                    width={40}
                    className="mb-2"
                  />
                  <span>
                    <span className="font-bold cursor-pointer text-blue-700">Click</span>{" "}
                    to Browse or{" "}
                    <span className="font-bold text-blue-700">Drag</span> a File Here
                  </span>
                </span>
                {file && (
                  <div className="mt-2 text-green-700 text-sm">{file.name}</div>
                )}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  <span className="text-sm text-blue-600 hover:underline">
                    Remove File
                  </span>
                </button>
              </div>

              {parsedItems.length > 0 && (
                <div className="mt-6 overflow-x-auto max-h-100 border border-gray-300 rounded bg-white p-4">
                  <h3 className="text-lg font-semibold mb-4 text-[var(--main-blue)]">Parsed Invoice Items</h3>
                  <table className="text-sm text-left text-gray-700 border-collapse w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Unit Price</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedItems.map((item, idx) => (
                        <tr key={idx} className="even:bg-gray-50">
                          <td className="border px-4 py-2">{item.description}</td>
                          <td className="border px-4 py-2">${Number(item.unit_price).toFixed(2)}</td>
                          <td className="border px-4 py-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={item.quantity}
                              onChange={e => handleParsedItemChange(idx, 'quantity', e.target.value)}
                              className="w-20 border border-gray-200 rounded text-sm px-2"
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <select
                              value={item.category}
                              onChange={e => handleParsedItemChange(idx, 'category', e.target.value)}
                              className="border border-gray-200 rounded text-sm px-2"
                            >
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
                                "Tax"
                              ].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                              <option value="Non-Alcoholic Beverages">Non-Alcoholic Beverages</option>
                            </select>
                          </td>
                          <td className="border px-4 py-2">
                            ${(Number(item.unit_price) * Number(item.quantity || 0)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}


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
                          {uploadToQuickBooks && (
                            <td className="py-2 px-2 border">
                              <select className="w-full px-0 py-0 bg-transparent border-none outline-none focus:ring-0 focus:border-transparent ">
                                <option value="Accounting fees">Accounting fees</option>
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
                          {totalAmount === 0 ? "Total Amount" : totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {isQuickbook && (
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

                    {uploadToQuickBooks && (
                      <div className="mt-1 overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                          <tbody className="text-sm">
                            <tr>
                              <td className="py-2 px-4 border w-1/4">Vendor Name</td>
                              <td className="py-0 px-0 border">
                                <input
                                  type="text"
                                  placeholder="Enter vendor name"
                                  value={quickbookData.vendorName || ""}
                                  onChange={(e) =>
                                    setQuickbookData((prev) => ({
                                      ...prev,
                                      vendorName: e.target.value,
                                    }))
                                  }
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
                                  value={quickbookData.invoiceNumber || ""}
                                  onChange={(e) =>
                                    setQuickbookData((prev) => ({
                                      ...prev,
                                      invoiceNumber: e.target.value,
                                    }))
                                  }
                                  className="w-full h-full px-2 py-3 border-none outline-none bg-transparent"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
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
