"use client";
import { useState } from "react";

const FilterSection = ({ onFilter }) => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const tags = ["DURABLE", "ECO-FRIENDLY", "NATURAL INGREDIENTS", "ORGANIC"];
    const categories = [
        "ACCESSORIES",
        "BIRD FOOD",
        "CAT FOOD",
        "DOG FOOD",
        "FISH FOOD",
        "PET TOYS",
    ];

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const updatedPriceRange = [...priceRange];
        if (name === "min") updatedPriceRange[0] = parseInt(value);
        if (name === "max") updatedPriceRange[1] = parseInt(value);
        setPriceRange(updatedPriceRange);
        onFilter({
            priceRange: updatedPriceRange,
            selectedTags,
            selectedCategory,
        });
    };

    const toggleTag = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
        onFilter({
            priceRange,
            selectedTags: updatedTags,
            selectedCategory,
        });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        onFilter({
            priceRange,
            selectedTags,
            selectedCategory: category,
        });
    };

    return (
        <div className="w-full bg-white p-4 rounded-lg shadow-md">
            {/* Price Filter */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Price Range
                </h3>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        name="min"
                        value={priceRange[0]}
                        onChange={handlePriceChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Min"
                        min="0"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                        type="number"
                        name="max"
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Max"
                        min="0"
                    />
                </div>
            </div>

            {/* Product Tags */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Product Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedTags.includes(tag)
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Categories */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Categories</h3>
                <div className="flex flex-wrap gap-3 md:space-y-2 md:block">
                    <label key="all" className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="product_category"
                            value=""
                            checked={selectedCategory === ""}
                            onChange={handleCategoryChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">All</span>
                    </label>
                    {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="product_category"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={handleCategoryChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Advertisement */}
            <div className="mt-6 bg-gray-100 hidden md:block rounded-lg overflow-hidden">
                <img
                    src="/Assets/hari_krishna.png"
                    alt="Special Offer"
                    className="w-full h-auto object-cover"
                />
                <div className="p-3 text-center">
                    <p className="text-sm font-medium text-gray-700">Special Offers</p>
                    <p className="text-xs text-gray-500">Limited time only</p>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
