import React, { useState } from "react";

const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const uploadedImage = e.target.files[0];
    setSelectedImage(URL.createObjectURL(uploadedImage));
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      onImageUpload(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <div className="flex">
      <input
        className=" bg-gray-300 text-black text-md px-2 py-2 rounded-md sm:px-2 sm:py-1 sm:m-2 md:px-2 md:py-1 lg:px-2 lg:py-1 xl:px-2 xl:py-1 xl:m-1"
        type="file"
        name=""
        onChange={handleImageChange}
      />

      <button
        className="bg-gray-300 flex justify-center items-center text-black text-md px-5 py-4 rounded-md sm:px-2 sm:py-1 sm:m-2 md:px-2 md:py-1 lg:px-2 lg:py-1 xl:px-2 xl:py-1 xl:m-1"
        onClick={handleUploadImage}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
