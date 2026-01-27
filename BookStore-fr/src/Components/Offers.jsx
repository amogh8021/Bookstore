import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem("token"); // agar auth required hai
        const response = await axios.get("http://localhost:8080/api/offers/active", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        setOffers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching offers:", err);
        toast.error("Failed to load offers");
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-gray-600 font-semibold">Loading offers...</p>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500 italic">No active offers right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F2ED] py-12 px-6 rounded-xl mx-8 my-12 shadow">
      <h2 className="text-2xl font-bold text-center mb-6">🎉 Special Offers</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-6 rounded-lg shadow hover:scale-105 transition"
          >
            <h3 className="font-semibold text-lg">{offer.title}</h3>
            <p className="text-gray-600 mt-2">{offer.description}</p>
            <p className="text-blue-600 mt-2 font-medium">
              {offer.discountPercentage}% Off
            </p>
            {offer.couponCode && (
              <p className="text-green-600 mt-1 font-medium">
                Use Code: {offer.couponCode}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
