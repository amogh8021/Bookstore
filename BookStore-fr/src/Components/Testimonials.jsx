import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Rohit Sharma",
    text: "Amazing collection of books! I always find what I’m looking for.",
  },
  {
    id: 2,
    name: "Sneha Verma",
    text: "Fast delivery and the packaging was perfect. Highly recommend!",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    text: "Best bookstore online. Prices are great and offers are unbeatable!",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[#FAF8F4] py-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-6">💬 Our Happy Customers</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-lg shadow hover:scale-105 transition"
          >
            <p className="text-gray-700 mb-3">“{t.text}”</p>
            <h4 className="font-semibold text-[#AD7D42]">{t.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
