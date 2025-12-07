import React, { useState, useCallback } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { Pencil, Trash2 } from "lucide-react";

import mockData from "./mockData.json";

import { toast} from "react-toastify";
import Table from "../../../components/Table";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp";
import ReportRevenueForm from "./ReportRevenueForm"; // Modal for add/edit revenue

// Table headings
const HeadingData = {
  th: [
    { title: "Submission Date" },
    { title: "Restaurant" },
    { title: "Email" },
    { title: "Beginning Date" },
    { title: "Ending Date" },
    { title: "Revenue for period" },
    { title: "FOH labor" },
    { title: "BOH labor" },
    { title: "Other labor" },
    { title: "Food sales" },
    { title: "Beer sales" },
    { title: "Liquor sales" },
    { title: "Wine sales" },
    { title: "NA Bev sales" },
    { title: "Other sales" },
    { title: "Total guests" },
    { title: "Action" },
  ],
};

const Revenue = () => {
  const [popup, setPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRevenue, setSelectedRevenue] = useState({});
  const [revenueList, setRevenueList] = useState(mockData);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Handle add/edit
  const handleEdit = useCallback((index) => {
    setEditIndex(index);
    setSelectedRevenue(revenueList[index]);
    setPopup(true);
  }, [revenueList]);

  // Handle popup close and submit
  const handleOnClose = useCallback((res, data) => {
    setPopup(false);
    if (res && data) {
      let updatedList = [...revenueList];
      if (editIndex !== null) {
        updatedList[editIndex] = data;
        toast.success("Revenue entry updated successfully!", { position: "top-center", autoClose: 2000 });
      } else {
        updatedList.push(data);
        toast.success("Revenue entry added successfully!", { position: "top-center", autoClose: 2000 });
      }
      setRevenueList(updatedList);
    }
    setEditIndex(null);
    setSelectedRevenue({});
  }, [revenueList, editIndex]);

  // Handle delete
  const handleDelete = useCallback((index) => {
    setDeleteIndex(index);
    setConfirmOpen(true);
  }, []);

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updated = [...revenueList];
      updated.splice(deleteIndex, 1);
      setRevenueList(updated);
      toast.success("Revenue entry deleted successfully!", { position: "top-center", autoClose: 2000 });
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

      {popup ? (
        <ReportRevenueForm
          onClose={handleOnClose}
          data={selectedRevenue}
        />
      ):
      (
        <>
          {/* Header */}
          <section className="flex flex-col justify-between w-full gap-4 py-2">
            <div className="flex justify-between items-center w-full flex-wrap gap-4">
              <h1 className="text-3xl font-bold text-[var(--primary-black)]">Revenue</h1>
              <button
                className="button px-5 py-2 rounded-lg bg-[var(--primary-blue)] text-white hover:brightness-95 flex font-semibold items-center hover:shadow-md/30"
                onClick={() => {
                  setEditIndex(null);
                  setSelectedRevenue({});
                  setPopup(true);
                }}
              >
                Report Revenue
              </button>
            </div>
            {/* Search Bar and Filter */}
            <div className="flex flex-wrap justify-between items-center mb-4">
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
            </div>
          </section>

          {/* Table */}
          <section className="py-6 w-full h-fit overflow-x-auto flex justify-start max-md:px-1">
            <Table
              HeadingData={HeadingData}
              bodyData={revenueList}
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
      )}

      {/* Confirmation PopUp */}
      <ConfirmationPopUp
        isOpen={confirmOpen}
        title="Delete Revenue Entry"
        message={
          <>
            Are you sure you want to delete this revenue entry for <b>{revenueList[deleteIndex]?.restaurant}</b>?<br />This action cannot be undone.
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

export default Revenue;
