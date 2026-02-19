import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Trash2, Eye } from "lucide-react";
import { FiSearch, FiFilter } from "react-icons/fi";
import Table from "../../../components/Table";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp";
import toast from "react-hot-toast";
import { getAllOnboardedCompanies, toggleCompanyStatus } from '../../../services/modules/companyService';
import Locations from "./Locations/Locations";

const HeadingData = {
  th: [
    { title: "Restaurant ID" },
    { title: "Restaurant Name" },
    { title: "Email" },
    { title: "Contact" },
    { title: "Locations" },
    { title: "Status" },
    { title: "Update Time" },
    { title: "Action" },
  ]
};

const OnBoarded = () => {
  const [showLocations, setShowLocation] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getAllOnboardedCompanies();
      console.log(data)
      setCompanies(data || []);
    } catch {
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCompanies(); }, [fetchCompanies]);

  const tableData = useMemo(() => companies.map(company => [
    company.company_id,
    company.company_name,
    company.company_email,
    company.company_phone || "--",
    <button
      onClick={() => { setShowLocation(true); setSelectedCompany(company); }}
      className="font-semibold text-green-700 flex items-center cursor-pointer"
    >
      View <Eye size={15} className="ml-1" />
    </button>,
    company.is_active ? "Active" : "Inactive",
    company.updatedAt ? new Date(company.updatedAt).toLocaleString() : '--',
  ]), [companies]);

  const handleDelete = useCallback((index) => {
    setDeleteIndex(index);
    setConfirmOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (deleteIndex === null) return;
    const company = companies[deleteIndex];
    if (!company) return;

    try {
      await toast.promise(
        toggleCompanyStatus(company.company_id),
        { loading: 'Updating status...', success: 'Status updated!', error: 'Failed to update' }
      );
      await fetchCompanies();
    } finally {
      setConfirmOpen(false);
      setDeleteIndex(null);
    }
  }, [companies, deleteIndex, fetchCompanies]);

  if (showLocations) return <Locations company_id={selectedCompany?.company_id} />;

  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 max-md:p-3 pb-[120px] overflow-auto">
      {/* Header */}
      <section className="flex flex-col justify-between w-full gap-4 py-2">
        <div className="flex justify-between w-full max-sm:flex-col max-sm:items-start max-sm:gap-3">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Restaurant Onboarded</h1>
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
      {loading ? (
        <div className="text-center py-10 text-[var(--text-secondary)]">Loading companies...</div>
      ) : companies.length === 0 ? (
        <div className="text-center py-10 text-[var(--text-secondary)]">No onboarded companies found.</div>
      ) : (
        <Table
          HeadingData={HeadingData}
          bodyData={tableData}
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
      )}

      <ConfirmationPopUp
        isOpen={confirmOpen}
        title="Delete Restaurant"
        message={
          <>Are you sure you want to delete <b>{companies[deleteIndex]?.company_name}</b>?</>
        }
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
      />
    </div>
  );
};

export default OnBoarded;
