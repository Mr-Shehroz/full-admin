import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/layout";
import axios from "axios";
import Swal from "sweetalert2";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/categories?id=${id}`);
        setCategories(categories.filter((cat) => cat._id !== id));
        Swal.fire("Deleted!", "The category has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete category", err);
        Swal.fire("Error", "There was an issue deleting the category.", "error");
      }
    }
  }

  return (
    <Layout>
      <div style={{ fontFamily: "'Arial', sans-serif", margin: "20px" }}>
        <h1 style={{ color: "#0f766e", fontSize: "2rem", marginBottom: "20px" }}>
          Categories
        </h1>

        {loading ? (
          <p style={{ fontSize: "1.2rem", color: "#666" }}>Loading categories...</p>
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
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#0f766e",
                    border: "1px solid #ddd",
                  }}
                >
                  Category Name
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#0f766e",
                    border: "1px solid #ddd",
                  }}
                >
                  Parent Category
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#0f766e",
                    border: "1px solid #ddd",
                  }}
                >
                  Properties
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#0f766e",
                    border: "1px solid #ddd",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} style={{ backgroundColor: "#fff" }}>
                  <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                    {category.categoryName}
                  </td>
                  <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                    {category.parent ? category.parent.categoryName : "No Parent"}
                  </td>
                  <td style={{ padding: "12px", color: "#333", border: "1px solid #ddd" }}>
                    {category.properties.length > 0 ? (
                      <ul>
                        {category.properties.map((property, index) => (
                          <li key={index} style={{ color: "#555" }}>
                            <strong>{property.name}:</strong> {property.value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No Properties"
                    )}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleDelete(category._id)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#dc2626",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Link href="/categories/add">
          <button
            style={{
              padding: "8px 12px",
              backgroundColor: "#0f766e",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
              borderRadius: "4px",
            }}
          >
            Add New Category
          </button>
        </Link>
      </div>
    </Layout>
  );
}
