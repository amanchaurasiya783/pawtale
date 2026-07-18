"use client";

import { useState } from "react";
import { ProductFormData } from "../types";
import { initialProduct } from "../initialProduct";

export default function useProductForm() {
    const [formData, setFormData] =
        useState<ProductFormData>(initialProduct);

    const [loading, setLoading] = useState(false);

    const updateField = <K extends keyof ProductFormData>(
        field: K,
        value: ProductFormData[K]
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialProduct);
    };

    const loadProduct = (product: ProductFormData) => {
        setFormData(product);
    };

    const validateProduct = () => {
        if (!formData.name.trim()) {
            alert("Product name is required.");
            return false;
        }

        if (!formData.skuID.trim()) {
            alert("SKU is required.");
            return false;
        }

        if (!formData.description.trim()) {
            alert("Description is required.");
            return false;
        }

        if (formData.price <= 0) {
            alert("Price must be greater than 0.");
            return false;
        }

        if (formData.mrp <= 0) {
            alert("MRP must be greater than 0.");
            return false;
        }

        if (formData.images.length === 0) {
            alert("At least one image is required.");
            return false;
        }

        return true;
    };

    const submitProduct = async (
        options?: {
            id?: string;
            updates?: Partial<ProductFormData> & Record<string, any>;
        }
    ) => {

        if (!validateProduct()) return { success: false };
        setLoading(true);

        try {
            const isEdit = !!options?.id;

            const response = await fetch(
                isEdit ? `/api/products/${options.id}` : "/api/products",
                {
                    method: isEdit ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        ...(options?.updates ?? {}),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    `Failed to ${isEdit ? "update" : "create"} product`
                );
            }

            if (isEdit) {
                setFormData(data.product);
                alert("Product updated successfully");
            } else {
                resetForm();
                alert("Product created successfully");
            }

            // return data.product;
            return data;
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const saveDraft = async (id?: string) => {
        return submitProduct({
            id,
            updates: {
                status: "draft",
            },
        });
    };

    const deleteProduct = async (id: string) => {
        if (!confirm("Delete this product?")) return;

        setLoading(true);

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isDeleted: true,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Delete failed");
            }

            alert("Product deleted");
            return data;
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        updateField,
        loading,

        resetForm,
        loadProduct,

        submitProduct,
        saveDraft,
        deleteProduct,
    };
}