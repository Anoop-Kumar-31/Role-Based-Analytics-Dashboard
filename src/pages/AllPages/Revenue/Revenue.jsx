import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiRefreshCw,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
// import Pagination from "../../../components/Pagination";
import ReportRevenueForm from "./ReportRevenueForm";

const Revenue = ({ setActivePage }) => {
  const [showForm, setShowForm] = useState(false);

  const data = Array.from({ length: 12 }, (_, index) => ({
    submissionDate: "2025-04-06",
    restaurant: "The Stables Kitchen & Beer Garden",
    email: `davidb@takeflightrg.com`,
    beginningDate: "04/05/2025",
    endingDate: "04/05/2025",
    revenuePeriod: "980",
    fohLabor: "",
    bohLabor: "",
    otherLabor: "",
    foodSales: "",
    beerSales: "",
    liquorSales: "",
    wineSales: "",
    naBeverageSales: "",
    otherSales: "",
    totalGuests: "",
  }));

  // If form is showing, show only the form outside the white box
  if (showForm) return <ReportRevenueForm setShowForm={setShowForm} />;

  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 w-full">
      {/* White box only when form is NOT showing */}
      <div className="w-full bg-white shadow rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Revenue</h1>
          <button
            className="bg-[#3c78f0] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#3f4f74]"
            onClick={() => setActivePage("ReportRevenueForm")}
          >
            Report Revenue
          </button>
        </div>

        {/* Search + Filter */}
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

        {/* Table with Horizontal Scroll */}
        <div className="relative overflow-x-auto">
          <table className="min-w-[1800px] text-sm text-left border rounded-lg table-fixed border-l-1">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 w-[200px] whitespace-nowrap sticky left-0 bg-gray-100 z-20 border-r border-gray-300 shadow-md">
                  Submission Date
                </th>
                <th className="px-4 py-3 whitespace-nowrap">What restaurant</th>
                <th className="px-4 py-3 whitespace-nowrap">Email</th>
                <th className="px-4 py-3 whitespace-nowrap">Beginning Date</th>
                <th className="px-4 py-3 whitespace-nowrap">Ending Date</th>
                <th className="px-4 py-3 whitespace-nowrap">
                  Revenue for period
                </th>
                <th className="px-4 py-3 whitespace-nowrap">FOH labor</th>
                <th className="px-4 py-3 whitespace-nowrap">BOH labor</th>
                <th className="px-4 py-3 whitespace-nowrap">Other labor</th>
                <th className="px-4 py-3 whitespace-nowrap">Food sales</th>
                <th className="px-4 py-3 whitespace-nowrap">Beer sales</th>
                <th className="px-4 py-3 whitespace-nowrap">Liquor sales</th>
                <th className="px-4 py-3 whitespace-nowrap">Wine sales</th>
                <th className="px-4 py-3 whitespace-nowrap">NA Bev sales</th>
                <th className="px-4 py-3 whitespace-nowrap">Other sales</th>
                <th className="px-4 py-3 whitespace-nowrap">Total guests</th>
                <th className="px-4 py-3 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-5 w-[200px] whitespace-nowrap sticky left-0 bg-white z-10 border-r border-gray-200 shadow-md">
                    {row.submissionDate}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.restaurant}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">{row.email}</td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.beginningDate}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.endingDate}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.revenuePeriod}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.fohLabor}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.bohLabor}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.otherLabor}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.foodSales}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.beerSales}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.liquorSales}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.wineSales}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.naBeverageSales}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.otherSales}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {row.totalGuests}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap flex gap-3 text-lg">
                    <FiEdit className="text-green-600 hover:scale-110 cursor-pointer" />
                    <FiTrash2 className="text-red-600 hover:scale-110 cursor-pointer" />
                    <FiRefreshCw className="text-blue-600 hover:scale-110 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
