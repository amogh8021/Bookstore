import React from 'react';
import { motion } from 'framer-motion';

const AdDashCard = ({ title, no, btn, onClick }) => (
  <div className="p-6 bg-white rounded-2xl shadow-md text-center hover:shadow-lg transition">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold mb-4">{no}</p>
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      {btn}
    </button>
  </div>
);
export default AdDashCard;

