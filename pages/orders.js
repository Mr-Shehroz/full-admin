import Layout from "@/components/layout";
import Connect from "@/lib/mongoose";
import Order from "@/models/order";

export default function OrdersPage({ orders }) {
  return (
    <Layout>
      <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
        <h1 className="text-4xl font-bold text-[#0f766e] mb-10">Order Management</h1>

        {orders.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No orders available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-200"
              >
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Order #{index + 1}</p>
                  <h2 className="text-xl font-semibold text-[#0f766e]">{order.name}</h2>
                  <p className="text-sm text-gray-700">Email: {order.email}</p>
                  <p className="text-sm">
                    Payment:{" "}
                    <span
                      className={`font-medium ${
                        order.paid ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {order.paid ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-[#0f766e] mb-1">Shipping Address</h4>
                  <p className="text-sm text-gray-700 leading-5">
                    {order.streetAdress},<br />
                    {order.city}, {order.postalCode},<br />
                    {order.country}
                  </p>
                </div>

                {order.line_items && order.line_items.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-[#0f766e] mb-1">Ordered Items</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {order.line_items.map((item, i) => (
                        <li key={i}>
                          {item.quantity} ×{" "}
                          {item.price_data?.product_data?.name || "Unnamed Product"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-3">
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await Connect();
  const orders = await Order.find().lean();
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
