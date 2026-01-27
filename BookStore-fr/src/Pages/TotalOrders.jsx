import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import axios from "axios";

const TotalOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async (pageNumber = 0) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8080/orders/all?page=${pageNumber}&size=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(response.data.content); // paginated content
      setTotalPages(response.data.totalPages);
      setPage(response.data.number);
    } catch (err) {
      console.error("Unable to fetch data from the backend:", err);
    }
  };

  useEffect(() => {
    fetchOrders(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Total Orders</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="text-center hover:bg-gray-100 transition border"
                  >
                    <td className="p-3 border font-semibold text-gray-800">{order.id}</td>
                    <td className="p-3 border text-gray-600">{order.user?.email || "N/A"}</td>
                    <td className="p-3 border text-gray-600">
                      {order.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A"}
                    </td>
                    <td className="p-3 border text-gray-600">
                      {order.item && order.item.length > 0
                        ? order.item.map((i, idx) => (
                            <div key={idx}>
                              {i.book?.title} x {i.quantity}
                            </div>
                          ))
                        : "No items"}
                    </td>
                    <td
                      className={`p-3 border font-medium ${
                        order.status === "COMPLETED"
                          ? "text-green-600"
                          : order.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500 italic">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => fetchOrders(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => fetchOrders(page + 1)}
            disabled={page + 1 === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalOrders;
