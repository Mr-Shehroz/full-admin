import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Sidebar from "./nav";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f766e] via-[#14b8a6] to-[#84cc16] px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
          <h2 className="text-3xl font-extrabold text-center mb-3">Admin Access</h2>
          <p className="text-center text-gray-200 mb-6">Log in to manage the dashboard</p>

          <button
            onClick={() => signIn("google")}
            className="w-full bg-white text-[#0f766e] font-semibold py-2 rounded-lg hover:bg-gray-100 transition duration-300 shadow"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 sm:ml-64">
        {/* Content should be placed here */}
        {children}
      </main>
    </div>
  );
}
