import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineFilter, AiOutlineArrowUp } from "react-icons/ai";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { getGenres, searchBooks, getBestSellers, getAuthors } from "../Services/bookService";
import { addToCart } from "../Services/cartService";
import BookSkeleton from "../Components/BookSkeleton";

const ShopPage = () => {
  const [searchParams] = useSearchParams();

  const [genre, setGenres] = useState([]);
  const [authorsList, setAuthorsList] = useState([]); // Dynamic authors
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get("genre") || "");
  const [selectedAuthor, setSelectedAuthor] = useState(searchParams.get("author") || "");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 12;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [sortBy, setSortBy] = useState("title");
  const [direction, setDirection] = useState("asc");
  const [isBestSeller, setIsBestSeller] = useState(false);

  // Fetch genres and authors from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresRes, authorsRes] = await Promise.all([getGenres(), getAuthors()]);
        setGenres(genresRes.data);
        setAuthorsList(authorsRes.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchData();
  }, []);

  // Handle Scroll to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch books (normal + bestseller)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let res;

        if (isBestSeller) {
          res = await getBestSellers(size);
          setBooks(res.data);
          setTotalPages(1);
        } else {
          const params = { page, size, sortBy, direction };
          if (selectedGenre) params.genre = selectedGenre;
          if (selectedAuthor) params.author = selectedAuthor;
          if (searchTerm) params.title = searchTerm;
          if (minPrice) params.minPrice = minPrice;
          if (maxPrice) params.maxPrice = maxPrice;

          res = await searchBooks(params);
          setBooks(res.data.content);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(() => {
      fetchBooks();
    }, 500); // 500ms debounce/delay for smoother UX
    return () => clearTimeout(timer);
  }, [selectedGenre, selectedAuthor, searchTerm, minPrice, maxPrice, page, sortBy, direction, isBestSeller]);

  // Add to cart
  const handleAddToCart = async (book) => {
    try {
      if (!book) return toast.error("Something went wrong!");

      await addToCart(book.id, 1, 0);

      toast.success("Added to cart successfully");
    } catch (err) {
      console.error(err);
      toast.error("Try again!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-background min-h-screen flex flex-col md:flex-row p-4 md:p-12 gap-6 relative">

        {/* Sidebar Filters */}
        <div
          className={`bg-white p-4 rounded-lg shadow-md md:w-64 flex-shrink-0 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            } md:block fixed md:relative top-0 left-0 h-full z-50`}
        >
          <div className="flex justify-between md:hidden mb-4">
            <h2 className="font-bold text-lg font-serif">Filters</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <AiOutlineClose size={20} />
            </button>
          </div>

          {/* Genres */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2 font-serif text-primary">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genre.slice(0, 10).map((g) => (
                <div
                  key={g}
                  onClick={() => { setSelectedGenre(g === selectedGenre ? "" : g); setPage(0); }}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer border transition-colors ${selectedGenre === g
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {g}
                </div>
              ))}
            </div>
          </div>

          {/* Authors */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2 font-serif text-primary">Authors</h3>
            <div className="flex flex-wrap gap-2">
              {authorsList.map((a) => (
                <div
                  key={a}
                  onClick={() => { setSelectedAuthor(a === selectedAuthor ? "" : a); setPage(0); }}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer border transition-colors ${selectedAuthor === a
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold mb-2 font-serif text-primary">Price</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setPage(0); }}
                className="input w-20 py-1"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setPage(0); }}
                className="input w-20 py-1"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Search */}
          <div className="flex md:hidden justify-between mb-4 gap-2">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
              className="input"
            />
            <button onClick={() => setSidebarOpen(true)} className="px-3 py-2 bg-primary text-white rounded-lg">
              <AiOutlineFilter size={20} />
            </button>
          </div>

          {/* Desktop Search & Sort */}
          <div className="hidden md:flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
              className="input md:w-96"
            />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-secondary">Sort by:</span>
              <select
                className="border rounded px-2 py-1 focus:outline-none bg-white"
                value={sortBy}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "bestSeller") {
                    setIsBestSeller(true);
                    setSortBy("bestSeller");
                    setPage(0);
                  } else {
                    const [s, d] = value.split("-");
                    setSortBy(s);
                    setDirection(d);
                    setIsBestSeller(false);
                    setPage(0);
                  }
                }}
              >
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="title-asc">Title: A → Z</option>
                <option value="title-desc">Title: Z → A</option>
                <option value="bestSeller">Best Seller</option>
              </select>
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              // Render skeletons while loading
              Array.from({ length: 8 }).map((_, idx) => (
                <BookSkeleton key={idx} />
              ))
            ) : books.length === 0 ? (
              <div className="col-span-full text-center mt-10 text-gray-500">
                <p>No books found.</p>
              </div>
            ) : (
              books.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02] flex flex-col border border-gray-100"
                >
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 flex flex-col flex-1">
                    <h2 className="text-sm font-bold text-primary line-clamp-2 font-serif">{book.title}</h2>
                    <p className="text-secondary text-xs mb-2">by {book.author}</p>
                    <p className="text-accent font-bold text-sm mt-auto">₹{book.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {!isBestSeller && !loading && books.length > 0 && (
            <div className="flex justify-center mt-6 gap-3">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                disabled={page === 0}
              >
                Prev
              </button>
              <span className="px-4 py-2 font-semibold text-primary">Page {page + 1} of {totalPages}</span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                disabled={page + 1 >= totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative p-6 animate-scaleIn">
              <button onClick={() => setSelectedBook(null)} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                <AiOutlineClose size={22} />
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <img src={selectedBook.imageUrl} alt={selectedBook.title} className="w-full md:w-1/3 h-64 object-cover rounded-xl" />
                <div className="flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-primary mb-2 font-serif">{selectedBook.title}</h2>
                  <p className="text-secondary mb-1 font-medium">by {selectedBook.author}</p>
                  <p className="text-gray-500 text-sm mb-3 px-2 py-1 bg-gray-100 rounded-full w-fit">{selectedBook.genre}</p>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{selectedBook.description}</p>
                  <h3 className="text-accent text-2xl font-bold mb-4">₹{selectedBook.price}</h3>
                  <button onClick={() => handleAddToCart(selectedBook)} className="btn-primary w-full md:w-auto">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-accent text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-all z-50 animate-bounce"
            aria-label="Scroll to top"
          >
            <AiOutlineArrowUp size={24} />
          </button>
        )}
      </div>
    </>
  );
};

export default ShopPage;
