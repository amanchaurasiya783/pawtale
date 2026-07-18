"use client";

import { ProductFormData } from "../types";

type ProductShippingProps = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export default function ProductShipping({
    formData,
    setFormData,
}: ProductShippingProps) {
    const handleWeightChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            weight: Number(e.target.value),
        }));
    };

    const handleDimensionChange = (
        field: "length" | "width" | "height",
        value: number,
    ) => {
        setFormData((prev) => ({
            ...prev,
            dimensions: {
                ...(prev.dimensions ?? {
                    length: 0,
                    width: 0,
                    height: 0,
                }),
                [field]: value,
            },
        }));
    };

    const dimensions = formData.dimensions ?? {
        length: 0,
        width: 0,
        height: 0,
    };

    const weight = formData.weight ?? 0;


    const volume =
        dimensions.length *
        dimensions.width *
        dimensions.height;

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0E3A78]">
                    Shipping Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Enter shipping information for this product.
                </p>
            </div>

            {/* Weight */}

            <div className="mb-8">
                <label className="mb-2 block font-semibold">
                    Product Weight (kg)
                </label>

                <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={weight}
                    onChange={handleWeightChange}
                    placeholder="0.75"
                    className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Dimensions */}

            <div>
                <label className="mb-4 block font-semibold">
                    Package Dimensions (cm)
                </label>

                <div className="grid gap-5 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-sm text-gray-500">
                            Length
                        </label>

                        <input
                            type="number"
                            min={0}
                            value={dimensions.length}
                            onChange={(e) =>
                                handleDimensionChange(
                                    "length",
                                    Number(e.target.value)
                                )
                            }
                            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-500">
                            Width
                        </label>

                        <input
                            type="number"
                            min={0}
                            value={dimensions.width}
                            onChange={(e) =>
                                handleDimensionChange(
                                    "width",
                                    Number(e.target.value)
                                )
                            }
                            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-500">
                            Height
                        </label>

                        <input
                            type="number"
                            min={0}
                            value={dimensions.height}
                            onChange={(e) =>
                                handleDimensionChange(
                                    "height",
                                    Number(e.target.value)
                                )
                            }
                            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Summary */}

            <div className="mt-8 rounded-xl bg-blue-50 border p-6">
                <h3 className="mb-4 font-semibold text-[#0E3A78]">
                    Shipping Summary
                </h3>

                <div className="grid gap-5 md:grid-cols-3">
                    <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="text-xl font-semibold">
                            {weight || 0} kg
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Dimensions</p>
                        <p className="text-xl font-semibold">
                            {dimensions.length} ×{" "}
                            {dimensions.width} ×{" "}
                            {dimensions.height} cm
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Package Volume
                        </p>
                        <p className="text-xl font-semibold">
                            {volume || 0} cm³
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}