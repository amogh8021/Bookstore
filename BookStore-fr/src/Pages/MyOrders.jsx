import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import { getMyOrders } from '../Services/orderService';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();
        // Backend returns Page<Order>, so we typically access response.data.content or response.data if it's a list
        // Based on OrderController, it returns Page<Order>
        setOrders(response.data.content || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary font-serif">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">You have no past orders.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <div>
                    <p className="font-bold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Placed on: {new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'}`}>
                    {order.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-gray-700">Total Amount: <span className="text-accent text-xl">₹{order.totalPayable}</span></p>
                </div>

                <button
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;
