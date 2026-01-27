import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import axios from "axios";
import { FaCirclePlus, FaTrash, FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";

const AdminOffers = () => {
  const token = localStorage.getItem("token");

  // ================= STATE =================
  const [offers, setOffers] = useState([]);
  const [modal, setModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const [offer, setOffer] = useState({
    title: "",
    description: "",
    discountPercentage: "",
    couponCode: "",
    startDate: "",
    endDate: "",
    isActive: true
  });

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOffer({
      ...offer,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const fetchOffers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/offers/get",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOffers(res.data);
    } catch {
      toast.error("Failed to load offers");
    }
  };

  const handleCreateOffer = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/offers/create",
        offer,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Offer created");
      setModal(false);
      fetchOffers();
    } catch {
      toast.error("Failed to create offer");
    }
  };

  const handleDeleteOffer = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/offers/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Offer deleted");
      fetchOffers();
    } catch {
      toast.error("Failed to delete offer");
    }
  };

  // ⭐ FEATURED TOGGLE (CORRECT WAY)
  const handleToggleFeatured = async (offer) => {
    try {
      await axios.put(
        `http://localhost:8080/api/offers/${offer.id}/featured`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(
        offer.isFeatured
          ? "Removed from featured"
          : "Marked as featured"
      );

      fetchOffers();
    } catch {
      toast.error("Failed to update featured");
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="relative">
      <AdminNavBar />

      {/* ================= FILTER ================= */}
      <div className="px-6 mt-4 flex justify-end">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="ALL">All Offers</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* ================= OFFERS LIST ================= */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers
          .filter((o) => {
            if (filterStatus === "ACTIVE") return o.active;
            if (filterStatus === "INACTIVE") return !o.active;
            return true;
          })
          .map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition relative"
            >
              {/* FEATURED BADGE */}
              {o.isFeatured && (
                <span className="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                  FEATURED
                </span>
              )}

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{o.title}</h3>

                <div className="flex gap-3">
                  {/* ⭐ FEATURED BUTTON (exact style you wanted) */}
                  <button
                    onClick={() => handleToggleFeatured(o)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      o.isFeatured
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-200 text-gray-600"
                    } hover:scale-110`}
                    title="Toggle Featured"
                  >
                    <FaStar />
                  </button>

                  {/* 🗑 DELETE (bigger & clear) */}
                  <button
                    onClick={() => handleDeleteOffer(o.id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-200"
                    title="Delete Offer"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mt-2">{o.description}</p>

              <div className="mt-3 text-sm space-y-1">
                <p><b>Coupon:</b> {o.couponCode}</p>
                <p><b>Discount:</b> {o.discountPercentage}%</p>
                <p><b>Valid:</b> {o.startDate} → {o.endDate}</p>
                <p className={o.active ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {o.active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* ================= ADD BUTTON ================= */}
      <button
        onClick={() => setModal(true)}
        className="fixed bottom-6 right-6 text-blue-600 hover:scale-110 transition"
      >
        <FaCirclePlus size={60} />
      </button>

      {/* ================= MODAL ================= */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[500px] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Create Offer</h2>

            <div className="space-y-3">
              <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2 rounded" />
              <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="discountPercentage" placeholder="Discount %" onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="couponCode" placeholder="Coupon Code" onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="date" name="startDate" onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="date" name="endDate" onChange={handleChange} className="w-full border p-2 rounded" />

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="isActive" checked={offer.isActive} onChange={handleChange} />
                Active
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleCreateOffer} className="px-4 py-2 bg-blue-600 text-white rounded">
                Create Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;
