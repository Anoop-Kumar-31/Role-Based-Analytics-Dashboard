import React, { useState, useCallback, useEffect, useRef } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// Assuming these are correctly imported from your services/components
import Table from "../../../components/Table";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp";
import ReportRevenueForm from "./ReportRevenueForm"; // Modal for add/edit revenue
import { getAllRevenues, deleteRevenue } from "../../../services/modules/restaurantService";

// Table headings - kept as is
const HeadingData = {
  th: [
    { title: "Submission Date" },
    { title: "Restaurant Name" },
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
  // --- State Management ---
  const [isFormOpen, setIsFormOpen] = useState(false); // Renamed 'popup' for clarity
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRevenue, setSelectedRevenue] = useState({});
  const [revenueList, setRevenueList] = useState([]); // Mapped data for table display
  const [rawRevenueData, setRawRevenueData] = useState([]); // Raw data from API, useful for delete/edit
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Renamed 'confirmOpen'
  const [revenueToDeleteId, setRevenueToDeleteId] = useState(null); // Stores the ID of the revenue to delete
  const [formType, setFormType] = useState("edit");

  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [apiError, setApiError] = useState(false); // Renamed 'isApiError' for consistency

  // Used to trigger re-fetches without reloading the page
  const [shouldRefetch, setShouldRefetch] = useState(0); // Using a counter for reliability

  // Ref to prevent double-fetch in React StrictMode on initial mount
  const hasFetchedInitial = useRef(false);

  const userData = useSelector((state) => state.auth.user);

  // --- Data Fetching Effect ---
  useEffect(() => {
    // Prevent double-fetch in StrictMode during development
    if (hasFetchedInitial.current === false) {
      hasFetchedInitial.current = true;
      // Continue to fetch data
    } else if (shouldRefetch === 0) {
      // If shouldRefetch is 0, it means it's the very first render after initial StrictMode run,
      // or subsequent renders without a fetch trigger. We only want to fetch if `shouldRefetch` changes.
      return;
    }

    const fetchRevenues = async () => {
      setIsLoading(true); // Set loading true when fetch starts
      setApiError(false); // Clear previous errors

      try {
        console.log(userData.user_id)
        const response = await toast.promise(
          getAllRevenues([], userData.user_id),
          {
            loading: "Fetching revenues...",
            success: "Revenues fetched successfully!",
            error: "Failed to fetch revenues.",
          },
          { success: { duration: 3500 }, error: { duration: 2000 } }
        );

        if (!response || !response.data) {
          throw new Error("Invalid response data.");
        }
        console.log(response.data)

        setRawRevenueData(response.data); // Store raw data

        const mapped = response.data.map((rev) => ({
          submissionDate: new Date(rev.creation_time).toLocaleDateString(),
          restaurant_name: rev.restaurant?.restaurant_name, // Optional chaining for safety
          user_email: rev.user_email || rev.user?.email, // Optional chaining for safety
          beginning_date: rev.beginning_date,
          ending_date: rev.ending_date,
          total_amount: rev.total_amount,
          foh_labour: rev.foh_labour,
          boh_labour: rev.boh_labour,
          other_labour: rev.other_labour,
          food_sale: rev.food_sale,
          beer_sale: rev.beer_sale,
          liquor_sale: rev.liquor_sale,
          wine_sale: rev.wine_sale,
          beverage_sale: rev.beverage_sale,
          other_sale: rev.other_sale,
          total_guest: rev.total_guest,
        }));

        setRevenueList(mapped);
      } catch (err) {
        console.error("Revenue fetch error:", err.message);
        setApiError(true);
      } finally {
        setIsLoading(false); // Always set loading false when fetch finishes
      }
    };

    fetchRevenues();
  }, [shouldRefetch]); // Re-fetch when shouldRefetch changes

  // --- Handlers ---

  // Handle add/edit form open
  const handleReportRevenueClick = useCallback(() => {
    setEditIndex(null); // Clear edit index for new entry
    setSelectedRevenue({ user_email: userData.email, user_id: userData.id }); // Pre-fill with user data
    setFormType("create");
    setIsFormOpen(true);
  }, [userData]);

  // Handle edit action from table
  const handleEdit = useCallback((rowIndex) => {
    setEditIndex(rowIndex);
    const revenue = { ...revenueList[rowIndex], revenue_id: rawRevenueData[rowIndex].revenue_id }; // Clone revenue object
    setSelectedRevenue(revenue); // Use data for editing
    setFormType("edit");
    setIsFormOpen(true);
  }, [revenueList]); // Dependency on revenueList

  // Handle form close and re-fetch data
  const handleOnClose = useCallback(() => {
    setIsFormOpen(false);
    setEditIndex(null);
    setSelectedRevenue({});
    setShouldRefetch(prev => prev + 1); // Trigger re-fetch
  }, []);

  // Handle delete confirmation open
  const handleDelete = useCallback((rowIndex) => {
    setRevenueToDeleteId(rawRevenueData[rowIndex]?.revenue_id); // Store the ID to delete
    setIsConfirmOpen(true);
  }, [rawRevenueData]); // Dependency on rawRevenueData

  // Handle actual deletion
  const confirmDelete = useCallback(async () => {
    if (!revenueToDeleteId) return; // Should not happen if handleDelete works correctly

    try {
      await toast.promise(
        deleteRevenue(revenueToDeleteId),
        {
          loading: "Deleting revenue...",
          success: "Revenue deleted successfully!",
          error: "Failed to delete revenue.",
        },
        { success: { duration: 2000 }, error: { duration: 2000 } }
      );
      setIsConfirmOpen(false);
      setRevenueToDeleteId(null);
      setShouldRefetch(prev => prev + 1); // Trigger re-fetch
    } catch (err) {
      console.error("Delete error:", err.message);
      // Toast error is already handled by toast.promise
    }
  }, [revenueToDeleteId]); // Dependency on revenueToDeleteId

  // Handle delete cancellation
  const cancelDelete = useCallback(() => {
    setIsConfirmOpen(false);
    setRevenueToDeleteId(null);
  }, []);

  // --- Render Logic ---
  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 w-full">
      {isFormOpen && (
        <ReportRevenueForm
          onClose={handleOnClose}
          data={selectedRevenue}
          formType={formType}
        />
      )}

      {!isFormOpen && (
        <>
          {/* Header */}
          <section className="flex flex-col justify-between w-full gap-4 py-2">
            <div className="flex justify-between items-center w-full flex-wrap gap-4">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Revenue</h1>
              <button
                className="px-5 py-2.5 rounded-xl bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-accent-hover)] flex font-medium items-center text-sm transition-all duration-200 hover:shadow-md"
                onClick={handleReportRevenueClick}
              >
                Report Revenue
              </button>
            </div>
            {/* Search Bar and Filter */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <div className="flex items-center flex-grow max-w-md">
                <div className="flex items-center bg-white px-3 py-2.5 rounded-l-xl border border-[var(--border)] border-r-0 w-full">
                  <FiSearch className="text-[var(--text-tertiary)] mr-2" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none w-full text-sm text-[var(--text-primary)]"
                  />
                </div>
                <button className="flex items-center gap-1 px-3 py-2.5 bg-[var(--filler)] border border-[var(--border)] rounded-r-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors">
                  Filter
                  <FiFilter className="text-[var(--text-tertiary)]" />
                </button>
              </div>
            </div>
          </section>

          {/* Table Section */}
          <section className="py-6 w-full h-fit overflow-x-auto flex justify-start max-md:px-1">
            {apiError ? (
              <p className="text-red-600 text-center w-full">
                Failed to load revenue data. Please try again.
              </p>
            ) : isLoading ? (
              <p className="text-gray-600 text-center w-full">Loading revenues...</p>
            ) : revenueList.length === 0 ? (
              <p className="text-gray-600 text-center w-full">No revenue data available.</p>
            ) : (
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
            )}
          </section>
        </>
      )}

      {/* Confirmation PopUp */}
      <ConfirmationPopUp
        isOpen={isConfirmOpen}
        title="Delete Revenue Entry"
        message={
          <>
            Are you sure you want to delete this revenue entry?
            <br />This action cannot be undone.
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