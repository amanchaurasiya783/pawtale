"use client";

import { ProductFormData } from "../types";

type ProductSettingsProps = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export default function ProductSettings({
    formData,
    setFormData,
}: ProductSettingsProps) {
    const toggle = (
        field: "isFeatured" | "isActive" | "isDeleted"
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleWarranty = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            warranty: e.target.value,
        }));
    };

    const handleReturnDays = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            returnDays: Number(e.target.value),
        }));
    };

    return (
        <div className="mt-8 rounded-2xl bg-white border border-gray-200 shadow-lg p-8">

            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0E3A78]">
                    Product Settings
                </h2>

                <p className="text-gray-500 mt-1">
                    Configure visibility, warranty and return policy.
                </p>
            </div>

            {/* Warranty */}

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-semibold mb-2">
                        Warranty
                    </label>

                    <input
                        type="text"
                        value={formData.warranty}
                        onChange={handleWarranty}
                        placeholder="1 Year Manufacturer Warranty"
                        className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">
                        Return Days
                    </label>

                    <input
                        type="number"
                        min={0}
                        value={formData.returnDays}
                        onChange={handleReturnDays}
                        className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

            </div>

            {/* Settings */}

            <div className="mt-10 grid md:grid-cols-3 gap-5">

                <label className="rounded-xl border p-5 flex justify-between items-center cursor-pointer hover:border-blue-400 transition">

                    <div>
                        <h3 className="font-semibold">
                            Featured Product
                        </h3>

                        <p className="text-sm text-gray-500">
                            Show on Homepage
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={() => toggle("isFeatured")}
                        className="w-5 h-5"
                    />

                </label>

                <label className="rounded-xl border p-5 flex justify-between items-center cursor-pointer hover:border-blue-400 transition">

                    <div>
                        <h3 className="font-semibold">
                            Active Product
                        </h3>

                        <p className="text-sm text-gray-500">
                            Available for customers
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={() => toggle("isActive")}
                        className="w-5 h-5"
                    />

                </label>

                <label className="rounded-xl border p-5 flex justify-between items-center cursor-pointer hover:border-red-400 transition">

                    <div>
                        <h3 className="font-semibold">
                            Soft Delete
                        </h3>

                        <p className="text-sm text-gray-500">
                            Hide from Store
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={formData.isDeleted}
                        onChange={() => toggle("isDeleted")}
                        className="w-5 h-5"
                    />

                </label>

            </div>

            {/* Summary */}

            <div className="mt-10 rounded-xl bg-blue-50 border p-6">

                <h3 className="font-semibold text-[#0E3A78] mb-4">
                    Current Status
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                    <div>
                        <p className="text-sm text-gray-500">
                            Warranty
                        </p>

                        <p className="font-semibold">
                            {formData.warranty || "None"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Return
                        </p>

                        <p className="font-semibold">
                            {formData.returnDays} Days
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Visibility
                        </p>

                        <p className="font-semibold">
                            {formData.isActive ? "Active" : "Inactive"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Homepage
                        </p>

                        <p className="font-semibold">
                            {formData.isFeatured ? "Featured" : "Normal"}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}