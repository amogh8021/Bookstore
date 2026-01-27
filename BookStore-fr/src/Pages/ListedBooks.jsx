import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import { toast } from "react-toastify";
import { FaTrash, FaStar } from "react-icons/fa";
import { searchBooks, deleteBook, setFeatured } from "../Services/bookService";

const ListedBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async (pageNumber = 0) => {
    try {
      setLoading(true);
      const response = await searchBooks({ page: pageNumber, size: pageSize });

      setBooks(response.data.content);
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      toast.error("Unable to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(0);
  }, []);

  /* ================= DELETE BOOK ================= */
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);

      toast.success("Book deleted successfully");
      fetchBooks(page);
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  /* ================= FEATURED TOGGLE ================= */
  const toggleFeatured = async (bookId, currentStatus) => {
    try {
      await setFeatured(bookId, !currentStatus);

      toast.success(
        !currentStatus
          ? "Book marked as featured ⭐"
          : "Book removed from featured"
      );

      fetchBooks(page);
    } catch (err) {
      toast.error("Unable to update featured status");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavBar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-primary font-serif">
          Listed Books
        </h1>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {books.length > 0 ? (
                books.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 whitespace-nowrap font-medium text-primary">
                      {book.title}
                    </td>
                    <td className="p-3 whitespace-nowrap text-secondary">{book.author}</td>
                    <td className="p-3 whitespace-nowrap text-secondary">{book.genre}</td>
                    <td className="p-3 whitespace-nowrap text-accent font-bold">₹{book.price}</td>
                    <td className="p-3 whitespace-nowrap text-secondary">{book.quantity}</td>
                    <td className="p-3 whitespace-nowrap text-secondary">
                      {book.publishedDate
                        ? new Date(book.publishedDate).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* ===== FEATURED ===== */}
                    <td className="p-3 whitespace-nowrap text-center">
                      <button
                        onClick={() =>
                          toggleFeatured(book.id, book.featured)
                        }
                        className={`p-2 rounded-full transition-all duration-200 ${book.featured
                          ? "bg-amber-100 text-amber-500"
                          : "bg-gray-100 text-gray-400"
                          } hover:scale-110`}
                        title="Toggle Featured"
                      >
                        <FaStar />
                      </button>
                    </td>

                    {/* ===== ACTIONS ===== */}
                    <td className="p-3 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Book"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => fetchBooks(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 text-primary"
          >
            Previous
          </button>

          <span className="font-medium flex items-center text-primary">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => fetchBooks(page + 1)}
            disabled={page + 1 === totalPages}
            className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 text-primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListedBooks;
