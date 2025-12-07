import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CircleCheck , Trash2 } from "lucide-react";
import {
  FiSearch,
  FiFilter,
} from "react-icons/fi";

// import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import PopUp from "./PopUp";
import mockData from './mockData.json'

// Table headings
const HeadingData={
  th:[{
      title: "Restaurant ID",
    }, {
      title: "Restaurant Name",
    }, {
      title: "Email",
    }, {
      title: "Contact",
    }, {
      title: "Locations",
    }, {
      title: "Status",
    }, {
      title:"Update Time",
    }, {
      title:"Action",
  }],
}

const OnBoarding = () => {
  const [popup, setPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  // Processed data memoized for performance
  const [userList, setUserList] = useState(() =>mockData);


// Corrected delete logic
const handleDelete = useCallback((index) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (confirmDelete) {
    const updated = [...userList];
    updated.splice(index, 1);
    setUserList(updated);
  }
}, [userList]);

  // Handle delete click (currently same logic as edit, you can replace it later)
  // const handleDelete = useCallback((index) => {
  //   console.log("Delete clicked for index:", index);
  //   alert("Delete  Clicked")
  //   // Add delete logic here in production
  // }, []);

  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 max-md:p-3 pb-[120px] overflow-scroll">
      {/* Header */}
      <section className="flex flex-col justify-between w-full gap-4 py-2">
        <div className="flex justify-between w-full max-sm:flex-col max-sm:items-start max-sm:gap-3">
          <h1 className="text-3xl font-bold text-[var(--primary-black)]">Restaurant Onboarded</h1>
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
      <section className="py-4 w-full h-fit overflow-scroll flex justify-start max-md:px-1">
        <Table
          HeadingData={HeadingData}
          bodyData={userList}
          actionData={[
            ({ rowIndex }) => (
              <Trash2
                key={`delete-${rowIndex}`}
                size={17}
                strokeWidth={3}
                color="#ff0022"
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(rowIndex)}
              />
            ),
          ]}
        />
      </section>

      {/* Popup */}
      {popup && (
        <PopUp onClose={() => setPopup(false)} data={selectedUser} />
      )}
    </div>
  );
};

export default OnBoarding;