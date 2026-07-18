"use client";

import { useState } from "react";
import AddToCartButton from "@/app/_components/addtocartbutton";

export default function ProductImages({ images = [], product }) {
    const [selectedImage, setSelectedImage] = useState(0);

    const safeImages =
        images?.length > 0 ? images : ["/Assets/hari_krishna.png"];

    return (
        <div className="w-full">

            {/* Desktop */}
            <div className="hidden md:flex gap-3">

                {/* Thumbnails */}
                <div className="h-[430px] overflow-y-auto flex flex-col gap-2 pr-1 min-scrollbar">
                    {safeImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`w-14 h-14 shrink-0 rounded-md border overflow-hidden transition
                ${selectedImage === index
                                    ? "border-blue-600 ring-2 ring-blue-500"
                                    : "border-gray-300 hover:border-blue-400"
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-contain bg-white"
                            />
                        </button>
                    ))}
                </div>

                {/* Main Image */}
                <div className="flex-1">

                    <div className="w-full aspect-square border rounded-lg bg-white flex items-center justify-center overflow-hidden">

                        <img
                            src={safeImages[selectedImage]}
                            alt={product?.name}
                            className="w-full h-full object-contain p-4"
                        />

                    </div>

                    <div className="mt-4">
                        <AddToCartButton product={product} />
                    </div>

                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden">

                <div className="w-full aspect-square border rounded-lg bg-white flex items-center justify-center overflow-hidden">

                    <img
                        src={safeImages[selectedImage]}
                        alt={product?.name}
                        className="w-full h-full object-contain p-4"
                    />

                </div>

                <div className="flex gap-2 overflow-x-auto mt-3 pb-1">
                    {safeImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`w-16 h-16 shrink-0 rounded-md border overflow-hidden
                ${selectedImage === index
                                    ? "border-blue-600 ring-2 ring-blue-500"
                                    : "border-gray-300"
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-contain bg-white"
                            />
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    <AddToCartButton product={product} />
                </div>

            </div>

        </div>
    );
}