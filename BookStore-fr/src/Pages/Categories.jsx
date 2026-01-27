import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/book/genres",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-xl font-semibold">Loading categories...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Listed Categories
        </h1>

        {categories.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Category Name</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category, idx) => (
                  <tr
                    key={idx}
                    className="text-center border hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border">{idx + 1}</td>
                    <td className="p-3 border">{category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 italic">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
