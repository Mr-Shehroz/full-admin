"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AddProductForm from "../add";

export default function editProducts() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/api/products?id='+id).then(res => {
            setProductInfo(res.data);

        })
    }, [id])

    return (
        <div>
            {productInfo && (
                <AddProductForm {...productInfo} />
            )}
        
        </div>
    )
}