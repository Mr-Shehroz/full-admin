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
      <div style={{ fontFamily: "'Arial', sans-serif", margin: "20px", backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
        <h1 style={{ color: "#0f766e", fontSize: "2rem", marginBottom: "20px" }}>Settings</h1>
        
        {error && (
          <p style={{ color: "red", fontSize: "1.2rem" }}>
            {error}
          </p>
        )}
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#333", fontSize: "1.2rem", marginBottom: "10px", display: "block" }}>
            Username:
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              width: "300px",
              marginBottom: "20px",
              color: "#333",  // Dark text color for better contrast
              backgroundColor: "#fff",  // White background for inputs
              border: "1px solid #0f766e", // Border with the theme color
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#333", fontSize: "1.2rem", marginBottom: "10px", display: "block" }}>
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              width: "300px",
              marginBottom: "20px",
              color: "#333",  // Dark text color for better contrast
              backgroundColor: "#fff",  // White background for inputs
              border: "1px solid #0f766e", // Border with the theme color
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#333", fontSize: "1.2rem", marginBottom: "10px", display: "block" }}>
            Theme Color:
          </label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              width: "60px",
              marginBottom: "20px",
              border: "1px solid #0f766e", // Border with the theme color
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: "8px 12px",
            backgroundColor: "#0f766e",  // Button background color
            color: "#fff",  // Button text color
            border: "1px solid #0f766e",  // Border with the theme color
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </div>
    </Layout>
  );
}
