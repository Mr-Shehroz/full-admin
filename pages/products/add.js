'use client';

import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProductForm({ 
  title: existingTitle, 
  description: existingDescription, 
  price: existingPrice, 
  _id, 
  images: existingImages, 
  category: assignedCategory 
  
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [category, setCategory] = useState(assignedCategory || ""); // Use the existing category if provided
  const [categoryDetails, setCategoryDetails] = useState(null); // Store category details (properties, parent)
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories")
      .then(res => {
        // Ensure the response is an array before setting state
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Categories data is not an array:", res.data);
        }
      })
      .catch(err => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    if (category) {
      // Fetch details of the selected category
      const selectedCategory = categories.find((cat) => cat._id === category);
      setCategoryDetails(selectedCategory);
    }
  }, [category, categories]);

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price, images, category };

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }

    router.push("/products");
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (result?.urls?.length) {
        setImages(prev => [...prev, ...result.urls]);
      }
    }
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-[#0f766e] mb-4">{_id ? "Edit Product" : "Add Product"}</h1>
        <form onSubmit={saveProduct}>
          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Title</span>
                <input
                  type="text"
                  placeholder="Title"
                  className="border border-[#14b8a6] p-2 rounded text-[#0f766e] placeholder:text-gray-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Price</span>
                <input
                  type="number"
                  placeholder="Price"
                  className="border border-[#14b8a6] p-2 rounded text-[#0f766e] placeholder:text-gray-400"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-[#14b8a6] p-2 rounded text-[#0f766e] bg-white"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </label>

            {/* Parent Category Section */}
            {categoryDetails?.parent && (
              <div className="bg-teal-100 p-4 rounded-lg border border-teal-200 mt-4">
                <h3 className="text-sm font-semibold text-teal-600">Parent Category</h3>
                <p className="text-sm text-teal-800">{categoryDetails.parent.categoryName}</p>
              </div>
            )}

            {/* Properties Section */}
            {categoryDetails?.properties?.length > 0 && (
              <div className="bg-teal-100 p-4 rounded-lg border border-teal-200 mt-4">
                <h3 className="text-sm font-semibold text-teal-600">Properties</h3>
                <ul className="space-y-2">
                  {categoryDetails.properties.map((property, index) => (
                    <li key={index} className="text-sm text-teal-800">
                      <strong>{property.name}:</strong> {property.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Description</span>
              <textarea
                placeholder="Description"
                rows={3}
                className="w-full border border-[#14b8a6] p-2 rounded text-[#0f766e] placeholder:text-gray-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Upload Images</span>
              <span className="bg-[#14b8a6] hover:bg-[#0f766e] text-white text-sm px-3 py-1 rounded cursor-pointer w-fit transition">
                Choose Images
                <input
                  type="file"
                  multiple
                  onChange={uploadImages}
                  className="hidden"
                />
              </span>
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((url, i) => (
                  <div key={i} className="w-full h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={url}
                      alt={`Product image ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#14b8a6] hover:bg-[#0f766e] text-white py-2 rounded font-semibold"
            >
              {_id ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
