import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { jsPDF } from "jspdf";

const OrderPlacedPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/orders/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load order");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <p className="p-8 text-center text-gray-500">
        Loading order details...
      </p>
    );
  }

  if (!order || !order.item) return null;

  
  const subtotal = Number(order.subTotal ?? 0);
  const discountAmount = Number(order.discountAmount ?? 0);
  const finalTotal = Number(order.totalPayable ?? 0);


const downloadReceipt = () => {
  if (!order) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  // Force clean font
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);

  let y = 40;

  doc.text("ORDER RECEIPT", 300, y, { align: "center" });
  y += 30;

  doc.setFontSize(11);
  doc.text(`Order ID: ${order.id}`, 40, y); y += 18;
  doc.text(`Date: ${new Date(order.orderDate).toLocaleString()}`, 40, y); y += 18;
  doc.text(`Status: ${order.status}`, 40, y); y += 18;

  if (order.appliedCoupon) {
    doc.text(`Applied Coupon: ${order.appliedCoupon}`, 40, y);
    y += 18;
  }

  y += 10;
  doc.text("Items:", 40, y);
  y += 15;

  order.item.forEach((item) => {
    const price = Number(item.pricePerUnit ?? item.book?.price ?? 0);
    const qty = item.quantity ?? 0;
    const finalPrice = Number(item.finalPrice ?? price * qty);

    const line = `${item.book?.title} - Rs ${price.toFixed(2)} x ${qty} = Rs ${finalPrice.toFixed(2)}`;

    // 👇 THIS fixes spacing issues
    const wrappedText = doc.splitTextToSize(line, 500);
    doc.text(wrappedText, 40, y);
    y += wrappedText.length * 14;
  });

  y += 15;
  doc.text(`Subtotal: Rs ${subtotal.toFixed(2)}`, 40, y); y += 16;

  if (discountAmount > 0) {
    doc.text(`Discount: - Rs ${discountAmount.toFixed(2)}`, 40, y);
    y += 16;
  }

  doc.setFontSize(12);
  doc.text(`Total Payable: Rs ${finalTotal.toFixed(2)}`, 40, y);

  doc.save(`Order_${order.id}_Receipt.pdf`);
};


  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 lg:p-10 rounded-xl shadow-md">
        {/* Success */}
        <div className="flex flex-col items-center gap-4 text-center">
          <AiOutlineCheckCircle className="text-green-500 text-6xl" />
          <h1 className="text-3xl font-bold">Order Placed Successfully</h1>
          <p className="text-gray-600">
            Thank you for shopping with us 🎉
          </p>
        </div>

        {/* Meta */}
        <div className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Order ID</span>
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-medium">
              {new Date(order.orderDate).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status</span>
            <span className="font-medium text-green-600">
              {order.status}
            </span>
          </div>
          {order.appliedCoupon && (
            <div className="flex justify-between">
              <span>Applied Coupon</span>
              <span className="font-medium text-blue-600">
                {order.appliedCoupon}
              </span>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Items</h2>

          <div className="divide-y">
            {order.item.map((item, idx) => {
              // Use the prices from CartItem that were saved in the order
              const pricePerUnit = Number(item.pricePerUnit ?? item.book?.price ?? 0);
              const qty = item.quantity ?? 0;
              const itemTotal = Number(item.totalPrice ?? pricePerUnit * qty);
              const itemFinalPrice = Number(item.finalPrice ?? itemTotal);
              const itemDiscount = itemTotal - itemFinalPrice;

              return (
                <div
                  key={idx}
                  className="flex justify-between py-3 text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium">
                      {item.book?.title}
                    </p>
                    <p className="text-gray-500">
                     Rs{pricePerUnit.toFixed(2)} × {qty}
                    </p>
                    {itemDiscount > 0 && (
                      <p className="text-green-600 text-xs">
                        SavedRs{itemDiscount.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {itemDiscount > 0 ? (
                      <>
                        <p className="line-through text-gray-400 text-xs">
                         Rs{itemTotal.toFixed(2)}
                        </p>
                        <p className="font-medium">
                         Rs{itemFinalPrice.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="font-medium">
                       Rs{itemTotal.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-Rs{discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-lg font-semibold border-t pt-3">
            <span>Total Payable</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Continue Shopping
          </button>

           <button
            onClick={downloadReceipt}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            DownloadReceipt
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-lg"
          >
            View My Orders
          </button>

         
          
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedPage;