import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Dummy restaurant options
const restaurantOptions = [
  "The Stables Kitchen & Beer Garden",
  "The Greenhouse Cafe",
  "Sunset Diner",
  "Blue Ocean Grill"
];

const UserInfoForm = ({ form, setForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <div className="grid grid-cols gap-6 mb-6">
        {/* New Password */}
        <div className="relative">
          <label className="block font-semibold mb-1" htmlFor="newPassword">
            New Password <span className="text-red-600">*</span>
          </label>
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            className="w-full border rounded px-3 py-2 pr-10"
            value={form.newPassword}
            onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block font-semibold mb-1" htmlFor="confirmPassword">
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            className="w-full border rounded px-3 py-2 pr-10"
            value={form.confirmPassword}
            onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
            placeholder="Confirm password"
            required
          />
          <button
            type="button"
            className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirm(prev => !prev)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

const PopUp = ({ onClose, data }) => {

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [page, setPage] = useState(0);

  const pages = [
    <UserInfoForm key="user-info" form={form} setForm={setForm} />,
  ];

  const handleSubmit = (props) => {
    console.log(props);
    // Call API to save data
    // Refresh the page
  }

  const handleNext = () => {
    if (page === 0) {
      const { confirmPassword, newPassword } = form;
      if (confirmPassword !== newPassword) {
        alert("Passwords do not match!");
        onClose();
      }
      else if (confirmPassword.length == 0 && newPassword.length == 0) {
        alert("Field is empty!");
      }
      else if (newPassword.length < 8) {
        alert("Password must be at least 8 characters long!");
      }
      else {
        alert("Password Changed Successfully!");
      }
    }
  };

  const handleBack = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 h-[calc(100vh-60px)] bg-[#00000033] backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white w-[40%] h-fit p-8 flex flex-col justify-between
                      max-md:w-full max-md:h-full max-md:p-2 max-md:rounded-none rounded-2xl">
        <section className="h-fill mb-8 h-[90%] px-3 overflow-y-scroll max-md:px-1 max-md:mb-4">
          {pages[page]}
        </section>
        <section className="flex justify-center gap-3 max-md:gap-2 max-md:flex-col-reverse">
          <button
            className="px-5 py-2 rounded-lg bg-white hover:bg-[#ffaaaa] border-2 border-red-900 text-red-900 max-md:w-full"
            onClick={() => {
              setForm({
                fname: "",
                lname: "",
                email: "",
                phone: "",
                restaurant: ""
              });
              onClose();
            }}
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
            {page === pages.length - 1 ? "Save" : "Next"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default PopUp;
