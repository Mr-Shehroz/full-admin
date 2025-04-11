"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AddProductForm from "../add";

export default function EditProducts() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  return (
    <div>
      {productInfo && <AddProductForm {...productInfo} />}
    </div>
  );
}
