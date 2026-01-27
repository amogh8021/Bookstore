import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Package, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { getUserProfile, updateUserProfile } from "../Services/authService";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getUserProfile()
      .then(res => {
        setUser(res.data);
        setName(res.data.name);
      })
      .catch(err => {
        console.error("Failed to fetch profile:", err);
        // toast.error("Failed to load profile");
      });
  }, []);

  const updateProfile = async () => {
    try {
      await updateUserProfile({ name });
      setUser({ ...user, name });
      setOpen(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="px-6 py-10 max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-6">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
              className="w-28 h-28 rounded-full border-4 border-indigo-50 shadow-md"
              alt={user.name}
            />

            <div>
              <h1 className="text-3xl font-bold font-serif text-primary">{user.name}</h1>
              <p className="text-secondary mt-1">{user.email}</p>
              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
                {user.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition shadow-md"
          >
            <Pencil size={18} /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card title="My Orders" icon={<Package />} onClick={() => navigate("/my-orders")} />
          <Card title="Wishlist" icon={<Heart />} onClick={() => navigate("/wishlist")} />
          <Card title="Cart" icon={<ShoppingBag />} onClick={() => navigate("/cart")} />
        </div>

        {/* ===== EDIT MODAL ===== */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all">
              <h2 className="text-2xl font-bold mb-6 text-primary">Edit Profile</h2>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-semibold text-secondary">Full Name</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-slate-800 transition shadow-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, icon, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
  >
    <div className="text-primary mb-4 p-3 bg-indigo-50 rounded-full w-fit group-hover:bg-primary group-hover:text-white transition-colors">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">{title}</h3>
  </div>
);

export default UserDashboard;
