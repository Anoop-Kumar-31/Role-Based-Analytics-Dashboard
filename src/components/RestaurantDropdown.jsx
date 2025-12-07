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
      className="flex w-full mx-auto text-[var(--primary-black)] h-fit gap-[15px] relative max-md:flex-col"
      ref={dropdownRef}
    >
      <div
        className="border border-[#ccc] rounded-[10px] px-[15px] pl-[25px] py-2 cursor-pointer bg-white w-full flex items-center justify-between shadow-[0_2px_3px_#00000033] select-none text-ellipsis relative max-md:w-full"
        type="button"
        onClick={handleDropdownClick}
        aria-haspopup="listbox"
        aria-expanded={showDropdown}
      >
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap w-[90%]">
          {renderSelectedText()}
        </span>
        {showDropdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {showDropdown && (
        <div
          className="absolute flex flex-col translate-y-[45px] left-0 w-[calc(100%-120px)] border border-[#ccc] rounded-[10px] bg-white shadow-[0_1px_2px_#00000033] py-2 max-h-[clamp(200px,40vh,400px)] overflow-y-scroll max-md:w-full"
          role="listbox"
        >
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-1 cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]"
              role="option"
              aria-selected={selected.includes(option)}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mr-2"
              />
              <span className="text-base">{option}</span>
            </label>
          ))}
        </div>
      )}
      <button
        className="bg-[var(--primary-blue)] text-white border-none px-[25px] rounded-[10px] cursor-pointer flex items-center justify-center gap-[5px] w-[115px] font-medium text-[medium] transition hover:brightness-90 p-2 max-md:w-full"
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
  onSubmit: () => {},
};

export default RestaurantDropdown;