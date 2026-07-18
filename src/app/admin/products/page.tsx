"use client";

import Link from "next/link";
import ProductTable from "./components/producttable";
import { useEffect, useState } from "react";
import Pagination from "@/app/_components/pagination";


export default function ProductsPage() {

    const [products, setproducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const result = await response.json();

                setCurrentPage(result.pagination.currentPage);

                setTotalPages(result.pagination.totalPages);

                setproducts(
                    Array.isArray(result.products) ? result.products : [result.products]
                );

            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isDeleted: true,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(`Failed to delete product : ${result}`);
            }

            setproducts((prev) => prev.filter((product) => product._id !== id));

        } catch (error) {
            console.error(error);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-semibold text-[#0E3A78]">
                        Products
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your products, inventory and pricing.
                    </p>
                </div>

                <Link
                    href="/admin/products/new"
                    target="_blank"
                    className="rounded-xl bg-[#0E3A78] px-5 py-3 font-semibold text-white hover:bg-[#0B2E5F]"
                >
                    + Add Product
                </Link>

            </div>

            <ProductTable products={products} onDelete={handleDelete} />

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />

        </div>
    );
}