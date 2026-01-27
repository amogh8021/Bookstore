import React from "react";

const Newsletter = () => {
  return (
    <div className="bg-[#F5F2ED] py-12 px-6 text-center rounded-xl mx-8 my-12 shadow">
      <h2 className="text-2xl font-bold mb-2">📩 Stay Updated!</h2>
      <p className="text-gray-600 mb-4">
        Subscribe to our newsletter for latest books, offers & recommendations.
      </p>

      <form className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AD7D42]"
        />
        <button
          type="submit"
          className="bg-[#AD7D42] text-white px-6 py-2 rounded-lg hover:bg-[#8a6232] transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
