import React, { useState, useCallback, useEffect } from "react";
import { FiSearch, FiFilter, FiRefreshCw, FiDownload } from "react-icons/fi";
import { Pencil, Trash2 } from "lucide-react";
import mockData from "./mockData.json";
import toast from "react-hot-toast";
// import "react-hot-toast/dist/ReactToastify.css";
import Table from "../../../components/Table";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp";
import ReportExpenseForm from "./ReportExpenseForm";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


import { getExpense, deleteExpense } from "../../../services/modules/expenseService";

const HeadingData = {
  th: [
    { title: "Submission Date" },
    { title: "Restaurant" },
    { title: "Email" },
    { title: "Receipt Date" },
    { title: "Reporting As" },
    { title: "Action" },
  ],
};

const Expense = () => {
  const [popup, setPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [expenseList, setExpenseList] = useState(mockData);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [type, setType] = useState("create");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const hasFetchedInitial = React.useRef(false);
  const [shouldRefetch, setShouldRefetch] = useState(0);
  const [allExpenses, setAllExpenses] = useState([]); // Store all expenses fetched from API


  useEffect(() => {
    if (hasFetchedInitial.current === false) {
      hasFetchedInitial.current = true;
    } else if (shouldRefetch === 0) {
      return;
    }

    const fetchExpenses = async () => {
      setIsLoading(true);
      setApiError(false);
      try {
        const response = await toast.promise(
          getExpense(),
          {
            loading: 'Loading expenses...',
            success: 'Expenses loaded successfully!',
            error: 'Failed to load expenses.',
          },
          { success: { duration: 3500 }, error: { duration: 2000 } }
        );
        if (!response || !response.data) throw new Error('Invalid response');

        setAllExpenses(response.data);
        const formatted = response.data.map(expense => ({
          submissionDate: new Date(expense.created_at).toLocaleDateString(),
          restaurantName: expense.restaurant?.restaurant_name || 'Unknown',
          email: expense.user.user_email || 'N/A',
          expenseDate: expense.expense_date,
          reportingType: expense.expenseCategory?.category_name || 'Unknown',
        }));

        setExpenseList(formatted);
      } catch (error) {
        console.error('Fetch expenses error:', error);
        setApiError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchExpenses();
  }, [shouldRefetch]);

  const handleDownload = () => {
    if (!allExpenses || allExpenses.length === 0) {
      toast.error("No expenses available to download");
      return;
    }

    // Filter only expenses with category "Invoice"
    const invoiceExpenses = allExpenses.filter(
      expense => expense.expenseCategory?.category_name === "Invoice"
    );

    if (invoiceExpenses.length === 0) {
      toast.error("No invoice expenses available to download");
      return;
    }

    // Define the sales categories you want as columns (match your XLS columns)
    const salesCategories = [
      "Beer",
      "Liquor",
      "Wine",
      "Beverage",
      "Food",
      "Pastry",
      "Retail"
    ];

    // Transform data to appropriate export format
    const dataForExport = invoiceExpenses.map(expense => {
      // Initialize with zeros
      const categorySums = salesCategories.reduce((acc, cat) => {
        acc[`${cat} Expense`] = 0;
        return acc;
      }, {});

      // Sum unit_price for each sales_category_name
      for (const invoice of expense.invoices || []) {
        const catName = invoice.sales_category?.sales_category_name;
        if (salesCategories.includes(catName)) {
          categorySums[`${catName} Expense`] += invoice.unit_price || 0;
        }
      }

      return {
        "Restaurant Name": expense.restaurant?.restaurant_name || "Unknown",
        "Expense Date": expense.expense_date,
        ...categorySums
      };
    });

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataForExport);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");

    // Generate XLSX file buffer
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Save the file
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `Expense_Report_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };


  // Handle add/edit
  const handleEdit = useCallback((index) => {
    setType("edit");
    setEditIndex(index);
    setSelectedExpense(allExpenses[index]);
    setPopup(true);
  }, [expenseList]);

  // Handle popup close and submit
  const handleOnClose = useCallback((res, data) => {
    setType("");
    setPopup(false);
    setEditIndex(null);
    setSelectedExpense({});
    setShouldRefetch(prev => prev + 1);
  }, [expenseList, editIndex]);

  // Handle delete
  const handleDelete = useCallback((index) => {
    setDeleteIndex(index);
    setConfirmOpen(true);
  }, []);

  const confirmDelete = async() => {
    try{
      const res = await toast.promise(
        deleteExpense(allExpenses[deleteIndex].expense_id),
        {
          loading: 'Deleting expense...',
          success: 'Expense deleted successfully!',
          error: 'Failed to delete expense.',
        },
        { success: { duration: 3500 }, error: { duration: 2000 } }
      );
      setShouldRefetch(prev => prev + 1);
    }catch(err){
      console.error('Delete expense error:', err);
      toast.error("Failed to delete expense entry.", { position: "top-center", duration: 2000 });
    }
    setConfirmOpen(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setDeleteIndex(null);
  };

  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 w-full">
      {!popup ?
        <>
          {/* Header */}
          <section className="flex justify-between w-full gap-4 py-2 mb-2">
            <h1 className="text-3xl font-bold text-[var(--primary-black)]">Expense</h1>
            {/* <button
              className="bg-[var(--primary-blue)] text-white  px-4 py-2 rounded-lg font-semibold hover:brightness-95 hover:shadow-md/30"
              onClick={() => {
                setType("create");
                setEditIndex(null);
                setSelectedExpense({});
                setPopup(true);
              }}
            >
              Report an Expense
            </button> */}
          </section>

          {/* Search + Actions */}
          <div className="flex flex-wrap justify-between items-center mb-4 w-full">
            <div className="flex items-center flex-grow max-w-md">
              <div className="flex items-center bg-white px-3 py-2 rounded-l-lg border border-gray-300 border-r-0 w-full">
                <FiSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
              <button className="flex items-center gap-1 px-3 py-2 bg-gray-200 border border-gray-300 rounded-r-lg text-sm text-gray-700 hover:bg-gray-300">
                Filter
                <FiFilter className="text-gray-600" />
              </button>
            </div>

            <div className="flex gap-3 flex-wrap mt-2 md:mt-0">
              <button
                className="bg-[#058877] text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:bg-[#047c6e] hover:shadow-md/30"
                onClick={handleDownload}
              >
                <FiDownload className="mr-2" />
                Download XLS
              </button>

              <button className="bg-[#058877] text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:bg-[#047c6e] hover:shadow-md/30">
                <FiRefreshCw className="mr-2" />
                Sync All
              </button>
            </div>
          </div>

          {/* Table */}
          <section className="py-6 w-full h-fit overflow-x-auto flex justify-start max-md:px-1">
            <Table
              HeadingData={HeadingData}
              bodyData={expenseList}
              actionData={[
                ({ rowIndex }) => (
                  <Pencil
                    key={`edit-${rowIndex}`}
                    size={16}
                    strokeWidth={3}
                    color="#559955"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(rowIndex)}
                  />
                ),
                ({ rowIndex }) => (
                  <Trash2
                    key={`delete-${rowIndex}`}
                    size={16}
                    strokeWidth={3}
                    color="#ff0022"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(rowIndex)}
                  />
                ),
              ]}
              type="special"
            />
          </section>
        </>
      :
          <ReportExpenseForm onClose={handleOnClose} data={selectedExpense} type={type}/>
      }

      {/* Confirmation PopUp */}
      <ConfirmationPopUp
        isOpen={confirmOpen}
        title="Delete Expense Entry"
        message={
          <>
            Are you sure you want to delete this expense entry for <b>{expenseList[deleteIndex]?.restaurant}</b>?<br />This action cannot be undone.
          </>
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        type="negative"
      />
    </div>
  );
};

export default Expense;