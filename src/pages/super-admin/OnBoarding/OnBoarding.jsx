import React, { useState, useCallback, useEffect, useMemo } from "react";
import { CircleCheck, Trash2 } from "lucide-react";
import { FiSearch, FiFilter } from "react-icons/fi";
import Table from "../../../components/Table";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp";
import toast from "react-hot-toast";

import { getAllPendingCompanies, } from "../../../services/modules/companyService";
import { onboardCompany, rejectCompany } from "../../../services/modules/onboardingService";

const HeadingData = {
  th: [
    { title: "Submission Date" },
    { title: "Name" },
    { title: "Email" },
    { title: "Phone Number" },
    { title: "Pref. Contact Method" },
    { title: "Restaurants' Count" },
    { title: "Action" },
  ],
};

const PendingOnboarding = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState(""); // "accept" or "delete"
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Fetch pending requests from API
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching pending companies...");
      const { data } = await getAllPendingCompanies();
      setCompanies(data || []);
      console.log(data)
    } catch (err) {
      toast.error("Failed to load pending companies");
      console.error("Error fetching pending:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Table body mapping
  const tableData = useMemo(
    () =>
      companies.map((company) => {
        // Format date as DD-MM-YYYY
        let formattedDate = "";
        if (company.createdAt) {
          const date = new Date(company.createdAt);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${day}-${month}-${year}`;
        }

        return [
          formattedDate, // Submission Date in DD-MM-YYYY format
          company.company_name, // Name
          company.company_email, // Email
          company.company_phone, // Phone Number
          company.preferred_contact_method || "N/A", // Pref Contact (not in API response)
          String(company.restaurants?.length || 0), // Restaurants Count
        ];
      }),
    [companies]
  );

  // Show confirmation popup
  const handleAccept = (index) => {
    setSelectedIndex(index);
    setConfirmType("accept");
    setConfirmOpen(true);
  };

  const handleDelete = (index) => {
    setSelectedIndex(index);
    setConfirmType("delete");
    setConfirmOpen(true);
  };

  // Confirm actions
  const confirmAction = async () => {
    if (selectedIndex === null) return;
    const company = companies[selectedIndex];
    if (!company) return;

    try {
      if (confirmType === "accept") {
        await toast.promise(
          onboardCompany(company.company_id),
          {
            loading: "Accepting request...",
            success: "Company onboarded successfully!",
            error: "Failed to accept request",
          }
        );
        await fetchCompanies(); // refresh after onboard
      } else {
        await toast.promise(
          rejectCompany(company.company_id),
          {
            loading: "Rejected request...",
            success: "Company Rejected successfully!",
            error: "Failed to Rejected request",
          }
        );
        await fetchCompanies(); // refresh after onboard
      }
    } catch (err) {
      console.error("Error in confirmAction:", err);
      toast.error("Action failed");
    } finally {
      setConfirmOpen(false);
      setSelectedIndex(null);
      setConfirmType("");
    }
  };

  const cancelAction = () => {
    setConfirmOpen(false);
    setSelectedIndex(null);
    setConfirmType("");
  };

  return (
    <div className="bg-[var(--background)] flex flex-col items-center p-5 max-md:p-3 pb-[120px] overflow-scroll">
      {/* Header */}
      <section className="flex flex-col justify-between w-full gap-4 py-2">
        <div className="flex justify-between items-center w-full max-sm:flex-col max-sm:gap-3">
          <h1 className="text-3xl font-bold">Restaurant Onboarding Requests</h1>
        </div>
        {/* Search Bar + Filter */}
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
        {loading ? (
          <div className="text-center text-gray-600 w-full py-10">Loading pending requests...</div>
        ) : companies.length === 0 ? (
          <div className="text-center text-gray-600 w-full py-10">No onboarding requests found.</div>
        ) : (
          <Table
            HeadingData={HeadingData}
            bodyData={tableData}
            actionData={[
              ({ rowIndex }) => (
                <CircleCheck
                  key={`accept-${rowIndex}`}
                  size={17}
                  strokeWidth={3}
                  color="#559955"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAccept(rowIndex)}
                />
              ),
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
            type="special"
          />
        )}
      </section>

      {/* Confirmation PopUp */}
      <ConfirmationPopUp
        isOpen={confirmOpen}
        title={
          confirmType === "accept"
            ? "Accept Onboarding Request"
            : "Delete Onboarding Request"
        }
        message={
          confirmType === "accept" ? (
            <>
              Are you sure you want to <b>Accept</b> the onboarding request for{" "}
              <b>{companies[selectedIndex]?.company_name}</b>?
            </>
          ) : (
            <>
              Are you sure you want to <b>Delete</b> the onboarding request for{" "}
              <b>{companies[selectedIndex]?.company_name}</b>?
            </>
          )
        }
        onConfirm={confirmAction}
        onCancel={cancelAction}
        confirmText={confirmType === "accept" ? "Yes, Accept" : "Yes, Delete"}
        cancelText="No, Cancel"
        type={confirmType === "accept" ? "positive" : "negative"}
      />
    </div>
  );
};

export default PendingOnboarding;
