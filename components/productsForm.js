"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductForm() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col mt-10 md:flex-row md:mt-0 items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold pb-4 md:pb-0 text-[#0d6e6b]">Products</h2>
        <Link
          href="/products/add"
          className="bg-[#14b8a6] hover:bg-[#0f766e] text-white px-5 py-3 rounded transition font-medium"
        >
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded shadow text-[#333] text-center space-y-4"
          >
            <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center overflow-hidden relative">
              {product.images?.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              ) : (
                <span className="text-lg text-gray-500">No Image</span>
              )}
            </div>

            <h3 className="font-semibold text-[#0d6e6b] text-xl">{product.title}</h3>

            {product.category && (
              <div className="text-lg italic text-[#0d6e6b]">
                <p>{product.category.categoryName}</p>

                {product.category.parent && (
                  <p className="text-sm text-[#6b7280]">
                    Parent Category: {product.category.parent.categoryName}
                  </p>
                )}

                {product.category.properties?.length > 0 && (
                  <ul className="list-disc pl-6 text-sm text-[#6b7280]">
                    {product.category.properties.map((property, idx) => (
                      <li key={idx}>
                        <strong>{property.name}:</strong> {property.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <p className="text-lg text-[#14b8a6]">${product.price}</p>
            <p className="text-sm text-[#6b7280]">{product.description}</p>

            <div className="flex justify-center gap-3 pt-4">
              <Link
                href={`/products/edit/${product._id}`}
                className="px-5 py-2 bg-[#0d6e6b] hover:bg-[#0b5958] text-white text-lg rounded"
              >
                Edit
              </Link>
              <Link
                href={`/products/delete/${product._id}`}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-lg rounded"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
