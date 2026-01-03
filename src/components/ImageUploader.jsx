import React, { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

const ImageUploader = ({ onImageSelect, selectedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const clearImage = (e) => {
    e.stopPropagation();
    onImageSelect(null, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {selectedImage ? (
        <div className="relative group rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-700 transition-transform hover:scale-[1.01]">
          <img
            src={selectedImage}
            alt="Fruit Preview"
            className="w-full h-64 md:h-80 object-cover bg-gray-100 dark:bg-slate-800"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={clearImage}
              className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-red-500 transition-all flex items-center gap-2"
            >
              <X size={18} /> Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-3 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]"
              : "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 hover:shadow-lg"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current.click();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Upload image area. Drag and drop an image here or press enter to select a file."
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            aria-hidden="true"
          />

          <div className="flex flex-col items-center gap-4">
            <div
              className={`p-4 rounded-full transition-colors ${
                isDragging
                  ? "bg-blue-200 dark:bg-blue-800"
                  : "bg-blue-100 dark:bg-slate-700"
              }`}
            >
              <Upload
                className={`w-8 h-8 ${
                  isDragging
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-blue-600 dark:text-blue-400"
                }`}
                aria-hidden="true"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200">
                {isDragging ? "Drop fruit image now!" : "Upload Fruit Image"}
              </h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                Drag & drop or click to analyze freshness.
                <br />
                <span className="text-xs opacity-70">(Supports JPG, PNG)</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
