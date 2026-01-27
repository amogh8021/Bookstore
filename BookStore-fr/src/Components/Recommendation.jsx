import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Recommendation = () => {

  const navigate = useNavigate();
  const [booksData, setBooksData] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/book/list");
      const booksArray = Array.isArray(response.data)
        ? response.data
        : response.data.content || [];
      setBooksData(booksArray);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


 

  // 📌 WISHLIST HANDLER
  const handleWishlist = async (book) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8080/api/wishlist/add?bookId=${book.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Unable to add to wishlist");
    }
  };

  // 📌 ADD TO CART HANDLER
  const handleAddToCart = async (book) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/cart/add",
        {
          book_id: book.id,
          items: 1,
          discountPercent: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart successfully");
    } catch (err) {
      console.error(err);
      toast.error("Try again!");
    }
  };

  return (
    <div className="recommendation-section p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Recommendation for you</h1>
        <button
        onClick={()=>navigate("/shop")}
        className="hidden md:flex text-[#AD7D42] border border-[#AD7D42] px-4 py-2 rounded-2xl items-center gap-2 hover:bg-[#AD7D42] hover:text-white transition">
          View All <IoIosArrowRoundForward className="text-2xl" />
        </button>
      </div>




      {booksData.length > 0 && (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={booksData.length > 1}
          navigation
          autoplay={{ delay: 1000, disableOnInteraction: true }}
          breakpoints={{
            640: { slidesPerView: 2, loop: booksData.length > 2 },
            1024: { slidesPerView: 4, loop: booksData.length > 4 },
          }}
        >
          {booksData.map((book) => (
            <SwiperSlide key={book.id}>
              <div
              className="border-2 h-[400px] mx-auto rounded-xl shadow-md p-4 flex flex-col items-center mt-2 relative">
                <img    
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-56 object-cover rounded-md"
                  loading="lazy"
                
                />

                <h2 className="mt-2 text-center text-xl font-medium text-gray-700 line-clamp-1">
                  {book.title}
                </h2>
                <h3 className="text-lg font-semibold">₹ {book.price}</h3>

                {/* ❤️ Wishlist + Share Buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                  
                    className="bg-white p-2 rounded-full shadow-md hover:scale-110 hover:bg-pink-500 transition"
                    onClick={() => handleWishlist(book)}
                  >
                    <AiOutlineHeart className="w-5 h-5 text-red-500" />
                  </button>

                  <button className="bg-white p-2 rounded-full shadow-md hover:scale-110 hover:bg-blue-500 transition">
                    <FiShare2 className="w-5 h-5 text-blue-500" />
                  </button>
                </div>

                {/* 🛒 Add to Cart */}
                <button
                  onClick={() => handleAddToCart(book)}
                  className="bg-blue-600 text-white mt-4 px-5 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      

      <button
      onClick={()=>navigate("/shop")}
      className="flex md:hidden items-center justify-center bg-[#AD7D42] h-10 w-full text-white rounded-2xl mt-6">
        View All <IoIosArrowRoundForward className="ml-2 text-2xl" />
      </button>
    </div>
  );
};

export default Recommendation;
