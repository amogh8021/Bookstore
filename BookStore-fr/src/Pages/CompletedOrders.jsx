import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCompletedOrders = async (pageNumber = 0) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/orders/completed?page=${pageNumber}&size=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(response.data.content);
      setTotalPages(response.data.totalPages);
      setPage(response.data.number);
    } catch (err) {
      console.log("Error fetching completed orders:", err);
    }
  };

  useEffect(() => {
    fetchCompletedOrders(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Completed Orders</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Items</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="text-center border hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border">{order.id}</td>
                    <td className="p-3 border">{order.user?.email}</td>

                    <td className="p-3 border">
                      {new Date(order.orderDate).toLocaleString()}
                    </td>

                    <td className="p-3 border">
                      {order.item?.map((i, index) => (
                        <div key={index}>
                          {i.book?.title} × {i.quantity}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    No Completed Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => fetchCompletedOrders(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => fetchCompletedOrders(page + 1)}
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

export default CompletedOrders;
