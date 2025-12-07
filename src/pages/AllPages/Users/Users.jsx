import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Pencil, Trash2, KeyRound  } from "lucide-react";

import { FaPlus } from "react-icons/fa";
// import Pagination from "../../components/Pagination";
import Table from "../../../components/Table";
import PopUp from "./PopUp";
import mockData from './mockData.json'
import PasswordPopUp from "./PasswordPopUp";

// Table headings
const HeadingData={
  th:[
    {
      title: "User Name",
    },
    {
      title: "Phone Number",
    }, {
      title: "Email",
    }, {
      title: "Status",
    },
    {
      title: "Update on",
    },
    {
      title:"Actions",
  }],
}

const Users = () => {
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [popup, setPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});

  // Processed data memoized for performance
  const [userList, setUserList] = useState(() =>
    mockData.map(({ fname, lname, restaurant, ...rest }) => ({
      fullName: `${fname} ${lname}`,
      ...rest,
    }))
  );

  // Handle edit click
  const handleEdit = useCallback((index) => {
    setEditIndex(index);
    setSelectedUser(userList[index]);
    setPopup(true);
  }, [userList]);

  const handlePassword = useCallback((index) => {
    setEditIndex(index);
    setSelectedUser(userList[index]);
    setPasswordPopup(true);
  }, [userList]);

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
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 w-full max-md:p-3">
      {/* Header */}
      <section className="flex flex-col justify-between items-center w-full gap-4 py-2">
        <div className="flex justify-between items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-3">
          <h1 className="text-3xl font-bold text-[var(--primary-black)]">All Users</h1>
          <button
            className="button px-5 py-2 rounded-lg bg-[var(--primary-blue)] text-white hover:brightness-90 flex
            font-semibold
            items-center
            "
            onClick={() => setPopup(true)}
          >
            <FaPlus size={20}/> &nbsp;
            Add User
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="py-6 w-full h-fit overflow-y-scroll flex justify-start max-md:px-1">
        <Table
          HeadingData={HeadingData}
          bodyData={userList}
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
            ),({ rowIndex }) => (
              <KeyRound
                key={`edit-${rowIndex}`}
                size={16}
                strokeWidth={3}
                color="#000000"
                style={{ cursor: "pointer" }}
                onClick={() => handlePassword(rowIndex)}
                label="Change Password"
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
        />
      </section>

      {/* Popup */}
      {popup && (
        <PopUp onClose={() => setPopup(false)} data={selectedUser} />
      )}
      {passwordPopup && (
        <PasswordPopUp onClose={() => setPasswordPopup(false)} data={selectedUser} />
      )}
    </div>
  );
};

export default Users;