
import React from "react";
import img from "../Components/assets/4.jpg";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";


const CartCard = ({ item, book }) => {
  return (
    <div className="card flex flex-row items-center justify-between w-full gap-4 p-3 border-b md:border-2 rounded-md md:rounded-xl shadow-sm md:shadow-md hover:shadow-lg transition-shadow">
      {/* image section */}
      <div className="img w-16 h-20 md:w-28 md:h-36 flex-shrink-0">
        <img
          src={book?.imageUrl}   
          alt={book?.title || "book"}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* details + quantity + price compact */}
      <div className="flex flex-col flex-1 gap-1 text-left">
        <h1 className="text-sm md:text-lg font-semibold">{book?.title}</h1>
        <p className="text-xs md:text-sm text-gray-600">
          {book?.author} • {book?.genre}
        </p>

        {/* Mobile: show price + qty inline */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs md:text-base font-medium text-gray-700">
            ₹{book?.price}
          </span>

          <div className="quantity flex items-center gap-2 text-sm md:text-lg">
            <button className="text-green-600 hover:scale-110 transition-transform">
              <CiCirclePlus className="text-xl md:text-2xl" />
            </button>
            <span className="font-semibold">{item.quantity}</span>
            <button className="text-red-600 hover:scale-110 transition-transform">
              <CiCircleMinus className="text-xl md:text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop only: show remove + total separately */}
      <div className=" md:flex flex-col items-end gap-2">
        <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors">
          Remove
        </button>
        <h1 className="font-semibold text-gray-800">₹{item.totalPrice}</h1>
      </div>
    </div>
  );
};
export default CartCard;
