"use client";

import { ProductFormData } from "../types";

type ProductCategoryProps = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

const categoryOptions = [
    "Dog",
    "Cat",
    "Bird",
    "Fish",
    "Rabbit",
    "Horse",
    "Small Pets",
    "Food",
    "Treats",
    "Toys",
    "Accessories",
    "Grooming",
    "Healthcare",
];

export default function ProductCategory({
    formData,
    setFormData,
}: ProductCategoryProps) {
    const handleBrandChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            brand: e.target.value,
        }));
    };

    const handleCategoryToggle = (category: string) => {
        setFormData((prev) => {
            const exists = prev.category.includes(category);

            return {
                ...prev,
                category: exists
                    ? prev.category.filter((c) => c !== category)
                    : [...prev.category, category],
            };
        });
    };

    const handleTagsChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const tags = e.target.value
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        setFormData((prev) => ({
            ...prev,
            tags,
        }));
    };

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold text-[#0E3A78]">
                Category & Brand
            </h2>

            {/* Brand */}

            <div className="mb-8">
                <label className="mb-2 block font-semibold">
                    Brand
                </label>

                <input
                    type="text"
                    value={formData.brand}
                    onChange={handleBrandChange}
                    placeholder="Royal Canin"
                    className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Categories */}

            <div className="mb-8">
                <label className="mb-4 block font-semibold">
                    Categories
                </label>

                <div className="flex flex-wrap gap-3">
                    {categoryOptions.map((item) => {
                        const active = formData.category.includes(item);

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => handleCategoryToggle(item)}
                                className={`rounded-full border px-5 py-2 text-sm font-medium transition
                  ${active
                                        ? "bg-[#0E3A78] text-white border-[#0E3A78]"
                                        : "bg-white hover:bg-blue-50"
                                    }`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}