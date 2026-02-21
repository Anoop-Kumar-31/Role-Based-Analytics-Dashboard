import React, { useState } from "react";

// Dummy restaurant options
const restaurantOptions = [
  "The Stables Kitchen & Beer Garden",
  "The Greenhouse Cafe",
  "Sunset Diner",
  "Blue Ocean Grill"
];

const UserInfoForm = ({ form, setForm }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">User Information</h2>
    <div className="grid grid-cols-1 gap-6 mb-6">
      <div>
        <label className="block font-semibold mb-1" htmlFor="fname">First Name <asterisk className='text-red-600'>*</asterisk></label>
        <input
          id="fname"
          className="w-full border rounded px-3 py-2"
          value={form.fname}
          onChange={e => setForm(f => ({ ...f, fname: e.target.value }))}
          placeholder="Enter first name"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="lname">Last Name <asterisk className='text-red-600'>*</asterisk></label>
        <input
          id="lname"
          className="w-full border rounded px-3 py-2"
          value={form.lname}
          onChange={e => setForm(f => ({ ...f, lname: e.target.value }))}
          placeholder="Enter last name"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="email">Email <asterisk className='text-red-600'>*</asterisk></label>
        <input
          id="email"
          className="w-full border rounded px-3 py-2"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="user@email.com"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="phone">Phone Number <asterisk className='text-red-600'>*</asterisk></label>
        <input
          id="phone"
          className="w-full border rounded px-3 py-2"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="000-000-0000"
          required
        />
      </div>
    </div>
    <div className="mb-2">
      <label className="block font-semibold mb-1" htmlFor="restaurant">Restaurant <asterisk className='text-red-600'>*</asterisk></label>
      <select
        id="restaurant"
        className="w-full border rounded px-3 py-2"
        value={form.restaurant}
        onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))}
        required
      >
        <option value="">Select a restaurant</option>
        {restaurantOptions.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  </div>
);

const UserReviewForm = ({ form }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Review Information</h2>
    <div className="grid grid-cols-1 gap-6 mb-6">
      <div>
        <span className="font-semibold">First Name:</span>
        <div>{form.fname}</div>
      </div>
      <div>
        <span className="font-semibold">Last Name:</span>
        <div>{form.lname}</div>
      </div>
      <div>
        <span className="font-semibold">Email:</span>
        <div>{form.email}</div>
      </div>
      <div>
        <span className="font-semibold">Phone Number:</span>
        <div>{form.phone}</div>
      </div>
      <div className="col-span-2">
        <span className="font-semibold">Restaurant:</span>
        <div>{form.restaurant}</div>
      </div>
    </div>
  </div>
);

const PopUp = ({ onClose, data }) => {
  // Split fullName into fname and lname only once on mount
  const initialForm = React.useMemo(() => {
    if (data && data.fullName) {
      const parts = data.fullName.trim().split(" ");
      return {
        ...data,
        fname: parts[0] || "",
        lname: parts.slice(1).join(" ") || "",
      };
    }
    return {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      restaurant: ""
    };
  }, [data]);

  const [form, setForm] = useState(initialForm);
  const [page, setPage] = useState(0);


  const pages = [
    <UserInfoForm key="user-info" form={form} setForm={setForm} />,
    <UserReviewForm key="user-review" form={form} />
  ];

  const handleSubmit = (props) => {
    // console.log(props);
    // Call API to save data
    // Refresh the page
  }

  const handleNext = () => {
    if (page === 0) {
      const { fname, lname, email, phone, restaurant } = form;
      if (!fname || !lname || !email || !phone || !restaurant) {
        alert("Please fill in all fields before proceeding.");
        return;
      }
    }

    if (page < pages.length - 1) {
      setPage(prev => prev + 1);
    } else {
      const { fname, lname, email, phone, restaurant } = form;
      alert("User info has been saved successfully!");
      const fullName = fname + ' ' + lname
      handleSubmit({ fullName, email, phone, restaurant });
      onClose();
    }
  };

  const handleBack = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 h-[calc(100vh-60px)] bg-white backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white w-[60%] h-[100%] p-8 flex flex-col justify-between
                      max-md:w-full max-md:h-full max-md:p-2 max-md:rounded-none">
        <section className="h-fill mb-8 h-[90%] px-3 overflow-y-scroll max-md:px-1 max-md:mb-4">
          {pages[page]}
        </section>
        <section className="flex justify-end gap-3 max-md:gap-2 max-md:flex-col-reverse">
          <button
            className="px-5 py-2 rounded-lg bg-white hover:bg-[#ffaaaa] border-2 border-red-900 text-red-900 max-md:w-full"
            onClick={onClose}
          >
            Close
          </button>
          {page > 0 && (
            <button
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 max-md:w-full"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white max-md:w-full"
            onClick={handleNext}
          >
            {page === pages.length - 1 ? "Submit" : "Next"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default PopUp;
