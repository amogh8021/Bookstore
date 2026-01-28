import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async (pageNumber = 0) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8080/api/v1/auth/users?page=${pageNumber}&size=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.content) {
        setUsers(res.data.content);
        setPage(res.data.number);
        setTotalPages(res.data.totalPages);
      } else {
        setUsers([]);
      }

    } catch (err) {
      console.error("Error fetching users:", err);
      const status = err.response ? err.response.status : "Unknown";
      if (status === 403) {
        setError("Access Denied (403). Please Log Out and Login again to refresh your Admin permissions.");
      } else {
        setError(`Failed to load users. Status: ${status}. Check console for details.`);
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />
      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-serif">All Users</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">ID</th>
                <th className="p-4 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Email</th>
                <th className="p-4 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Name</th>
                <th className="p-4 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                // Simple skeleton loader for table rows
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-red-500 font-medium">
                    {error}
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-600 font-medium">#{u.id}</td>
                    <td className="p-4 text-gray-700">{u.email}</td>
                    <td className="p-4 text-gray-700 font-medium">{u.name}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-bold uppercase ${u.role === "ADMIN"
                          ? "bg-red-500"
                          : u.role === "USER"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                          }`}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500 italic">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && users.length > 0 && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => fetchUsers(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 text-gray-700 transition"
            >
              Previous
            </button>

            <span className="flex items-center text-sm font-medium text-gray-700">
              Page {page + 1} of {totalPages}
            </span>

            <button
              onClick={() => fetchUsers(page + 1)}
              disabled={page + 1 === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 text-gray-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
