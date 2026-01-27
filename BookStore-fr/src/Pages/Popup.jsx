
import React from "react";

const Popup = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl w-11/12 max-w-3xl shadow-xl relative">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>

        <div className="max-h-[70vh] overflow-y-auto">{children}</div>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Popup;
