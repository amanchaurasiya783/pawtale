"use client";

import Image from "next/image";
import Link from "next/link";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/outline";

export interface Product {
    _id: string;
    name: string;
    images?: string;
    skuID: string;
    price: number;
    mrp: number;
    quantity: number;
    stockStatus: "In Stock" | "Out of Stock" | "Pre Order";
    isFeatured: boolean;
    status: "draft" | "published" | "archived",
    averageRating: number;
}

type Props = {
    products: Product[];
    onDelete: (id: string) => void;
};

export default function ProductTable({
    products,
    onDelete,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr className="text-left text-sm text-gray-600">

                            <th className="px-6 py-3">Product</th>

                            <th className="px-6 py-3">SKU</th>

                            <th className="px-6 py-3">Price</th>

                            <th className="px-6 py-3">Stock</th>

                            <th className="px-6 py-3">Rating</th>

                            <th className="px-6 py-3">Status</th>

                            <th className="px-6 py-3">Featured</th>

                            <th className="px-6 py-3 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => (
                            <tr
                                key={product._id}
                                className="border-t transition hover:bg-slate-50"
                            >

                                {/* Product */}

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-4">

                                        <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">

                                            <Image
                                                src={
                                                    product.images[0] ||
                                                    "/Assets/placeholder.png"
                                                }
                                                alt={product.name.slice(-10)}
                                                fill
                                                className="object-cover"
                                            />

                                        </div>

                                        <div>

                                            <h3 className="font-semibold truncate max-w-[250px] text-gray-900">
                                                {product.name}
                                            </h3>

                                            <p className="text-xs text-gray-500">
                                                ID : {product._id.slice(-6)}
                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* SKU */}

                                <td className="px-6 py-4 text-sm">
                                    {product.skuID}
                                </td>

                                {/* Price */}

                                <td className="px-6 py-4">

                                    <div>

                                        <p className="font-semibold text-[#0E3A78]">
                                            ₹{product.price}
                                        </p>

                                        <p className="text-xs text-gray-400 line-through">
                                            ₹{product.mrp}
                                        </p>

                                    </div>

                                </td>

                                {/* Stock */}

                                <td className="px-6 py-4">

                                    <div>

                                        <p className="font-semibold">
                                            {product.quantity}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {product.stockStatus}
                                        </p>

                                    </div>

                                </td>

                                {/* Rating */}

                                <td className="px-6 py-4">

                                    ⭐ {product.averageRating.toFixed(1)}

                                </td>

                                {/* Active */}

                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${product.status === "published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.status === "published" ? "Active" : "Inactive"}
                                    </span>

                                </td>

                                {/* Featured */}

                                <td className="px-6 py-4">

                                    {product.isFeatured ? (
                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                                            Featured
                                        </span>
                                    ) : (
                                        "-"
                                    )}

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <Link
                                            href={`/admin/products/${product._id}`}
                                            className="rounded-lg border p-2 hover:bg-blue-50"
                                            target="_blank"
                                        >
                                            <PencilIcon className="h-5 w-5 text-blue-700" />
                                        </Link>

                                        <Link
                                            href={`/store/${product._id}`}
                                            target="_blank"
                                            className="rounded-lg border p-2 hover:bg-green-50"
                                        >
                                            <EyeIcon className="h-5 w-5 text-green-700" />
                                        </Link>

                                        <button
                                            onClick={() => onDelete(product._id)}
                                            className="rounded-lg border p-2 hover:bg-red-50"
                                        >
                                            <TrashIcon className="h-5 w-5 text-red-700" />
                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}