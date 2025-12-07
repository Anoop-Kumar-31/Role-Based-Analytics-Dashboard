import React, { useState } from "react";
import {
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiEdit,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";
import ReportExpenseForm from "./ReportExpenseForm";

const Expense = ({ setActivePage }) => {
  const [showForm, setShowForm] = useState(false);

  const data = Array.from({ length: 14 }, (_, index) => ({
    timestamp: "2025-06-02",
    restaurant:
      index % 2 === 0
        ? "Bloom Southern Kitchen"
        : "The Stables Kitchen & Beer Garden",
    email: `user${index + 1}@takeflightrg.com`,
    expenseDate: "06/01/2025",
    reportingType: "Invoice",
  }));

  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 w-full">
      <div className="w-full bg-white shadow rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2159d8] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.2),_-4px_4px_12px_rgba(0,0,0,0.2)]"
            onClick={() => setActivePage("ReportExpenseForm")}
          >
            Report an Expense
          </button>
        </div>

        {showForm ? (
          <ReportExpenseForm />
        ) : (
          <>
            {/* Search + Actions */}
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

              <div className="flex gap-3 flex-wrap mt-2 md:mt-0">
                <button className="bg-[#058877] text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:bg-[#047c6e] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.2),_-4px_4px_12px_rgba(0,0,0,0.2)]">
                  <FiDownload className="mr-2" />
                  Download CSV
                </button>
                <button className="bg-[#058877] text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:bg-[#047c6e] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.2),_-4px_4px_12px_rgba(0,0,0,0.2)]">
                  <FiRefreshCw className="mr-2" />
                  Sync All
                </button>
              </div>
            </div>

            {/* Table Section */}
            <section className="py-6 px-5 pb-[120px] w-full h-[80vh] overflow-y-auto flex justify-start">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                      <th className="px-4 py-3">Submission Date</th>
                      <th className="px-4 py-3">Restaurant</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Receipt Date</th>
                      <th className="px-4 py-3">Reporting As</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-5 font-semibold">
                          {row.timestamp}
                        </td>
                        <td className="px-4 py-5">{row.restaurant}</td>
                        <td className="px-4 py-5">{row.email}</td>
                        <td className="px-4 py-5">{row.expenseDate}</td>
                        <td className="px-4 py-5">{row.reportingType}</td>
                        <td className="px-4 py-5 flex gap-3 text-lg">
                          <FiEdit className="text-green-600 hover:scale-110 cursor-pointer" />
                          <FiTrash2 className="text-red-600 hover:scale-110 cursor-pointer" />
                          <FiRefreshCw className="text-blue-600 hover:scale-110 cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Expense;
