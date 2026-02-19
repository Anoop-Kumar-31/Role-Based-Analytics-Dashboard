import React, { useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import imageCompression from "browser-image-compression";
import avatarList from "@/src/assets/images/avatars";
// import avt13 from "@/src/";


const PopUp = ({ onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [uploaded, setUploaded] = useState(null);          // preview URL
  const [uploadedFile, setUploadedFile] = useState(null);  // actual File object
  const fileInput = useRef();

  // Compress uploaded image before storing
  const compressImage = async (file) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
      return file; // fallback to original file if compression fails
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const compressed = await compressImage(file);
      setUploaded(URL.createObjectURL(compressed));
      setUploadedFile(compressed);
      setSelected(null);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const compressed = await compressImage(file);
      setUploaded(URL.createObjectURL(compressed));
      setUploadedFile(compressed);
      setSelected(null);
    }
  };

  const handleAvatarClick = (img, idx) => {
    setSelected(idx);
    setUploaded(null);
    setUploadedFile(null);
  };

  const handleSubmit = () => {
    if (uploadedFile) {
      onSelect && onSelect(uploadedFile); // pass the File object
    } else if (selected !== null) {
      onSelect && onSelect(avatarList[selected]); // pass avatar URL string
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 h-[calc(100vh-60px)] bg-[#00000033] bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-xs">
      <div className="bg-white md:rounded-xl shadow-lg w-full max-w-2xl p-8 flex flex-col gap-6 relative max-md:h-full justify-between">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-black mb-2">Profile photo</h2>
        {/* Drag & Drop / Upload */}
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
              alt="Uploaded Preview"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <span className="text-[var(--primary-blue)] flex flex-col items-center gap-0">
              <span className="text-gray-400 text-center">
                Drag and Drop<br />
                or
              </span>
              <span className="flex">
                Click to upload &nbsp;<Upload size={20} />
              </span>
            </span>
          )}
        </div>
        {/* Avatars */}
        <div className="bg-white rounded-lg pt-4 border-2 border-[var(--primary-blue)] flex flex-col">
          <div className="text-center font-semibold mb-1 text-2xl">Avatars</div>
          <hr className="w-[90%] self-center pb-2 border-[var(--primary-blue)] border-t-2" />
          <div className="grid grid-rows-2 grid-flow-col gap-4 w-fill overflow-x-scroll p-2">
            {avatarList.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`rounded-full border-2 transition-all duration-150 aspect-square h-[85px] border-transparent ${selected === idx ? "shadow-[0_0_0_2px_var(--primary-blue)]" : ""
                  }`}
                onClick={() => handleAvatarClick(img, idx)}
                tabIndex={0}
                aria-label={`Select Avatar ${idx + 1}`}
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
