import { useCallback } from 'react';

// To convert the string to Number
const num = (val) => (val === "" ? "" : Number(val));

// Small reusable field component
const Field = ({ label, value, onChange, type = "number", placeholder }) => (
  <div>
    <label className="text-[var(--main-blue)] block font-semibold mb-1">{label}</label>
    <input
      type={type}
      className="w-full border border-gray-300 rounded px-3 py-2"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

// LaborTargetForm
const LaborTargetForm = ({ laborTargetData = {}, setFormData }) => {
  const handleChange = useCallback(
    (field, value) => {
      setFormData(prev => {
        let updatedLaborTarget = {
          ...prev.labor_target,
          ...laborTargetData,
          [field]: value,
        };

        // If labor target turned off → clear relevant values
        if (field === "has_labor_target" && value === false) {
          updatedLaborTarget = {
            ...updatedLaborTarget,
            overall_labor_target: 0,
            foh_target: 0,
            boh_target: 0,
          };
        }

        // If salaries included turned off → clear salary fields
        if (field === "has_included_salaries" && value === false) {
          updatedLaborTarget = {
            ...updatedLaborTarget,
            foh_combined_salaried: 0,
            boh_combined_salaried: 0,
          };
        }

        return {
          ...prev,
          labor_target: updatedLaborTarget,
        };
      });
    },
    [setFormData, laborTargetData]
  );

  const {
    has_labor_target = true,
    has_included_salaries = true,
    overall_labor_target = "",
    foh_target = "",
    boh_target = "",
    foh_combined_salaried = "",
    boh_combined_salaried = ""
  } = laborTargetData;

  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold mb-4">Labor Target</h2>

      <div className="mb-4">
        <label className="text-[var(--main-blue)] font-semibold mb-1 flex items-center gap-2">
          Do you have labor percentage targets (% of Revenue)?
          <span
            title="CoGS percent targets are calculated as a percent of revenue."
            className="flex justify-center items-center text-[10px] aspect-square rounded-4xl h-[20px] bg-[var(--primary-blue)] ml-1 text-white cursor-help"
          >
            <p className="m-0 flex items-center justify-center w-full h-full">i</p>
          </span>
        </label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="laborTarget"
              checked={has_labor_target}
              onChange={() => handleChange("has_labor_target", true)}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="laborTarget"
              checked={!has_labor_target}
              onChange={() => handleChange("has_labor_target", false)}
            />{" "}
            No
          </label>
        </div>
      </div>

      {has_labor_target && (
        <div className="grid grid-cols-2 gap-6">
          <Field label="Overall labor percentage target (% of Revenue)" value={overall_labor_target} onChange={v => handleChange("overall_labor_target", num(v))} />
          <Field label="Front of House (FOH) labor target" value={foh_target} onChange={v => handleChange("foh_target", num(v))} />
          <Field label="Back of House (BOH) labor target" value={boh_target} onChange={v => handleChange("boh_target", num(v))} />
        </div>
      )}

      <div className="mt-6 mb-4">
        <label className="text-[var(--main-blue)] font-semibold mb-1 flex items-center gap-2">
          Do you have salaries to include in labor target?
        </label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="hasSalaries"
              checked={has_included_salaries}
              onChange={() => handleChange("has_included_salaries", true)}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasSalaries"
              checked={!has_included_salaries}
              onChange={() => handleChange("has_included_salaries", false)}
            />{" "}
            No
          </label>
        </div>
      </div>

      {has_included_salaries && (
        <div className="grid grid-cols-2 gap-6">
          <Field label="Combined FOH salaried amount" value={foh_combined_salaried} onChange={v => handleChange("foh_combined_salaried", num(v))} />
          <Field label="Combined BOH salaried amount" value={boh_combined_salaried} onChange={v => handleChange("boh_combined_salaried", num(v))} />
        </div>
      )}
    </div>
  );
};

// CoGSTargetForm
const CoGSTargetForm = ({ cogsTargetData = {}, setFormData }) => {
  const handleChange = useCallback(
    (field, value) => {
      setFormData(prev => {
        let updatedCogsTarget = {
          ...prev.cogs_target,
          ...cogsTargetData,
          [field]: value,
        };

        // If CoGS target turned off → clear relevant values
        if (field === "has_cogs_target" && value === false) {
          updatedCogsTarget = {
            ...updatedCogsTarget,
            food: 0,
            pastry:0,
            beer: 0,
            wine: 0,
            liquor: 0,
            NA_Bev: 0,
            smallwares: 0,
            others: 0,
          };
        }

        return {
          ...prev,
          cogs_target: updatedCogsTarget,
        };
      });
    },
    [setFormData, cogsTargetData]
  );

  const {
    has_cogs_target = true,
    food = "",
    pastry = "",
    beer = "",
    wine = "",
    liquor = "",
    NA_Bev = "",
    smallwares = "",
    others = ""
  } = cogsTargetData;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cost of Goods Sold (CoGS)</h2>

      <div className="mb-4">
        <label className="text-[var(--main-blue)] font-semibold mb-1 flex items-center gap-2">
          Do you have CoGS percent targets (% of Revenue)?
          <span
            title="CoGS percent targets are calculated as a percent of revenue."
            className="flex justify-center items-center text-[10px] aspect-square rounded-4xl h-[20px] bg-[var(--primary-blue)] ml-1 text-white cursor-help"
          >
            <p className="m-0 flex items-center justify-center w-full h-full">i</p>
          </span>
        </label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="cogsTarget"
              checked={has_cogs_target}
              onChange={() => handleChange("has_cogs_target", true)}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="cogsTarget"
              checked={!has_cogs_target}
              onChange={() => handleChange("has_cogs_target", false)}
            />{" "}
            No
          </label>
        </div>
      </div>

      {has_cogs_target && (
        <div className="grid grid-cols-2 gap-6">
          <Field label="Food CoGS %" value={food} onChange={v => handleChange("food", num(v))} />
          <Field label="Pastry CoGS %" value={pastry} onChange={v => handleChange("pastry", num(v))} />
          <Field label="Beer CoGS %" value={beer} onChange={v => handleChange("beer", num(v))} />
          <Field label="Wine CoGS %" value={wine} onChange={v => handleChange("wine", num(v))} />
          <Field label="Liquor CoGS %" value={liquor} onChange={v => handleChange("liquor", num(v))} />
          <Field label="NA Bev/Coffee CoGS %" value={NA_Bev} onChange={v => handleChange("NA_Bev", num(v))} />
          <Field label="Smallware % (paper goods, silver/plasticware, etc.)" value={smallwares} onChange={v => handleChange("smallwares", num(v))} />
          <Field label="All other CoGS % (cleaning supplies, aprons, rags, etc.)" value={others} onChange={v => handleChange("others", num(v))} />
        </div>
      )}
    </div>
  );
};


// RestaurantInfo 
const RestaurantInfo = ({ restaurantData = {}, setFormData }) => {
  const handleChange = useCallback(
    (field, value) => {
      setFormData(prev => ({
        ...prev,
        ...restaurantData,
        [field]: value,
      }));
    },
    [setFormData, restaurantData]
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Restaurant's Information</h2>
      <div className="flex flex-row w-full gap-6">
        <Field type="text" label="Restaurant Name" value={restaurantData.restaurant_name ?? ""} onChange={v => handleChange("restaurant_name", v)} />
        <Field type="text" label="Location" value={restaurantData.restaurant_location ?? ""} onChange={v => handleChange("restaurant_location", v)} />
      </div>
    </div>
  );
};

// RevenueForm — now uses Field for months
const RevenueForm = ({ revenueTargetsData = {}, setFormData }) => {
  const months = [
    "january","february","march","april","may","june",
    "july","august","september","october","november","december"
  ];

  const handleChange = useCallback(
    (month, value) => {
      setFormData(prev => ({
        ...prev,
        revenue_targets: {
          ...prev.revenue_targets,
          ...revenueTargetsData,
          [month]: value,
        },
      }));
    },
    [setFormData, revenueTargetsData]
  );

  return (
    <div className="h-fit w-full">
      <h2 className="text-xl font-semibold mb-4">Revenue Targets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {months.map((month) => (
          <Field
            key={month}
            label={`${month.charAt(0).toUpperCase() + month.slice(1)} Target (current year)`}
            value={revenueTargetsData[month] ?? ""}
            placeholder={`Enter target for ${month.charAt(0).toUpperCase() + month.slice(1)}`}
            onChange={v => handleChange(month, v)}
          />
        ))}
      </div>
    </div>
  );
};

export { LaborTargetForm, RevenueForm, RestaurantInfo, CoGSTargetForm };
