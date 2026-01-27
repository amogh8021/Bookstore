import React, { useState } from 'react';
import { toast } from "react-toastify";
import { removeFromWishlist } from '../Services/wishlistService';
import { addToCart } from '../Services/cartService';

const WishlistCard = ({ book, remove }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (bookId) => {
    try {
      setLoading(true);
      const response = await removeFromWishlist(bookId);
      console.log(response.data);
      toast.success(response.data);
      remove(bookId); // remove from UI
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove book from wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      await addToCart(bookId, 1);
      toast.success("Added to cart successfully");
    } catch (err) {
      console.error(err);
      toast.error("Try again!");
    }
  };

  return (
    <div className='bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row gap-4 md:gap-6 p-4 hover:shadow-lg transition-all duration-300'>
      <div className="img flex-shrink-0">
        <img
          src={book.imageUrl || "/default.jpg"}
          alt={book.title}
          className='w-full md:w-32 h-40 md:h-48 object-cover rounded-lg shadow-md'
        />
      </div>

      <div className="content flex flex-col justify-between flex-1">
        <div>
          <h1 className='font-bold text-lg text-primary line-clamp-2'>{book.title}</h1>
          <p className='text-sm text-secondary line-clamp-1 mt-1'>{book.author}</p>
          <h2 className='text-accent font-bold text-xl mt-2'>₹{book.price}</h2>
          <p className='text-gray-500 text-sm mt-2 line-clamp-2'>{book.description}</p>
        </div>

        <div className="flex align-center justify-end gap-3 mt-4">
          <button
            onClick={() => handleClick(book.id)}
            disabled={loading}
            className='bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium'
          >
            {loading ? "Removing..." : "Remove"}
          </button>
          <button
            onClick={() => handleAddToCart(book.id)}
            className='bg-primary text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 text-sm font-medium shadow-sm'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
