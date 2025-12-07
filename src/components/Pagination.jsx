import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";
import { useEffect } from "react";

const Pagination = ({ currentPage,setCurrentPage,restaurants, totalPages, onPageChange, setMaxRows, maxRows }) => {
  // Generate pagination numbers (with ellipsis if needed)
  const getPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    // Remove consecutive duplicates (for safety)
    return pages.filter((v, i, a) => i === 0 || v !== a[i - 1]);
  };
 
  useEffect(() => {
    if (restaurants && Array.isArray(restaurants)) {
      const newTotalPages = Math.ceil(restaurants.length / maxRows);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    }
  }, [maxRows, restaurants]);

  return (
    <div className="pagination-wrapper">
      <section className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {getPagination().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}-${idx}`}
              className={`pagination-btn${
                currentPage === page ? " active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </section>
      <div className="pagination-rows-count">
        <span className="pagination-rows-label">
          Rows Count:
        </span>
        <input
          type="number"
          value={maxRows}
          min={1}
          onChange={(e) => setMaxRows(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  setMaxRows: PropTypes.func,
  maxRows: PropTypes.number,
};

export default Pagination;
