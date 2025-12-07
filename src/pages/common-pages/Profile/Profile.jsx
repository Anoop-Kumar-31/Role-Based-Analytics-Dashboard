import React, { useState, useRef } from "react";
import { Pencil, SquarePen } from "lucide-react";
import img from "../../../assets/images/default_pfp_3d.png";
import PopUp from "./PopUp";
import { updateUser } from "../../../services/modules/userService";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../../store/slices/authSlice";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone_number: user?.phone_number,
    user_profile_image: user?.user_profile_image || img,
  });
  const [isPopup, setIsPopup] = useState(false);

  // For file input click
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "user_profile_image" && files && files.length > 0) {
      // Handle image as Blob/File
      setFormData((prev) => ({
        ...prev,
        user_profile_image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const saveChanges = async () => {
    try {
      if (!user?.id) {
        toast.error("User not found");
        return;
      }

      let payload;
      let isFormData = false;

      if (formData.user_profile_image instanceof File) {
        payload = new FormData();
        payload.append("user_first_name", formData.first_name);
        payload.append("user_last_name", formData.last_name);
        payload.append("user_email", formData.email);
        payload.append("user_phone_no", formData.phone_number);
        payload.append("user_profile_image", formData.user_profile_image); // Blob/File
        isFormData = true;
      } else {
        payload = {
          user_first_name: formData.first_name,
          user_last_name: formData.last_name,
          user_email: formData.email,
          user_phone_no: formData.phone_number,
          user_profile_image: formData.user_profile_image,
        };
      }
      console.log("Payload to update user:", formData);
      const response = isFormData
        ? await updateUser(user.id, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await updateUser(user.id, payload);

      dispatch(
        updateUserInfo({
          first_name: response.data.user_first_name,
          last_name: response.data.user_last_name,
          email: response.data.user_email,
          phone_number: response.data.user_phone_no,
          user_profile_image: response.data.user_profile_image,
        })
      );
      const emailChanged = formData.email !== user.email;

      toast.success("Profile updated successfully!", {
        duration: 3000,
        position: "top-center",
      });

      if (emailChanged) {
        toast("Email changed, please log in again.", {
          duration: 4000,
          position: "top-center",
          icon: "⚠️",
        });

        setTimeout(() => {
          dispatch({ type: "auth/logout" });
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    saveChanges();
  };

  const triggerFileInput = () => {
    setIsPopup(true); 
  };

  return (
    <div className="bg-[var(--background)] h-fit flex flex-col items-center">
      <div className="flex flex-col justify-center items-center w-[40%] max-sm:w-[80%]">
        <h1 className="text-3xl font-bold text-[var(--primary-black)] mb-6 mt-8 max-md:text-2xl">
          Your Profile
        </h1>

        {/* Profile Picture Section */}
        <div className="flex w-[200px] aspect-square flex-row items-end mb-5">
          <img
            src={
              formData.user_profile_image instanceof File
                ? URL.createObjectURL(formData.user_profile_image)
                : formData.user_profile_image
            }
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <button
            onClick={triggerFileInput}
            className="bg-[var(--primary-blue)] text-white border-none flex items-center justify-center h-fit aspect-square p-4 rounded-full -translate-x-full -translate-y-1/5"
            aria-label="Edit profile picture"
            type="button"
          >
            <Pencil size={20} />
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            name="user_profile_image"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleUpdateProfile}
          className="flex flex-col w-[clamp(300px,100%,800px)] items-center gap-2"
        >
          <section className="grid grid-cols-2 gap-4 w-full max-md:grid-cols-1">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="first_name" className="text-[var(--main-blue)] w-full">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="bg-white border border-[var(--light-grey)] rounded-[10px] px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-blue)]"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="last_name" className="text-[var(--main-blue)] w-full">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
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
            <label htmlFor="phone_number" className="text-[var(--main-blue)] w-full">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="bg-white border border-[var(--light-grey)] rounded-[10px] px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-blue)]"
              placeholder="Phone Number"
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--primary-blue)] text-white mt-2.5 px-5 py-4 rounded-[10px] font-medium text-base transition-colors duration-300 flex items-center gap-2.5"
          >
            <SquarePen size={20} className="button-icon" />
            UPDATE PROFILE
          </button>
        </form>
      </div>

      {/* PopUp shown conditionally (if you want to keep custom cropping etc.) */}
      {isPopup && (
        <PopUp
          onClose={() => setIsPopup(false)}
          onSelect={(imgOrFile) =>
            setFormData((prev) => ({ ...prev, user_profile_image: imgOrFile }))
          }
        />
      )}
    </div>
  );
};

export default Profile;
