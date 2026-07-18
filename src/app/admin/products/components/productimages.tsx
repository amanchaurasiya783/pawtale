"use client";

import Image from "next/image";
import { ProductFormData } from "../types";

type ProductImagesProps = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export default function ProductImages({
    formData,
    setFormData,
}: ProductImagesProps) {
    const handleThumbnailChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            thumbnail: e.target.value,
        }));
    };

    const handleImageChange = (
        index: number,
        value: string,
    ) => {
        const updated = [...formData.images];
        updated[index] = value;

        setFormData((prev) => ({
            ...prev,
            images: updated,
        }));
    };

    const addImage = () => {
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ""],
        }));
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mt-8">
            <h2 className="text-2xl font-semibold text-[#0E3A78] mb-6">
                Product Images
            </h2>

            {/* Thumbnail */}

            <div className="mb-8">
                <label className="block font-semibold mb-2">
                    Thumbnail Image
                </label>

                <input
                    type="text"
                    placeholder="Thumbnail Image URL"
                    value={formData.thumbnail}
                    onChange={handleThumbnailChange}
                    className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {formData.thumbnail && (
                    <div className="mt-4">
                        <Image
                            src={formData.thumbnail}
                            alt="Thumbnail"
                            width={180}
                            height={180}
                            unoptimized
                            className="rounded-xl border object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Gallery */}

            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">
                        Gallery Images
                    </h3>

                    <button
                        type="button"
                        onClick={addImage}
                        className="px-4 py-2 rounded-lg bg-[#0E3A78] text-white hover:bg-[#12448c]"
                    >
                        + Add Image
                    </button>
                </div>

                {formData.images.map((img, index) => (
                    <div
                        key={index}
                        className="grid md:grid-cols-[1fr_160px_auto] gap-4 items-center"
                    >
                        <input
                            type="text"
                            placeholder={`Image ${index + 1}`}
                            value={img}
                            onChange={(e) =>
                                handleImageChange(index, e.target.value)
                            }
                            className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="h-28 w-28 overflow-hidden rounded-xl border bg-gray-100">
                            {img ? (
                                <Image
                                    src={img}
                                    alt="Preview"
                                    width={120}
                                    height={120}
                                    unoptimized
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                    Preview
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="rounded-lg bg-red-500 px-4 py-3 text-white hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-xl bg-blue-50 p-4 border">
                <p className="font-medium text-[#0E3A78]">
                    Total Images : {formData.images.length}
                </p>
            </div>
        </div>
    );
}