import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { AiOutlineHeart } from "react-icons/ai";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import { getFeaturedBooks } from "../Services/bookService";
import { addToCart } from "../Services/cartService";
import { addToWishlist } from "../Services/wishlistService";

const FeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    getFeaturedBooks()
      .then((res) => setFeaturedBooks(res.data.content || []))
      .catch(() => toast.error("Unable to retrieve featured books"));
  }, []);

  // ❤️ Wishlist
  const handleWishlist = async (book) => {
    try {
      await addToWishlist(book.id);
      toast.success("Added to wishlist ❤️");
    } catch {
      toast.error("Already in wishlist or error");
    }
  };

  // 🛒 Cart
  const handleAddToCart = async (book) => {
    try {
      await addToCart(book.id, 1);
      toast.success("Added to cart");
    } catch {
      toast.error("Try again!");
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center font-serif">
        📚 Featured Books
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 2500 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="py-4"
      >
        {featuredBooks.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="relative bg-white border border-gray-100 rounded-xl shadow-sm p-4 m-5 flex flex-col items-center h-[380px] hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

              {/* ❤️ Wishlist */}
              <button
                onClick={() => handleWishlist(book)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 hover:text-red-500 transition text-gray-400"
              >
                <AiOutlineHeart className="w-5 h-5" />
              </button>

              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-32 h-48 object-cover rounded-md shadow-md mb-3"
              />

              <h3 className="mt-2 text-md font-semibold text-center line-clamp-2 text-gray-800 px-2 h-12 flex items-center justify-center">
                {book.title}
              </h3>

              <p className="text-xs text-secondary mt-1">{book.author}</p>
              <p className="font-bold text-accent text-lg mt-1">₹{book.price}</p>

              <button
                onClick={() => handleAddToCart(book)}
                className="mt-auto bg-primary text-white px-6 py-2 rounded-full hover:bg-slate-800 transition shadow-md w-full"
              >
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedBooks;
