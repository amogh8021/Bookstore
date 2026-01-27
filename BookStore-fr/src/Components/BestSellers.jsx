import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { AiOutlineHeart } from "react-icons/ai";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import { getBestSellers } from "../Services/bookService";
import { addToCart } from "../Services/cartService";
import { addToWishlist } from "../Services/wishlistService";

const BestSellers = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBestSellers()
      .then((res) => setBooks(res.data || []))
      .catch(() => toast.error("Failed to fetch bestsellers"));
  }, []);

  // ❤️ Wishlist
  const handleWishlist = async (book) => {
    try {
      await addToWishlist(book.id);
      toast.success("Added to wishlist ❤️");
    } catch {
      toast.error("Wishlist error");
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

  if (!books.length) return null;

  return (
    <div className="p-8 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-primary font-serif">🔥 Best Sellers</h2>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        loop
        autoplay={{ delay: 2000 }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="py-4"
      >
        {books.map((book, index) => (
          <SwiperSlide key={book.id}>
            <div className="relative bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center h-[340px] hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

              {/* 🏷 Bestseller badge */}
              <span className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm ${index === 0 ? "bg-red-500" :
                  index === 1 ? "bg-amber-500" :
                    index === 2 ? "bg-emerald-500" : "bg-gray-400"
                }`}>
                #{index + 1}
              </span>

              {/* ❤️ Wishlist */}
              <button
                onClick={() => handleWishlist(book)}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
              >
                <AiOutlineHeart className="text-xl" />
              </button>

              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-28 h-40 object-cover rounded shadow-md mt-2"
              />

              <h3 className="mt-3 text-sm font-semibold text-center line-clamp-2 text-primary px-1 h-10 flex items-center justify-center">
                {book.title}
              </h3>

              <p className="mt-1 font-bold text-accent text-lg">
                ₹{book.price}
              </p>

              <button
                onClick={() => handleAddToCart(book)}
                className="mt-auto bg-primary text-white px-4 py-1.5 rounded-full hover:bg-slate-800 transition text-sm w-full shadow-sm"
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

export default BestSellers;
