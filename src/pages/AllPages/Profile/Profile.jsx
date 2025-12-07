import React, { useState } from 'react';
import { Pencil, SquarePen } from 'lucide-react'; // Icons for edit and update
import img from '../../../assets/images/default_pfp_3d.png';
import PopUp from './PopUp'; // ✅ Uncommented

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: img
  });

  const [isPopup, setIsPopup] = useState(false); // ✅ Re-enabled

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    console.log(formData);
    // TODO: Replace with actual API call
    window.location.reload(false);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('Updating Profile:', formData);
    alert('Profile Updated! Check console for data.');
  };

  const handleProfilePictureEdit = () => {
    setIsPopup(true); // ✅ Opens the popup
    // alert("pfp change init")
  };

  return (
    <div className="bg-[var(--background)] h-fit flex flex-col items-center">
      <div className="flex flex-col justify-center items-center w-[40%] max-sm:w-[80%]">
        <h1 className="text-3xl font-bold text-[var(--primary-black)] mb-6 mt-8 max-md:text-2xl">Your Profile</h1>

        {/* Profile Picture Section */}
        <div className="flex w-[200px] aspect-square flex-row items-end mb-5">
          <img
            src={formData.profilePicture}
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <button
            onClick={handleProfilePictureEdit}
            className="bg-[var(--primary-blue)] text-white border-none flex items-center justify-center h-fit aspect-square p-4 rounded-full -translate-x-full -translate-y-1/5"
            aria-label="Edit profile picture"
            type="button"
          >
            <Pencil size={20} />
          </button>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleUpdateProfile}
          className="flex flex-col w-[clamp(300px,100%,800px)] items-center gap-2"
        >
          <section className='grid grid-cols-2 gap-4 w-full max-md:grid-cols-1'>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="firstName" className="text-[var(--main-blue)] w-full">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-white border border-[var(--light-grey)] rounded-[10px] px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-blue)]"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="lastName" className="text-[var(--main-blue)] w-full">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-white border border-[var(--light-grey)] rounded-[10px] px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-blue)]"
                placeholder="Last Name"
              />
            </div>
          </section>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-[var(--main-blue)] w-full">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white border border-[var(--light-grey)] rounded-[10px] px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-blue)]"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="phoneNumber" className="text-[var(--main-blue)] w-full">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-white border border-[var(--light-grey)] rounded-[10px] px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-blue)]"
              placeholder="Phone Number"
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--primary-blue)] text-white mt-2.5 px-5 py-4 rounded-[10px] font-medium text-base transition-colors duration-300 flex items-center gap-2.5"
            onClick={saveChanges}
          >
            <SquarePen size={20} className="button-icon" />
            UPDATE PROFILE
          </button>
        </form>
      </div>

      {/* ✅ PopUp component shown conditionally */}
      {isPopup && (
        <PopUp
          onClose={() => setIsPopup(false)}
          onSelect={(img) => setFormData((prev) => ({ ...prev, profilePicture: img }))}
          />
      )}
    </div>
  );
};

export default Profile;
