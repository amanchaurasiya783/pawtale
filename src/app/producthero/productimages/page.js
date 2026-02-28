"use client";

import { useState } from "react";
import AddToCartButton from "@/app/_components/addtocartbutton/page";

export default function ProductImages({ images, product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      {/* Main Image */}
      <div className="border rounded-lg overflow-hidden bg-gray-100 aspect-square flex items-center justify-center">
        <img
          src={images[selectedImage]}
          alt="Product"
          className="object-contain w-full h-full p-2 bg-white"
        />
      </div>
      {/* Thumbnail Gallery */}
      <div className="flex gap-2 mt-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            onMouseEnter={() => setSelectedImage(index)}
            className={`w-16 h-16 border rounded-md overflow-hidden ${
              selectedImage === index ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
      <div className="my-4">
        {/* add to cart button */}
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
