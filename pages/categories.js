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
      <div className="p-4 sm:p-6 font-sans mt-10 md:mt-0">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f766e]">Categories</h1>
          <Link href="/categories/add">
            <button className="bg-[#0f766e] hover:bg-[#0c5f59] text-white px-5 py-2 rounded">
              Add New Category
            </button>
          </Link>
        </div>

        {loading ? (
          <p className="text-base sm:text-lg text-gray-600">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-base text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-bold text-[#0f766e]">{category.categoryName}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Parent:</span>{" "}
                    {category.parent ? category.parent.categoryName : "No Parent"}
                  </p>
                  <div className="mt-3">
                    <p className="font-medium text-gray-700 mb-1">Properties:</p>
                    {category.properties.length > 0 ? (
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {category.properties.map((prop, index) => (
                          <li key={index}>
                            <strong>{prop.name}:</strong> {prop.value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No properties</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(category._id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
