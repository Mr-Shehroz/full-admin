import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import axios from "axios";

export default function AddCategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [properties, setProperties] = useState([]);  // State for properties
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }

    fetchCategories();
  }, []);

  // Add a new property pair (name, value) to the properties state
  function addProperty() {
    setProperties([...properties, { name: "", value: "" }]);
  }

  // Update the name of a property at the given index
  function updatePropertyName(index, newName) {
    setProperties(prev => {
      const updatedProperties = [...prev];
      updatedProperties[index].name = newName;
      return updatedProperties;
    });
  }

  // Update the value of a property at the given index
  function updatePropertyValue(index, newValue) {
    setProperties(prev => {
      const updatedProperties = [...prev];
      updatedProperties[index].value = newValue;
      return updatedProperties;
    });
  }

  // Remove a property from the properties array
  function removeProperty(index) {
    setProperties(prev => {
      const updatedProperties = prev.filter((_, i) => i !== index);
      return updatedProperties;
    });
  }

  async function saveCategory(e) {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      await axios.post("/api/categories", {
        categoryName,
        parentCategory: parentCategory || null,
        properties: properties.filter(p => p.name && p.value),  // Only include properties with both name and value
      });

      setCategoryName("");
      setParentCategory("");
      setProperties([]);
      setError("");
      router.push("/categories");
    } catch (err) {
      console.error(err);
      setError("Failed to save category. Please try again.");
    }
  }

  return (
    <Layout>
      <div style={{ fontFamily: "'Arial', sans-serif", margin: "20px" }}>
        <h1 style={{ color: "#0f766e", fontSize: "2rem", marginBottom: "20px" }}>
          Add New Category
        </h1>

        {error && (
          <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>
        )}

        <form onSubmit={saveCategory}>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              width: "300px",
              marginBottom: "20px",
              color: "#0f766e",
              backgroundColor: "#f9f9f9",
              border: "1px solid #0f766e",
              borderRadius: "4px",
              display: "block",
            }}
          />

          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            style={{
              padding: "8px",
              width: "320px",
              marginBottom: "20px",
              color: "#0f766e",
              backgroundColor: "#f9f9f9",
              border: "1px solid #0f766e",
              borderRadius: "4px",
              display: "block",
            }}
          >
            <option value="">No Parent Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={addProperty}
              style={{
                padding: "8px 12px",
                backgroundColor: "#0f766e",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "10px",
                width: "150px",
              }}
            >
              Add Property
            </button>

            {properties.map((property, index) => (
              <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Property Name"
                  value={property.name}
                  onChange={(e) => updatePropertyName(index, e.target.value)}
                  style={{
                    padding: "8px",
                    marginRight: "10px",
                    width: "150px",
                    color: "#0f766e",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #0f766e",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Property Value"
                  value={property.value}
                  onChange={(e) => updatePropertyValue(index, e.target.value)}
                  style={{
                    padding: "8px",
                    marginRight: "10px",
                    width: "150px",
                    color: "#0f766e",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #0f766e",
                    borderRadius: "4px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            style={{
              padding: "8px 12px",
              backgroundColor: "#0f766e",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save Category
          </button>
        </form>
      </div>
    </Layout>
  );
}
