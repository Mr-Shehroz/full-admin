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
    <div style={{ fontFamily: "'Arial', sans-serif", margin: "20px" }}>
      <h1 style={{ color: "#0f766e", fontSize: "2rem", marginBottom: "20px" }}>Orders</h1>
      {orders.length === 0 ? (
        <p style={{ color: "#0f766e", fontSize: "1.2rem" }}>No orders found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f1f1f1" }}>
              <th style={{ padding: "12px", textAlign: "left", color: "#0f766e", border: "1px solid #ddd" }}>
                Customer Name
              </th>
              <th style={{ padding: "12px", textAlign: "left", color: "#0f766e", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "12px", textAlign: "left", color: "#0f766e", border: "1px solid #ddd" }}>
                Products
              </th>
              <th style={{ padding: "12px", textAlign: "left", color: "#0f766e", border: "1px solid #ddd" }}>
                Total Amount
              </th>
              <th style={{ padding: "12px", textAlign: "left", color: "#0f766e", border: "1px solid #ddd" }}>
                Status
              </th>
              <th style={{ padding: "12px", textAlign: "left", color: "#0f766e", border: "1px solid #ddd" }}>
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ backgroundColor: "#fff" }}>
                <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                  {order.customerName}
                </td>
                <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                  {order.email}
                </td>
                <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                  {order.products.map((product, index) => (
                    <div key={index}>
                      {product.productId.title} - Quantity: {product.quantity}
                    </div>
                  ))}
                </td>
                <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                  ${order.totalAmount}
                </td>
                <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                  <span
                    style={{
                      backgroundColor: order.status === "Shipped" ? "#4caf50" : "#ff9800",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Layout>
  );
}
