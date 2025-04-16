// pages/orders.js
import Layout from "@/components/layout";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  // Simulating data fetching
  useEffect(() => {
    const fetchOrders = async () => {
      // Mock order data (replace with your API call in a real scenario)
      const mockOrders = [
        {
          _id: "1",
          customerName: "John Doe",
          email: "john@example.com",
          products: [
            { productId: { title: "Product 1" }, quantity: 2 },
            { productId: { title: "Product 2" }, quantity: 1 },
          ],
          totalAmount: 150,
          status: "Pending",
          createdAt: "2025-04-08T12:34:00Z",
        },
        {
          _id: "2",
          customerName: "Jane Smith",
          email: "jane@example.com",
          products: [
            { productId: { title: "Product 3" }, quantity: 3 },
            { productId: { title: "Product 4" }, quantity: 2 },
          ],
          totalAmount: 230,
          status: "Shipped",
          createdAt: "2025-04-07T10:00:00Z",
        },
      ];
      setOrders(mockOrders);
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="font-sans p-5 mt-10 md:mt-0">
        <h1 className="text-2xl text-teal-600 mb-5">Orders</h1>
        {orders.length === 0 ? (
          <p className="text-teal-600 text-lg">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-xl font-semibold text-teal-600">{order.customerName}</h2>
                <p className="text-gray-700">Email: {order.email}</p>
                <div className="my-4">
                  <h3 className="font-medium text-teal-600">Products:</h3>
                  {order.products.map((product, index) => (
                    <div key={index} className="text-gray-700">
                      {product.productId.title} - Quantity: {product.quantity}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-teal-600">${order.totalAmount}</p>
                  <span
                    className={`inline-block px-3 py-1 text-white rounded-full ${
                      order.status === "Shipped" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 mt-2">
                  Created at: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
