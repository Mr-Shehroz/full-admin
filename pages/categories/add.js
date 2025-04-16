import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import axios from "axios";

export default function AddCategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [properties, setProperties] = useState([]);
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

  const addProperty = () => {
    setProperties([...properties, { name: "", value: "" }]);
  };

  const updatePropertyName = (index, newName) => {
    setProperties(prev => {
      const updated = [...prev];
      updated[index].name = newName;
      return updated;
    });
  };

  const updatePropertyValue = (index, newValue) => {
    setProperties(prev => {
      const updated = [...prev];
      updated[index].value = newValue;
      return updated;
    });
  };

  const removeProperty = (index) => {
    setProperties(prev => prev.filter((_, i) => i !== index));
  };

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
        properties: properties.filter(p => p.name && p.value),
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
      <div className="max-w-3xl mx-auto my-14 font-sans">
        <h1 className="text-3xl font-bold text-teal-700 mb-6">Add New Category</h1>

        {error && <p className="text-red-600 text-lg mb-4">{error}</p>}

        <form
          onSubmit={saveCategory}
          className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 border border-teal-700 rounded-md text-teal-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              className="w-full px-4 py-2 border border-teal-700 rounded-md text-teal-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="">No Parent Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-teal-700">Properties</h3>
              <button
                type="button"
                onClick={addProperty}
                className="px-3 py-1 bg-teal-700 text-white rounded hover:bg-teal-800 text-sm"
              >
                + Add Property
              </button>
            </div>

            <div className="space-y-3">
              {properties.map((property, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Property Name"
                    value={property.name}
                    onChange={(e) => updatePropertyName(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-teal-700 rounded-md bg-gray-50 text-teal-700"
                  />
                  <input
                    type="text"
                    placeholder="Property Value"
                    value={property.value}
                    onChange={(e) => updatePropertyValue(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-teal-700 rounded-md bg-gray-50 text-teal-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeProperty(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-5 py-2 bg-teal-700 text-white font-semibold rounded-md hover:bg-teal-800"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
