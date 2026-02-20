import React, { useState, useEffect, useRef } from "react";
import {
    FiChevronDown,
    FiChevronUp,
    FiPlus,
    FiMinus,
} from "react-icons/fi";
import { getRestaurantsByCompanyId } from "../../../services/modules/restaurantService";
import toast from "react-hot-toast";

const InputField = ({ name, label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium mb-1 text-[var(--text-secondary)]">{label}</label>
        <input
            type="number"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
        />
    </div>
);

const BlueBookForm = ({
    initialData = {},
    onSubmit,
    onCancel,
    companyId,
    isEditMode = false,
    allRestaurants = [],
    setAllRestaurants
}) => {
    const [formData, setFormData] = useState({
        restaurant: "",
        email: "",
        date: "",
        weather: "",
        breakfastSales: 0,
        breakfastGuests: 0,
        lunchSales: 0,
        lunchGuests: 0,
        dinnerSales: 0,
        dinnerGuests: 0,
        totalSales: 0,
        totalSalesLastYear: 0,
        foodSales: 0,
        lbwSales: 0,
        hourlyLabor: 0,
        hourlyLaborPercent: 0,
        hoursWorked: 0,
        splh: 0,
        ...initialData,
    });

    const dynamicFields = [
        "Include salaried and managers with explanation",
        "86’d Items",
        "WINS!",
        "Misses",
        "Staff Notes",
        "Maintenance Issues",
        "Misc Notes",
    ];

    const [notesData, setNotesData] = useState(() => {
        // If edit mode and initialData provided, map back to notesData structure
        if (isEditMode && initialData) {
            return {
                "Include salaried and managers with explanation": (initialData.callOuts?.length > 0 ? initialData.callOuts.map(c => c.comment) : [""]),
                "86’d Items": (initialData.item86s?.length > 0 ? initialData.item86s.map(c => c.comment) : [""]),
                "WINS!": (initialData.wins?.length > 0 ? initialData.wins.map(c => c.comment) : [""]),
                "Misses": (initialData.misses?.length > 0 ? initialData.misses.map(c => c.comment) : [""]),
                "Staff Notes": (initialData.staffNotes?.length > 0 ? initialData.staffNotes.map(c => c.comment) : [""]),
                "Maintenance Issues": (initialData.maintenanceIssues?.length > 0 ? initialData.maintenanceIssues.map(c => c.comment) : [""]),
                "Misc Notes": (initialData.miscNotes?.length > 0 ? initialData.miscNotes.map(c => c.comment) : [""]),
            };
        }
        return dynamicFields.reduce((acc, field) => {
            acc[field] = [""];
            return acc;
        }, {});
    });

    const [restaurantOptions, setRestaurantOptions] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // If passed from parent, use it. Otherwise fetch (e.g. standalone usage)
        if (allRestaurants.length > 0) {
            const names = allRestaurants.map(r => r.restaurant_name);
            setRestaurantOptions(names);
            setFilteredRestaurants(names);
        } else if (companyId && setAllRestaurants) {
            const fetchRestaurants = async () => {
                try {
                    const response = await getRestaurantsByCompanyId(companyId);
                    if (response && Array.isArray(response.data)) {
                        setAllRestaurants(response.data);
                        const restaurantNames = response.data.map((r) => r.restaurant_name);
                        setRestaurantOptions(restaurantNames);
                        setFilteredRestaurants(restaurantNames);
                    }
                } catch (error) {
                    console.error("Failed to fetch restaurants:", error);
                    toast.error("Failed to load restaurant list.");
                }
            };
            fetchRestaurants();
        }
    }, [companyId, allRestaurants, setAllRestaurants]);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "restaurant") {
            setDropdownOpen(true);
            const filtered = restaurantOptions.filter((option) =>
                option.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredRestaurants(filtered);
        }
    };

    const handleSelectRestaurant = (name) => {
        setFormData((prev) => ({ ...prev, restaurant: name }));
        setDropdownOpen(false);
    };

    const handleNoteChange = (field, index, value) => {
        const updated = [...notesData[field]];
        updated[index] = value;
        setNotesData({ ...notesData, [field]: updated });
    };

    const addNoteField = (field) => {
        setNotesData({ ...notesData, [field]: [...notesData[field], ""] });
    };

    const removeNoteField = (field, index) => {
        const updated = notesData[field].filter((_, i) => i !== index);
        setNotesData({ ...notesData, [field]: updated });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, notesData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Selection (Only show if not in edit mode or explicitly allowed) */}
            {!isEditMode && (
                <div className="relative" ref={dropdownRef}>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                        What restaurant is this report for? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="restaurant"
                            autoComplete="off"
                            value={formData.restaurant}
                            onChange={handleChange}
                            onClick={() => {
                                if (!dropdownOpen) {
                                    setFormData((prev) => ({ ...prev, restaurant: "" }));
                                    setFilteredRestaurants(restaurantOptions);
                                }
                                setDropdownOpen(true);
                            }}
                            placeholder="Enter restaurant name"
                            required
                            className="w-full outline-none border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent pr-10 transition-all"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none text-xl">
                            {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                    </div>
                    {dropdownOpen && (
                        <ul className="absolute z-10 bg-white w-full border border-[var(--border)] border-t-0 max-h-48 overflow-y-auto rounded-b-xl shadow-lg text-sm mt-1">
                            {filteredRestaurants.length === 0 ? (
                                <li className="px-4 py-2 text-[var(--text-tertiary)]">No match found</li>
                            ) : (
                                filteredRestaurants.map((option, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelectRestaurant(option)}
                                        className="px-4 py-2 hover:bg-[var(--primary-light)] cursor-pointer text-[var(--text-primary)] transition-colors"
                                    >
                                        {option}
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </div>
            )}

            {/* Date Field (Read-only in edit mode typically, or editable) */}
            <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Date of the report? <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    name="date"
                    value={formData.date?.split('T')[0] || ""} // Ensure YYYY-MM-DD
                    onChange={handleChange}
                    required
                    disabled={isEditMode} // Usually date isn't editable for an existing log ID, but depends on requirements
                    className={`w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all ${isEditMode ? 'bg-gray-100' : ''}`}
                />
            </div>


            <div>
                <label className="block font-medium text-sm mb-1 text-[var(--text-secondary)]">Email *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                    placeholder="danielr@takeflightrg.com"
                    required
                />
            </div>
            <div>
                <label className="block font-medium text-sm mb-1 text-[var(--text-secondary)]">Weather</label>
                <input
                    type="text"
                    name="weather"
                    value={formData.weather || ""}
                    onChange={handleChange}
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                />
            </div>

            <hr className="my-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField name="breakfastSales" label="Breakfast Sales ($)" value={formData.breakfastSales} onChange={handleChange} />
                <InputField name="breakfastGuests" label="Breakfast Guest Count" value={formData.breakfastGuests} onChange={handleChange} />
                <InputField name="lunchSales" label="Lunch Sales ($)" value={formData.lunchSales} onChange={handleChange} />
                <InputField name="lunchGuests" label="Lunch Guest Count" value={formData.lunchGuests} onChange={handleChange} />
                <InputField name="dinnerSales" label="Dinner Sales ($)" value={formData.dinnerSales} onChange={handleChange} />
                <InputField name="dinnerGuests" label="Dinner Guest Count" value={formData.dinnerGuests} onChange={handleChange} />
            </div>

            <hr className="my-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField name="totalSales" label="Total Sales ($)" value={formData.totalSales} onChange={handleChange} />
                <InputField name="totalSalesLastYear" label="Total Sales Last Year ($)" value={formData.totalSalesLastYear} onChange={handleChange} />
                <InputField name="foodSales" label="Total Food Sales ($)" value={formData.foodSales} onChange={handleChange} />
                <InputField name="lbwSales" label="Total LBW Sales ($)" value={formData.lbwSales} onChange={handleChange} />
                <InputField name="hourlyLabor" label="Total Hourly Labor ($)" value={formData.hourlyLabor} onChange={handleChange} />
                <InputField name="hourlyLaborPercent" label="Total Hourly Labor (%)" value={formData.hourlyLaborPercent} onChange={handleChange} />
                <InputField name="hoursWorked" label="Total Hours Worked" value={formData.hoursWorked} onChange={handleChange} />
                <InputField name="splh" label="Sales Per Labor Hour (SPLH)" value={formData.splh} onChange={handleChange} />
            </div>

            <hr className="my-10" />

            {dynamicFields.map((field) => (
                <div key={field} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block font-medium text-sm text-[var(--text-primary)]">{field}</label>
                        <button
                            type="button"
                            onClick={() => addNoteField(field)}
                            className="bg-[var(--primary-accent)] text-white text-sm rounded-full w-6 h-6 flex items-center justify-center hover:bg-[var(--primary-accent-hover)] transition-colors"
                        >
                            <FiPlus />
                        </button>
                    </div>
                    {notesData[field].map((val, idx) => (
                        <div key={idx} className="relative mb-2">
                            <input
                                type="text"
                                value={val}
                                onChange={(e) => handleNoteChange(field, idx, e.target.value)}
                                className="w-full border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-transparent transition-all"
                            />
                            {idx > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeNoteField(field, idx)}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    <FiMinus className="text-xs" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ))}

            <div className="flex justify-center gap-4 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 bg-white border border-[var(--border)] rounded-xl hover:bg-[var(--filler)] text-[var(--text-secondary)] text-sm font-medium transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-8 py-2.5 bg-[var(--primary-accent)] text-white rounded-xl hover:bg-[var(--primary-accent-hover)] text-sm font-medium transition-all duration-200 hover:shadow-md"
                >
                    {isEditMode ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default BlueBookForm;
