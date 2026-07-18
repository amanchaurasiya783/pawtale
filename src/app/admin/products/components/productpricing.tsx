"use client";

import { ProductFormData } from "../types";

type ProductPricingProps = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export default function ProductPricing({
    formData,
    setFormData,
}: ProductPricingProps) {
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value === "" ? 0 : Number(value),
        }));
    };

    const handleDiscountType = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            discountType: e.target.value as "percentage" | "fixed",
        }));
    };

    const saveAmount = Math.max(0, formData.mrp - formData.price);

    const savePercentage =
        formData.mrp > 0
            ? ((saveAmount / formData.mrp) * 100).toFixed(1)
            : "0";

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mt-8">
            <h2 className="text-2xl font-semibold text-[#0E3A78] mb-6">
                Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* MRP */}

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        MRP *
                    </label>

                    <input
                        type="number"
                        name="mrp"
                        value={formData.mrp}
                        onChange={handleNumberChange}
                        placeholder="999"
                        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Selling Price */}

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Selling Price *
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleNumberChange}
                        placeholder="799"
                        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Discount Type */}

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Discount Type
                    </label>

                    <select
                        value={formData.discountType}
                        onChange={handleDiscountType}
                        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                    </select>
                </div>

                {/* Discount Value */}

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Discount Value
                    </label>

                    <input
                        type="number"
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleNumberChange}
                        placeholder="20"
                        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Summary */}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-blue-50 p-5 border">
                    <p className="text-sm text-gray-500">MRP</p>

                    <h3 className="text-2xl font-semibold text-[#0E3A78]">
                        ₹{formData.mrp}
                    </h3>
                </div>

                <div className="rounded-xl bg-green-50 p-5 border">
                    <p className="text-sm text-gray-500">
                        Customer Saves
                    </p>

                    <h3 className="text-2xl font-semibold text-green-600">
                        ₹{saveAmount}
                    </h3>
                </div>

                <div className="rounded-xl bg-yellow-50 p-5 border">
                    <p className="text-sm text-gray-500">
                        Discount %
                    </p>

                    <h3 className="text-2xl font-semibold text-yellow-600">
                        {savePercentage}%
                    </h3>
                </div>
            </div>
        </div>
    );
}