import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DeleteProduct() {
    const router = useRouter();
    const { id } = router.query; // Extract product ID from the URL query

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/products?id=${id}`);
            router.push('/products'); // Redirect after deleting
        } catch (error) {
            console.error("Failed to delete the product:", error);
        }
    };

    const handleCancel = () => {
        router.push('/products'); // Redirect without deleting
    };

    return (
        <Layout>
            <div className="text-center p-6">
                <h2 className="text-xl font-semibold text-[#0f766e]">
                    Are you sure you want to delete this product?
                </h2>
                <div className="mt-4">
                    <span
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded mr-2 cursor-pointer"
                    >
                        Yes
                    </span>
                    <span
                        onClick={handleCancel}
                        className="px-4 py-2 bg-[#0f766e] hover:bg-[#0d5f58] text-white rounded cursor-pointer"
                    >
                        No
                    </span>
                </div>
            </div>
        </Layout>
    );
}
