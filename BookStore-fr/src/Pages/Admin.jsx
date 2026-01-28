import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import AdDashCard from "../Components/AdDashCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus, FaMoneyBillWave, FaBoxOpen, FaUsers, FaBook } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= STATE =================
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalBooks: 0,
    totalUsers: 0,
    newOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    monthlySales: {}, // { "JAN": 1200, "FEB": 3000 }
  });

  const [loading, setLoading] = useState(true);

  // ================= MODAL =================
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    quantity: "",
    imageUrl: "",
    description: ""
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    // Basic validation
    if (!book.title || !book.author || !book.price) {
      return toast.warning("Please fill required fields");
    }

    try {
      await axios.post(
        "http://localhost:8080/book/create-book",
        book,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Book added successfully");
      setModal(false);
      // Optional: Refresh stats or books count if needed
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    }
  };

  const [recentOrders, setRecentOrders] = useState([]);

  // ================= FETCH DASHBOARD DATA =================
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);

        // Fetch recent orders
        const ordersRes = await axios.get("http://localhost:8080/orders/all?page=0&size=5", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecentOrders(ordersRes.data.content);

      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  // ================= PREPARE CHART DATA =================
  const salesData = Object.keys(stats.monthlySales || {}).map(month => ({
    name: month,
    revenue: stats.monthlySales[month]
  }));

  const pieData = [
    { name: 'New', value: stats.newOrders || 0 },
    { name: 'Pending', value: stats.pendingOrders || 0 },
    { name: 'Completed', value: stats.completedOrders || 0 },
    { name: 'Cancelled', value: stats.cancelledOrders || 0 },
  ].filter(item => item.value > 0);

  const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'];

  return (
    <div className="bg-gray-50 min-h-screen relative font-sans">
      <AdminNavBar />

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 font-serif">Dashboard Overview</h1>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-green-100 text-green-600 rounded-full text-2xl"><FaMoneyBillWave /></div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full text-2xl"><FaBoxOpen /></div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full text-2xl"><FaBook /></div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Books</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalBooks}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full text-2xl"><FaUsers /></div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>

        {/* ================= CHARTS SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Analytics</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Status</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600"><span>Total:</span> <span className="font-semibold">{stats.totalOrders}</span></div>
            </div>
          </div>
        </div>

        {/* ================= RECENT ORDERS ================= */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 font-serif">Recent Orders</h3>
            <button onClick={() => navigate("/admin/orders/total")} className="text-sm text-primary hover:underline font-medium">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user?.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">₹{order.totalPayable}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No recent orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= QUICK LINKS GRID ================= */}
        <h3 className="text-xl font-bold text-gray-800 mb-4 font-serif">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <QuickActionCard title="All Orders" count={stats.totalOrders} onClick={() => navigate("/admin/orders/total")} color="bg-blue-50 text-blue-600" />
          <QuickActionCard title="New Orders" count={stats.newOrders} onClick={() => navigate("/admin/orders/new")} color="bg-yellow-50 text-yellow-600" />
          <QuickActionCard title="Pending" count={stats.pendingOrders} onClick={() => navigate("/admin/orders/pending")} color="bg-orange-50 text-orange-600" />
          <QuickActionCard title="Cancelled" count={stats.cancelledOrders} onClick={() => navigate("/admin/orders/cancelled")} color="bg-red-50 text-red-600" />
          <QuickActionCard title="Completed" count={stats.completedOrders} onClick={() => navigate("/admin/orders/completed")} color="bg-green-50 text-green-600" />
          <QuickActionCard title="Manage Books" count={stats.totalBooks} onClick={() => navigate("/admin/books")} color="bg-purple-50 text-purple-600" />
        </div>
      </div>

      {/* ================= FLOATING ADD BUTTON ================= */}
      <button
        onClick={() => setModal(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all z-50 flex items-center justify-center"
      >
        <FaCirclePlus size={28} />
      </button>

      {/* ================= MODAL ================= */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[500px] rounded-2xl p-8 shadow-2xl animate-scaleIn">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 font-serif">Add New Book</h2>

            <div className="space-y-4">
              <input name="title" placeholder="Book Title" onChange={handleChange} className="input" />
              <input name="author" placeholder="Author Name" onChange={handleChange} className="input" />
              <div className="grid grid-cols-2 gap-4">
                <input name="genre" placeholder="Genre" onChange={handleChange} className="input" />
                <input name="price" placeholder="Price (₹)" type="number" onChange={handleChange} className="input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="quantity" placeholder="Quantity" type="number" onChange={handleChange} className="input" />
                <input name="imageUrl" placeholder="Image URL" onChange={handleChange} className="input" />
              </div>
              <textarea name="description" placeholder="Book Description" onChange={handleChange} className="input h-24 pt-2" />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setModal(false)} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition">
                Cancel
              </button>
              <button onClick={handleAddBook} className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-slate-800 transition shadow-md">
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const QuickActionCard = ({ title, count, onClick, color }) => (
  <div onClick={onClick} className={`p-4 rounded-xl cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-gray-200 ${color} bg-opacity-50`}>
    <h4 className="font-semibold text-sm mb-1">{title}</h4>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

export default Admin;
