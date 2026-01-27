import React from "react";
import { FaTruck, FaBookOpen, FaHeadset } from "react-icons/fa";

const Services = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-6">💼 Our Services</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
          <FaTruck className="text-4xl text-[#AD7D42] mb-3" />
          <h3 className="font-semibold">Fast Delivery</h3>
          <p className="text-gray-600 text-sm mt-2">Books delivered within 2–3 days.</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
          <FaBookOpen className="text-4xl text-[#AD7D42] mb-3" />
          <h3 className="font-semibold">Wide Collection</h3>
          <p className="text-gray-600 text-sm mt-2">Thousands of books across genres.</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
          <FaHeadset className="text-4xl text-[#AD7D42] mb-3" />
          <h3 className="font-semibold">24/7 Support</h3>
          <p className="text-gray-600 text-sm mt-2">We’re always here to help you.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
