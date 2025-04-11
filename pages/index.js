import Layout from "@/components/layout";
import { Users, Package, Clipboard } from "lucide-react";
import { useSession } from "next-auth/react";
import connect from "@/lib/mongoose";
import mongoose from "mongoose";

export default function Dashboard({ totalUsers, totalProducts, pendingOrders }) {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-[#0f766e]">Dashboard</h1>

        {/* Dashboard Cards/Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Card 1 - Total Users */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
              <p className="text-2xl font-bold text-[#0f766e]">{totalUsers}</p>
            </div>
            <div className="bg-[#14b8a6] p-4 rounded-full">
              <Users size={24} color="white" />
            </div>
          </div>

          {/* Card 2 - Total Products */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Products</h3>
              <p className="text-2xl font-bold text-[#0f766e]">{totalProducts}</p>
            </div>
            <div className="bg-[#14b8a6] p-4 rounded-full">
              <Package size={24} color="white" />
            </div>
          </div>

          {/* Card 3 - Pending Orders */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Pending Orders</h3>
              <p className="text-2xl font-bold text-[#0f766e]">{pendingOrders}</p>
            </div>
            <div className="bg-[#14b8a6] p-4 rounded-full">
              <Clipboard size={24} color="white" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="bg-[#0f766e] p-6 rounded-lg shadow-md text-white">
              <h3 className="text-xl font-semibold">Manage Products</h3>
              <p className="mt-2">Add, edit, or remove products.</p>
              <a href="/products" className="mt-4 inline-block bg-white text-[#0f766e] px-4 py-2 rounded-md hover:bg-[#14b8a6] transition duration-300">Go to Products</a>
            </div>
            <div className="bg-[#0f766e] p-6 rounded-lg shadow-md text-white">
              <h3 className="text-xl font-semibold">View Orders</h3>
              <p className="mt-2">See the latest orders placed on your store.</p>
              <a href="/orders" className="mt-4 inline-block bg-white text-[#0f766e] px-4 py-2 rounded-md hover:bg-[#14b8a6] transition duration-300">Go to Orders</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Fetch the total users and total products from MongoDB
export async function getServerSideProps() {
  // Connect to the MongoDB database
  await connect();

  // Use mongoose to get the counts from the database
  const db = mongoose.connection.db;
  const usersCollection = db.collection('users');
  const totalUsers = await usersCollection.countDocuments();

  const productsCollection = db.collection('products');
  const totalProducts = await productsCollection.countDocuments();

  // Assuming you have an "orders" collection with a "status" field for pending orders
  const ordersCollection = db.collection('orders');
  const pendingOrders = await ordersCollection.countDocuments({ status: "pending" });

  return {
    props: {
      totalUsers,
      totalProducts,
      pendingOrders,
    },
  };
}
