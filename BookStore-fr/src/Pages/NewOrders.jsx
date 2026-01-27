import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavBar from "./AdminNavbar";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNewOrders = async (pageNumber = 0) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/orders/neworders?page=${pageNumber}&size=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(response.data.content); // now paginated content
      setTotalPages(response.data.totalPages);
      setPage(response.data.number);
    } catch (err) {
      console.log("Error fetching new orders:", err);
    }
  };

  useEffect(() => {
    fetchNewOrders(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">New Orders</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border border-gray-300">
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
                    className="text-center border hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border font-semibold text-gray-800">
                      {order.id}
                    </td>
                    <td className="p-3 border text-gray-600">
                      {order.user?.email || "N/A"}
                    </td>
                    <td className="p-3 border text-gray-600">
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="p-3 border text-gray-600">
                      {order.item?.map((i, idx) => (
                        <div key={idx}>
                          {i.book?.title} × {i.quantity}
                        </div>
                      ))}
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
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    No New Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => fetchNewOrders(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => fetchNewOrders(page + 1)}
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

export default NewOrders;
