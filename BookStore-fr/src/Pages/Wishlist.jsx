import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistCard from '../Components/WishlistCard';
import NavBar from '../Components/NavBar';
import { getWishlist } from '../Services/wishlistService';
import { toast } from "react-toastify";

const Wishlist = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist();
        setData(response.data);
      } catch (err) {
        console.log("Error fetching wishlist:", err);
        // toast.error("Failed to load wishlist"); // Optional: depends on UX preference
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = (bookId) => {
    setData(prev => prev.filter(book => book.id !== bookId));
  };

  const handleExplore = () => {
    navigate('/shop');
  };

  return (
    <>
      <NavBar />
      <div className='p-6 md:p-12 bg-background min-h-screen'>
        {/* Heading */}
        <h1 className='text-3xl md:text-4xl font-bold font-serif text-primary mb-8 text-center md:text-left border-b border-gray-100 pb-4'>
          My Wishlist
        </h1>

        {/* Cards container */}
        {data.length === 0 ? (
          <div className='flex flex-col items-center justify-center mt-20 gap-6 animate-fadeIn'>
            <p className='text-secondary text-lg'>Your wishlist is empty! Explore books to add here.</p>
            <button
              onClick={handleExplore}
              className='bg-primary text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-all duration-300 shadow-lg transform hover:-translate-y-1'
            >
              Explore Books
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {data.map((book) => (
              <WishlistCard key={book.id} book={book} remove={handleRemove} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
