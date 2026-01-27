import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateQuantity, clearCart, applyCoupon } from "../Services/cartService";
import { createOrder } from "../Services/orderService";
import { toast } from "react-toastify";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // coupon discount
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      console.log(response);
      setItems(response.data.items || []);
      setCouponApplied(false);
      setAppliedDiscount(0);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeFromCart(bookId);
      fetchCart();
      toast.info("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (bookId, newQty) => {
    if (newQty < 1) return;
    try {
      const response = await updateQuantity(bookId, newQty);
      setItems(response.data.items); // update items dynamically
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setItems([]);
      setCouponApplied(false);
      setAppliedDiscount(0);
      toast.info("Cart cleared");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };

  // ✅ Apply Coupon
  const handleApplyCoupon = async () => {
    if (!couponCode) return toast.warning("Enter coupon code");

    try {
      const response = await applyCoupon(couponCode);

      // Fix: calculate applied discount from backend response
      const discount = response.data.items.reduce((sum, item) => {
        const total = item.totalPrice ?? 0;
        const final = item.finalPrice ?? total;
        return sum + (total - final);
      }, 0);

      setAppliedDiscount(discount);
      setCouponApplied(true);
      setItems(response.data.items || []);
      toast.success(`Coupon applied! You got ₹${discount} off`);
    } catch (err) {
      console.error(err);
      toast.error("Invalid or expired coupon");
    }
  };

  // ✅ Price calculations
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.pricePerUnit ?? Math.round((item.totalPrice ?? 0) / (item.quantity ?? 1));
    const total = item.finalPrice ?? item.totalPrice ?? unitPrice * (item.quantity ?? 0);
    return sum + total;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 49;
  const grandTotal = subtotal - appliedDiscount + shipping;

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-primary">Shopping Bag</h2>
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-500 text-sm hover:underline font-medium hover:text-red-700 transition"
              >
                Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">Your cart is empty</p>
              <button onClick={() => navigate('/shop')} className="mt-4 text-primary font-medium hover:underline">Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg flex-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  className={`bg-primary text-white px-6 py-2 rounded-lg font-medium transition shadow-sm ${couponApplied ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-800"
                    }`}
                >
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {items.map((item) => {
                  const unitPrice = item.pricePerUnit ?? Math.round((item.totalPrice ?? 0) / (item.quantity ?? 1));
                  const totalPrice = item.finalPrice ?? item.totalPrice ?? unitPrice * (item.quantity ?? 0);

                  return (
                    <div
                      key={item.itemId}
                      className="flex items-center justify-between border-b border-gray-100 pb-6 last:border-0"
                    >
                      <div className="flex items-center gap-6">
                        <img
                          src={item.book?.imageUrl}
                          alt={item.book?.title ?? item.bookTitle}
                          className="w-20 h-28 object-cover rounded-lg shadow-md"
                        />
                        <div>
                          <h3 className="font-bold text-lg text-primary">{item.book?.title ?? item.bookTitle}</h3>
                          <p className="text-sm text-secondary mt-1">
                            {item.book?.author} • {item.book?.genre}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Unit Price: ₹{unitPrice}
                          </p>
                          <button
                            onClick={() => handleRemove(item.bookId)}
                            className="mt-3 text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition"
                          >
                            <MdDelete className="text-xl" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.bookId, item.quantity - 1)
                            }
                            className="text-secondary hover:text-primary transition"
                          >
                            <CiCircleMinus className="text-2xl" />
                          </button>
                          <span className="font-semibold text-lg w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.bookId, item.quantity + 1)
                            }
                            className="text-secondary hover:text-primary transition"
                          >
                            <CiCirclePlus className="text-2xl" />
                          </button>
                        </div>
                        <div className="font-bold text-xl text-accent mt-2">
                          ₹{totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
          <h2 className="text-xl font-serif font-bold mb-6 text-primary">Order Summary</h2>
          <div className="border-t border-gray-100 pt-4 space-y-3 text-secondary">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{appliedDiscount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-primary border-t border-gray-100 pt-4 mt-2">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={async () => {
              if (items.length === 0) {
                toast.warning("Your cart is empty. Add items before checkout.");
                return;
              }
              try {
                const response = await createOrder();
                navigate(`/order/${response.data.id}`);
              } catch (err) {
                console.error(err);
                toast.error("Order placement failed. Try again.");
              }
            }}
            className="w-full mt-8 bg-accent hover:bg-yellow-600 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
