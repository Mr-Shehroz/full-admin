// pages/settings.js
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

export default function SettingsPage() {
  const [themeColor, setThemeColor] = useState("#0f766e");  // Default theme color
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSave = () => {
    if (!username || !email) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    // Simulate saving settings (just an alert for demo)
    alert(`Settings saved!\nUsername: ${username}\nEmail: ${email}\nTheme Color: ${themeColor}`);
    
    // Optionally redirect or update after saving
    // router.push("/dashboard");
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl text-teal-600 font-semibold mb-6">Settings</h1>
        
        {error && (
          <p className="text-red-500 text-lg mb-4">{error}</p>
        )}
        
        <div className="mb-6">
          <label className="block text-lg text-gray-800 mb-2">Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-teal-600 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg text-gray-800 mb-2">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-teal-600 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg text-gray-800 mb-2">Theme Color:</label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="w-16 h-10 border border-teal-600 rounded-md focus:outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full p-3 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Save Settings
        </button>
      </div>
    </Layout>
  );
}
