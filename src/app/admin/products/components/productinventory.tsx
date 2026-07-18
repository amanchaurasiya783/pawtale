"use client";

import { ProductFormData } from "../types";

type ProductInventoryProps = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

export default function ProductInventory({
    formData,
    setFormData,
}: ProductInventoryProps) {
    const handleNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value === "" ? 0 : Number(value),
        }));
    };

    const handleSelect = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            stockStatus: e.target.value as
                | "In Stock"
                | "Out of Stock"
                | "Pre Order",
        }));
    };

    const toggleSwitch = (field: keyof ProductFormData) => {
        setFormData((prev) => ({
            ...prev,
            [field]: !prev[field as keyof ProductFormData],
        }));
    };

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold text-[#0E3A78]">
                Inventory
            </h2>

            {/* Quantity */}

            <div className="grid gap-6 md:grid-cols-3">
                <div>
                    <label className="mb-2 block font-semibold">
                        Available Quantity
                    </label>

                    <input
                        type="number"
                        name="quantity"
                        min={0}
                        value={formData.quantity}
                        onChange={handleNumberChange}
                        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-semibold">
                        Stock Status
                    </label>

                    <select
                        value={formData.stockStatus}
                        onChange={handleSelect}
                        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                        <option>Pre Order</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block font-semibold">
                        Low Stock Alert
                    </label>

                    <input
                        type="number"
                        name="lowStockThreshold"
                        min={0}
                        value={formData.lowStockThreshold}
                        onChange={handleNumberChange}
                        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Status Switches */}

            <div className="mt-8 grid gap-4 md:grid-cols-3">
                <label className="flex items-center justify-between rounded-xl border p-4 cursor-pointer">
                    <div>
                        <h4 className="font-semibold">Featured Product</h4>
                        <p className="text-sm text-gray-500">
                            Show on homepage
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={() => toggleSwitch("isFeatured")}
                        className="h-5 w-5"
                    />
                </label>

                <label className="flex items-center justify-between rounded-xl border p-4 cursor-pointer">
                    <div>
                        <h4 className="font-semibold">Product Active</h4>
                        <p className="text-sm text-gray-500">
                            Customers can purchase
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={() => toggleSwitch("isActive")}
                        className="h-5 w-5"
                    />
                </label>

                <label className="flex items-center justify-between rounded-xl border p-4 cursor-pointer">
                    <div>
                        <h4 className="font-semibold">Soft Delete</h4>
                        <p className="text-sm text-gray-500">
                            Hide product from store
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={formData.isDeleted}
                        onChange={() => toggleSwitch("isDeleted")}
                        className="h-5 w-5"
                    />
                </label>
            </div>

            {/* Summary */}

            <div className="mt-8 rounded-xl bg-blue-50 border p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div>
                        <p className="text-gray-500 text-sm">Quantity</p>
                        <h3 className="text-xl font-semibold text-[#0E3A78]">
                            {formData.quantity}
                        </h3>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Status</p>
                        <h3 className="text-xl font-semibold text-[#0E3A78]">
                            {formData.stockStatus}
                        </h3>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Featured</p>
                        <h3 className="text-xl font-semibold text-[#0E3A78]">
                            {formData.isFeatured ? "Yes" : "No"}
                        </h3>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Visibility</p>
                        <h3 className="text-xl font-semibold text-[#0E3A78]">
                            {formData.isDeleted ? "Hidden" : "Visible"}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}