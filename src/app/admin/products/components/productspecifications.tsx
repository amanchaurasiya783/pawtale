"use client";

import { ProductFormData } from "../types";

type ProductSpecificationsProps = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export default function ProductSpecifications({
    formData,
    setFormData,
}: ProductSpecificationsProps) {
    const handleSpecificationChange = (
        index: number,
        field: "key" | "value",
        value: string,
    ) => {
        const updated = [...formData.specifications];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        setFormData((prev) => ({
            ...prev,
            specifications: updated,
        }));
    };

    const addSpecification = () => {
        setFormData((prev) => ({
            ...prev,
            specifications: [
                ...prev.specifications,
                {
                    key: "",
                    value: "",
                },
            ],
        }));
    };

    const removeSpecification = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            specifications: prev.specifications.filter(
                (_, i) => i !== index,
            ),
        }));
    };

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-[#0E3A78]">
                        Specifications
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add product specifications that customers will see.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={addSpecification}
                    className="rounded-xl bg-[#0E3A78] px-5 py-3 font-medium text-white hover:bg-[#12448c]"
                >
                    + Add Specification
                </button>
            </div>

            {formData.specifications.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-gray-300 py-10 text-center text-gray-500">
                    No specifications added yet.
                </div>
            )}

            <div className="space-y-5">
                {formData.specifications.map((spec, index) => (
                    <div
                        key={index}
                        className="grid gap-4 rounded-xl border p-5 md:grid-cols-[1fr_2fr_auto]"
                    >
                        <input
                            type="text"
                            placeholder="Specification Name"
                            value={spec.key}
                            onChange={(e) =>
                                handleSpecificationChange(
                                    index,
                                    "key",
                                    e.target.value,
                                )
                            }
                            className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Specification Value"
                            value={spec.value}
                            onChange={(e) =>
                                handleSpecificationChange(
                                    index,
                                    "value",
                                    e.target.value,
                                )
                            }
                            className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() => removeSpecification(index)}
                            className="rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {formData.specifications.length > 0 && (
                <div className="mt-8 rounded-xl bg-blue-50 p-5">
                    <h3 className="mb-3 font-semibold text-[#0E3A78]">
                        Preview
                    </h3>

                    <div className="space-y-2">
                        {formData.specifications.map((spec, index) => (
                            <div
                                key={index}
                                className="flex justify-between border-b pb-2"
                            >
                                <span className="font-medium text-gray-700">
                                    {spec.key || "Specification"}
                                </span>

                                <span className="text-gray-600">
                                    {spec.value || "--"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}