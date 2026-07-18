"use client";

import { KeyboardEvent } from "react";
import { ProductFormData } from "../types";

type ProductBasicInfoProps = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export default function ProductBasicInfo({
    formData,
    setFormData,
}: ProductBasicInfoProps) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;

        if (name === "name") {
            setFormData((prev) => ({
                ...prev,
                name: value,
                slug:
                    !prev.slug?.length
                        ? value
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9\s-]/g, "")
                            .replace(/\s+/g, "-")
                        : prev.slug,
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;

        e.preventDefault();

        const value = e.currentTarget.value.trim();

        if (!value) return;
        if (formData.tags.includes(value)) return;

        setFormData((prev) => ({
            ...prev,
            tags: [...prev.tags, value],
        }));

        e.currentTarget.value = "";
    };

    const removeTag = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-[#0E3A78] mb-6">
                Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700 mb-2 block">
                        Product Name *
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">
                        Slug *
                    </label>

                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="slug"
                        className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* SKU */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">
                        SKU ID *
                    </label>

                    <input
                        type="text"
                        name="skuID"
                        value={formData.skuID}
                        onChange={handleChange}
                        placeholder="DOG-001"
                        className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    // disabled={formData.skuID ? true : false}

                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700 mb-2 block">
                        Description *
                    </label>

                    <textarea
                        rows={6}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write detailed product description..."
                        className="w-full rounded-xl border p-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700 mb-2 block">
                        Tags
                    </label>

                    <input
                        type="text"
                        placeholder="Press Enter to add tag"
                        onKeyDown={handleTag}
                        className="w-full rounded-xl border p-3"
                    />

                    <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                {tag}

                                <button
                                    type="button"
                                    onClick={() => removeTag(index)}
                                    className="font-semibold hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}