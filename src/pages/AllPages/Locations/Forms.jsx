import {useState} from 'react';

const LaborTargetForm = () => {
  const [hasLaborTarget, setHasLaborTarget] = useState(true);
  const [hasSalaries, setHasSalaries] = useState(true);

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4">Labor Target</h2>
      <div className="mb-4 ">
        <label className="font-semibold mb-1 flex items-center gap-2">
          Do you have labor percentage targets (% of Revenue)?
          <span title="CoGS percent targets are calculated as a percent of revenue." className="flex justify-center items-center text-[10px] aspect-square rounded-4xl h-[20px] bg-[var(--primary-blue)] ml-1 text-white cursor-help">
            <p className="m-0 flex items-center justify-center w-full h-full">i</p>
          </span>
        </label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="laborTarget"
              checked={hasLaborTarget}
              onChange={() => setHasLaborTarget(true)}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="laborTarget"
              checked={!hasLaborTarget}
              onChange={() => setHasLaborTarget(false)}
            />{" "}
            No
          </label>
        </div>
      </div>
      {hasLaborTarget && (
        <div className="grid grid-cols-2 gap-6">
        <div>
            <label className="block font-semibold mb-1">
            What is your overall labor percentage target (% of Revenue)?
            </label>
            <input className="w-full border rounded px-3 py-2" defaultValue="21.00" />
        </div>
        <div>
            <label className="block font-semibold mb-1">
            What is your Front of House (FOH) labor target?
            </label>
            <input className="w-full border rounded px-3 py-2" defaultValue="7.00" />
        </div>
        <div>
            <label className="block font-semibold mb-1">
            What is your Back of House (BOH) labor target?
            </label>
            <input className="w-full border rounded px-3 py-2" defaultValue="14.00" />
        </div>
        </div>
      )}
      <div className="mt-6 mb-4">
            <label className=" font-semibold mb-1 flex items-center gap-2">
              Do you have any salaries you want to include in your labor target?
            </label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="hasSalaries"
                  checked={hasSalaries}
                  onChange={() => setHasSalaries(true)}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="hasSalaries"
                  checked={!hasSalaries}
                  onChange={() => setHasSalaries(false)}
                />{" "}
                No
              </label>
            </div>
          </div>
          {hasSalaries && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1">
                  What is your combined FOH salaried amount?
                </label>
                <input className="w-full border rounded px-3 py-2" defaultValue="0.00" />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  What is your combined BOH salaried amount?
                </label>
                <input className="w-full border rounded px-3 py-2" defaultValue="0.00" />
              </div>
            </div>
          )}
    </div>
  );
};
const CoGSTargetForm = () => {
  const [hasCoGSTarget, setHasCoGSTarget] = useState(true);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cost of Goods Sold (CoGS)</h2>
      <div className="mb-4">
        <label className="font-semibold mb-1 flex items-center gap-2">
          Do you have CoGS percent targets (% of Revenue)?
          <span title="CoGS percent targets are calculated as a percent of revenue." className="flex justify-center items-center text-[10px] aspect-square rounded-4xl h-[20px] bg-[var(--primary-blue)] ml-1 text-white cursor-help">
            <p className="m-0 flex items-center justify-center w-full h-full">i</p>
          </span>
        </label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="cogsTarget"
              checked={hasCoGSTarget}
              onChange={() => setHasCoGSTarget(true)}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="cogsTarget"
              checked={!hasCoGSTarget}
              onChange={() => setHasCoGSTarget(false)}
            />{" "}
            No
          </label>
        </div>
      </div>
      {hasCoGSTarget && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Food CoGS %</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="28.00" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Pastry CoGS %</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="30.00" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Beer CoGS %</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="24.00" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Wine CoGS %</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="24.00" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Liquor CoGS %</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="12.00" />
          </div>
          <div>
            <label className="block font-semibold mb-1">NA Bev/Coffee CoGS %</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="24.00" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Smallware % (paper goods, silver or plasticware, etc.)</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="3.00" />
          </div>
          <div>
            <label className="block font-semibold mb-1">All other CoGS % (cleaning supplies, aprons, rags, etc.)</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="0.00" />
          </div>
        </div>
      )}
    </div>
  );
};

const RestaurantInfo = () =>
  (
    <div>
			<h2 className="text-2xl font-bold mb-4">Restaurant's Information</h2>
			<div className="flex flex-col gap-6">
				<div>
					<label className="block font-semibold mb-1">Restaurant Name</label>
					<input
						className="w-full border rounded px-3 py-2"
						defaultValue="The Stables Kitchen & Beer Garden"
					/>
				</div>
				<div>
					<label className="block font-semibold mb-1">Location</label>
					<input
						className="w-full border rounded px-3 py-2"
						defaultValue="160 Park Rd, Chester Springs, PA 19425"
					/>
				</div>
			</div>
		</div>
  )

const RevenueForm = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="h-fit w-full">
      <h2 className="text-2xl font-bold mb-4">Revenue Targets</h2>

      {/* Year & Month Selector */}
      <div className="flex grow">
        {/* Year Dropdown */}
        <div className='w-[100%] mb-5'>
          <label className="block font-semibold mb-1">Year</label>
          <select className="w-full border rounded px-3 py-2">
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
      </div>

      {/* Monthly Targets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {months.map((month) => (
          <div key={month}>
            <label className="block font-semibold mb-1">
              {month} Target (current year)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder={`Enter target for ${month}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export {LaborTargetForm, RevenueForm,RestaurantInfo,CoGSTargetForm}