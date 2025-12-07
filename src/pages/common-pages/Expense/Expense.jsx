import React, { useState, useCallback } from "react";
import { FiSearch, FiFilter, FiRefreshCw, FiDownload } from "react-icons/fi";
import { Pencil, Trash2 } from "lucide-react";
import mockData from "./mockData.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../../components/Table";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp";
import ReportExpenseForm from "./ReportExpenseForm";

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

  // Handle add/edit
  const handleEdit = useCallback((index) => {
    setEditIndex(index);
    setSelectedExpense(expenseList[index]);
    setPopup(true);
  }, [expenseList]);

  // Handle popup close and submit
  const handleOnClose = useCallback((res, data) => {
    setPopup(false);
    if (res && data) {
      let updatedList = [...expenseList];
      if (editIndex !== null) {
        updatedList[editIndex] = data;
        toast.success("Expense entry updated successfully!", { position: "top-center", autoClose: 2000 });
      } else {
        updatedList.push(data);
        toast.success("Expense entry added successfully!", { position: "top-center", autoClose: 2000 });
      }
      setExpenseList(updatedList);
    }
    setEditIndex(null);
    setSelectedExpense({});
  }, [expenseList, editIndex]);

  // Handle delete
  const handleDelete = useCallback((index) => {
    setDeleteIndex(index);
    setConfirmOpen(true);
  }, []);

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updated = [...expenseList];
      updated.splice(deleteIndex, 1);
      setExpenseList(updated);
      toast.success("Expense entry deleted successfully!", { position: "top-center", autoClose: 2000 });
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
      <ToastContainer />
      {!popup ?
        <>
          {/* Header */}
          <section className="flex justify-between w-full gap-4 py-2 mb-2">
            <h1 className="text-3xl font-bold text-[var(--primary-black)]">Expense</h1>
            <button
              className="bg-[var(--primary-blue)] text-white  px-4 py-2 rounded-lg font-semibold hover:brightness-95 hover:shadow-md/30"
              onClick={() => {
                setEditIndex(null);
                setSelectedExpense({});
                setPopup(true);
              }}
            >
              Report an Expense
            </button>
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
              <button className="bg-[#058877] text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:bg-[#047c6e] hover:shadow-md/30">
                <FiDownload className="mr-2" />
                Download CSV
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
          <ReportExpenseForm onClose={handleOnClose} data={selectedExpense} />
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