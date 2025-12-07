import React, { useState, useEffect, useRef, useCallback } from "react";
import { Pencil, CircleMinus, KeyRound, CircleCheck } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import Table from "../../../components/Table";
import PopUp from "./PopUp";
import PasswordPopUp from "./PasswordPopUp";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp";
import { getAllUsers, deleteUser, updateUser } from "../../../services/modules/userService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

// Table headings configuration
const HeadingData = {
  th: [
    { title: "Name" },
    { title: "Company Name" },
    { title: "Phone Number" },
    { title: "Email" },
    { title: "User Role" },
    { title: "Status" },
    { title: "Actions" },
  ],
};

const Users = () => {
  // State variables
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [statusIndex, setStatusIndex] = useState(null);
  const [formType, setFormType] = useState("");

  const hasFetched = useRef(false);
  const [confirmType, setConfirmType] = useState(null);

  // Get logged-in user (if needed, currently unused)
  const currentUser = useSelector((state) => state.auth.user);

  // Fetch users on mount (once)
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUsers = async () => {
      setIsLoading(true);
      setApiError(false);
      try {
        const response = await toast.promise(
          getAllUsers(),
          {
            loading: "Loading users data...",
            success: "Users fetched successfully!",
            error: "Failed to fetch users.",
          },
          { success: { duration: 2000 }, error: { duration: 2000 } }
        );
        // console.log(response)
        if (response && response.data) {
          const mappedUsers = response.data.map(
            ({
              user_id,
              user_first_name,
              user_last_name,
              company_name,
              restaurant_name,
              user_phone_no,
              user_email,
              role_name,
              is_active,
            }) => ({
              user_id,
              fullName: `${user_first_name} ${user_last_name}`,
              company: company_name,
              restaurant: restaurant_name,
              user_phone_no,
              user_email,
              role: role_name,
              status: is_active ? "Enabled" : "Disabled",
            })
          );
          setUserList(mappedUsers);
          setApiError(false);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setApiError(true);
        toast.error("Failed to fetch users.", { position: "top-center" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handlers

  const openEditPopup = useCallback(
    (index) => {
      if (index >= 0 && index < userList.length) {
        setEditIndex(index);
        setSelectedUser(userList[index]);
        setFormType("edit");
        setPopupVisible(true);
      }
    },
    [userList]
  );

  const openCreatePopup = useCallback(() => {
    setSelectedUser(null);
    setFormType("create");
    setPopupVisible(true);
  }, []);

  const closePopup = useCallback(
    (updated) => {
      setPopupVisible(false);
      setSelectedUser(null);
      setEditIndex(null);
      setFormType("");
      if (updated) {
        // Refresh the list after update/add
        refetchUsers();
      }
    },
    []
  );

  const openPasswordPopup = useCallback(
    (index) => {
      if (index >= 0 && index < userList.length) {
        setEditIndex(index);
        setSelectedUser(userList[index]);
        setPasswordPopupVisible(true);
      }
    },
    [userList]
  );

  const closePasswordPopup = useCallback(() => {
    setPasswordPopupVisible(false);
    setSelectedUser(null);
  }, []);

  const openStatusConfirmation = useCallback(
    (index, type) => {
      if (index >= 0 && index < userList.length) {
        setStatusIndex(index);
        setSelectedUser(userList[index]);
        setConfirmType(type);
        setConfirmOpen(true);
      }
    },
    [userList]
  );

  const cancelStatusChange = () => {
    setConfirmOpen(false);
    setStatusIndex(null);
    setSelectedUser(null);
  };

  // Refetch users - extracted for reuse
  const refetchUsers = useCallback(async () => {
    setIsLoading(true);
    setApiError(false);
    try {
      const response = await getAllUsers();
      if (response && response.data) {
        const mappedUsers = response.data.map(
          ({
            user_id,
            user_first_name,
            user_last_name,
            company_name,
            restaurant_name,
            user_phone_no,
            user_email,
            role_name,
            is_active,
          }) => ({
            user_id,
            fullName: `${user_first_name} ${user_last_name}`,
            company: company_name,
            restaurant: restaurant_name,
            user_phone_no,
            user_email,
            role: role_name,
            status: is_active ? "Enabled" : "Disabled",
          })
        );
        setUserList(mappedUsers);
        setApiError(false);
      } else {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error("Error refetching users:", error);
      setApiError(true);
      toast.error("Failed to refetch users.", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const confirmStatusChange = useCallback(async () => {
  if (!selectedUser?.user_id) {
    toast.error("No user selected for status change.", { position: "top-center" });
    setConfirmOpen(false);
    setStatusIndex(null);
    setSelectedUser(null);
    return;
  }

  try {
    if (confirmType === "delete") {
      await toast.promise(
        deleteUser(selectedUser.user_id),
        {
          loading: "Deleting user...",
          success: "User deleted successfully!",
          error: "Failed to delete user.",
        }
      );
    } else if (confirmType === "reassign") {
      await toast.promise(
        updateUser(selectedUser.user_id, { is_active: true }),
        {
          loading: "Re-enabling user...",
          success: "User re-enabled successfully!",
          error: "Failed to re-enable user.",
        }
      );
    } else {
      toast.error("Unknown action type.", { position: "top-center" });
      return;
    }
    // After success
    setConfirmOpen(false);
    setStatusIndex(null);
    setSelectedUser(null);
    // Refresh user list
    refetchUsers();
  } catch (error) {
    console.error("Error changing user status:", error);
    toast.error("Failed to update user status.", { position: "top-center" });
  }
}, [selectedUser, confirmType, refetchUsers]);


  // Render helpers

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-600">Loading users...</div>
    );
  }

  if (apiError) {
    return (
      <div className="p-10 text-center text-red-600">
        Failed to load users. Please try again later.
      </div>
    );
  }

  if (userList.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">No users found.</div>
    );
  }

  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 w-full max-md:p-3">
      {/* Header */}
      <section className="flex flex-col justify-between items-center w-full gap-4 py-2">
        <div className="flex justify-between items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-3">
          <h1 className="text-3xl font-bold text-[var(--primary-black)]">All Users</h1>
          <button
            className="button px-5 py-2 rounded-lg bg-[var(--primary-blue)] text-white hover:brightness-90 flex font-semibold items-center"
            onClick={openCreatePopup}
            aria-label="Add User"
          >
            <FaPlus size={20} /> &nbsp; Add User
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="py-6 w-full h-fit overflow-y-scroll flex justify-start max-md:px-1">
        <Table
          HeadingData={HeadingData}
          bodyData={userList.map(({ user_id, restaurant, ...rest }) => rest)}
          actionData={[
            ({ rowIndex }) => (
              <Pencil
                key={`edit-${rowIndex}`}
                size={16}
                strokeWidth={3}
                color="#559955"
                style={{ cursor: "pointer" }}
                onClick={() => openEditPopup(rowIndex)}
                label="Edit User"
              />
            ),
            ({ rowIndex }) => (
              <KeyRound
                key={`password-${rowIndex}`}
                size={16}
                strokeWidth={3}
                color="#000000"
                style={{ cursor: "pointer" }}
                onClick={() => openPasswordPopup(rowIndex)}
                label="Change Password"
              />
            ),
            ({ rowIndex, status = "Enabled" }) =>
              status === "Enabled" ? (
                <CircleMinus
                  key={`disable-${rowIndex}`}
                  size={16}
                  strokeWidth={3}
                  color="#ff0022"
                  style={{ cursor: "pointer" }}
                  onClick={() => openStatusConfirmation(rowIndex, "delete")}
                  title="Disable User"
                />
              ) : (
                <CircleCheck
                  key={`enable-${rowIndex}`}
                  size={16}
                  strokeWidth={3}
                  color="#559955"
                  style={{ cursor: "pointer" }}
                  onClick={() => openStatusConfirmation(rowIndex, "reassign")}
                  title="Enable User"
                />
              ),
          ]}
        />
      </section>

      {/* PopUps */}
      {popupVisible && (
        <PopUp onClose={closePopup} data={selectedUser} formType={formType} />
      )}

      {passwordPopupVisible && (
        <PasswordPopUp onClose={closePasswordPopup} data={selectedUser} />
      )}

      {/* Confirmation PopUp */}
      <ConfirmationPopUp
        isOpen={confirmOpen}
        title={
          userList[statusIndex]?.status === "Enabled"
            ? "Disable User"
            : "Enable User"
        }
        message={
          <>
            Are you sure you want to{" "}
            <b>
              {userList[statusIndex]?.status === "Enabled"
                ? "Disable"
                : "Enable"}
            </b>{" "}
            this user <b>{userList[statusIndex]?.fullName || "this user"}</b>?
          </>
        }
        onConfirm={confirmStatusChange}
        onCancel={cancelStatusChange}
        confirmText={
          userList[statusIndex]?.status === "Enabled" ? "Disable" : "Enable"
        }
        cancelText="Cancel"
        type={
          userList[statusIndex]?.status === "Enabled" ? "negative" : "positive"
        }
      />
    </div>
  );
};

export default Users;
