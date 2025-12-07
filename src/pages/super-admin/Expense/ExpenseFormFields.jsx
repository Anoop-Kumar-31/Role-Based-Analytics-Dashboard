import { FiChevronDown } from "react-icons/fi";
export const RestaurantField = ({
  value,
  onChange,
  onClick,
  dropdownOpen,
  filteredRestaurants,
  onSelect,
  dropdownRef,
  type,
}) => (
  <div className="relative" ref={dropdownRef}>
    <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
      What restaurant is this expense for? <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="restaurant"
      autoComplete="off"
      value={value}
      onChange={onChange}
      onClick={onClick}
      placeholder="Enter restaurant name"
      required
      readOnly={type === "edit"}
      className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm focus:ring-2 focus:ring-blue-400"
    />
    {dropdownOpen && (
      <ul className="absolute z-10 bg-white w-full border border-t-0 border-gray-300 max-h-48 overflow-y-auto rounded-b-md shadow-md text-sm">
        {filteredRestaurants.length === 0 ? (
          <li className="px-4 py-2 text-gray-500">No match found</li>
        ) : (
          filteredRestaurants.map((option, index) => (
            <li
              key={index}
              onClick={() => onSelect(option,index)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {option}
            </li>
          ))
        )}
      </ul>
    )}
  </div>
);

export const EmailField = ({ value, onChange, type }) => (
  <div>
    <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
      Email <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      required
      readOnly
      placeholder= {`${value ? value : "Enter email address"}`}
      className="w-full border border-gray-300 rounded-md px-4 py-4 text-sm"
    />
  </div>
);

export const DateField = ({ value, onChange, type }) => (
  <div className="relative">
    <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
      What date did the restaurant incur the expense? <span className="text-red-500">*</span>
    </label>
    <input
      type="date"
      name="expense_date"
      value={value}
      onChange={onChange}
      required
      readOnly={type === "edit"}
      className="w-full border border-gray-300 rounded-md px-4 text-gray-500 py-4 text-sm cursor-pointer"
    />
  </div>
);

export const TypeField = ({ value, onChange, type }) => (
  <div className="flex flex-col">
    <label className="block text-md font-semibold text-[var(--main-blue)] mb-2">
      Are you reporting an invoice, salary, a one-time expense, or something else?
      <span className="text-red-500"> *</span>
    </label>
    <div className="relative">
      <select
        name="type"
        value={value}
        onChange={onChange}
        required
        className={`w-full border border-gray-300 rounded-md px-4 py-4 text-sm pr-10 appearance-none bg-white outline-none ${
          value === "" ? "text-gray-400" : "text-black"
        }`}
      >
        <option value="">Please select</option>
        <option value="Salary">Salary</option>
        <option value="Invoice">Invoice</option>
        <option value="One-Time Expense">One-Time Expense</option>
        <option value="Other">Other</option>
        {/* don't chanage the value at any cost*/}
      </select>
      <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-black">
        <FiChevronDown size={24} />
      </div>
    </div>
  </div>
);