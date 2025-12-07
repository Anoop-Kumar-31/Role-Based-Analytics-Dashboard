import React, { useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import avt1 from "../../../assets/images/avatars/1.png";
import avt2 from "../../../assets/images/avatars/2.png";
import avt3 from "../../../assets/images/avatars/4.png";
import avt4 from "../../../assets/images/avatars/8.png";
import avt5 from "../../../assets/images/avatars/9.png";
import avt6 from "../../../assets/images/avatars/10.png";
import avt7 from "../../../assets/images/avatars/11.png";
import avt8 from "../../../assets/images/avatars/12.png";
import avt10 from "../../../assets/images/avatars/14.png";
import avt11 from "../../../assets/images/avatars/15.png";
import avt12 from "../../../assets/images/avatars/16.png";

// Example avatar images (replace with your own paths)
const avatarList = [ avt1, avt2, avt3, avt4, avt5, avt6, avt7, avt8, avt10, avt11, avt12 ];

const PopUp = ({ onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const fileInput = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploaded(URL.createObjectURL(file));
      setSelected(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploaded(URL.createObjectURL(e.target.files[0]));
      setSelected(null);
    }
  };

  const handleAvatarClick = (img, idx) => {
    setSelected(idx);
    setUploaded(null);
  };

  const handleSubmit = () => {
    if (uploaded) {
      onSelect && onSelect(uploaded);
    } else if (selected !== null) {
      onSelect && onSelect(avatarList[selected]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#00000033] bg-opacity-80 flex items-center justify-center z-[999999999] backdrop-blur-xs">
      <div className="bg-white md:rounded-xl shadow-lg w-full max-w-2xl p-8 flex flex-col gap-6 relative max-md:h-full justify-between">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-black mb-2">Profile photo</h2>
        {/* Drag & Drop / Import */}
        <div
          className="border-2 border-dashed border-[var(--primary-blue)] rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer transition hover:bg-blue-50 mb-2"
          onClick={() => fileInput.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInput}
            onChange={handleFileChange}
          />
          {uploaded ? (
            <img
              src={uploaded}
              alt="Uploaded"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <span className="text-[var(--primary-blue)] flex flex-col items-center gap-0">
              <span className="text-gray-400 text-center">Drag and Drop<br/>or</span>
              <span className="flex">Click to upload &nbsp;<Upload size={20} /></span>
              
            </span>
          )}
        </div>
        {/* Avatars */}
        <div className="bg-white rounded-lg py-4 px-2 shadow-[inset_0_0_5px_var(--primary-blue)]">
          <div className="text-center font-semibold mb-2">Avatars</div>
          <div className="flex gap-4 w-fill overflow-x-scroll p-2">
            {avatarList.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`rounded-full border-2 transition-all duration-150 aspect-square h-[85px] border-transparent ${
                  selected === idx
                    ? "shadow-[0_0_0_2px_var(--primary-blue)]"
                    : ""
                }`}
                onClick={() => handleAvatarClick(img, idx)}
                tabIndex={0}
              >
                <img
                  src={img}
                  alt={`Avatar ${idx + 1}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-6 py-2 rounded-lg border border-[var(--primary-blue)] text-[var(--primary-blue)] bg-white font-medium hover:bg-blue-50"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-[var(--primary-blue)] text-white font-medium hover:bg-blue-700"
            onClick={handleSubmit}
            type="button"
            disabled={selected === null && !uploaded}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;