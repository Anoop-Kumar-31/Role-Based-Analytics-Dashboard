import React, { useState, useRef, useEffect, useCallback } from "react";
// import "./RestaurantDropdown.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const MAX_DISPLAY = 2;

const RestaurantDropdown = ({ options, selected, setSelected, onSubmit }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const handleCheckboxChange = useCallback(
    (option) => {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    },
    [setSelected]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSelectedText = () => {
    if (selected.length === 0) {
      return <span className="dropdown-placeholder">Select Restaurants</span>;
    }
    if (selected.length > MAX_DISPLAY) {
      return (
        <span title={selected.join(", ")}>
          {selected.slice(0, MAX_DISPLAY).join(", ")}, ... ({selected.length})
        </span>
      );
    }
    return selected.join(", ");
  };

  return (
    <div
      className="flex w-full mx-auto text-[var(--text-primary)] h-fit gap-3 relative max-md:flex-col"
      ref={dropdownRef}
    >
      <div
        className="border border-[var(--border)] rounded-xl px-4 py-2.5 cursor-pointer bg-white w-full flex items-center justify-between shadow-card select-none text-ellipsis relative max-md:w-full transition-all duration-200 hover:border-[var(--primary-accent)] focus-within:ring-2 focus-within:ring-[var(--primary-accent)]/20"
        type="button"
        onClick={handleDropdownClick}
        aria-haspopup="listbox"
        aria-expanded={showDropdown}
      >
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap w-[90%] text-sm">
          {renderSelectedText()}
        </span>
        <ChevronDown size={18} className={`transition-transform duration-200 text-[var(--text-tertiary)] ${showDropdown ? 'rotate-180' : ''}`} />
      </div>
      {showDropdown && (
        <div
          className="absolute flex flex-col translate-y-[45px] left-0 w-[calc(100%-120px)] border border-[var(--border)] rounded-xl bg-white shadow-elevated py-2 max-h-[clamp(200px,40vh,400px)] overflow-y-auto max-md:w-full animate-slideDown z-20"
          role="listbox"
        >
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3.5 py-2 cursor-pointer transition-colors duration-150 hover:bg-[var(--filler)] text-sm"
              role="option"
              aria-selected={selected.includes(option)}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mr-2.5 accent-[var(--primary-accent)] w-4 h-4"
              />
              <span className="text-sm text-[var(--text-primary)]">{option}</span>
            </label>
          ))}
        </div>
      )}
      <button
        className="bg-[var(--primary-accent)] text-white border-none px-6 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 w-[115px] font-medium text-sm transition-all duration-200 hover:bg-[var(--primary-accent-hover)] hover:shadow-md py-2.5 max-md:w-full disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        onClick={onSubmit}
        disabled={selected.length === 0}
      >
        Submit
      </button>
    </div>
  );
};

RestaurantDropdown.defaultProps = {
  onSubmit: () => { },
};

export default RestaurantDropdown;