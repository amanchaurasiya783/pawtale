"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import useProductForm from "../hooks/useProductForm";
import ProductForm from "../components/productform";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        formData,
        setFormData,
        loading,
        loadProduct,
        submitProduct,
        deleteProduct,
        saveDraft,
    } = useProductForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }

                const data = await response.json();
                console.log("data : ", data.productDetails);


                loadProduct(data.productDetails);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleUpdate = async () => {
        const success = await submitProduct({
            id: id as string,
            updates: {
                status: "published"
            }
        });

        if (success.success) {
            router.replace("/admin/products");
        }
    };

    const handleDelete = async () => {
        await deleteProduct(id as string);
        setShowDeleteModal(false);
        router.replace("/admin/products");
    };

    const handleDraft = async () => {
        await saveDraft(id as string);
    };

    const handleCancel = () => {
        if (confirm("Cancel ?")) router.replace("/admin/products");
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0E3A78]">
                    Edit Product
                </h1>

                <p className="mt-2 text-gray-500">
                    Update product information and save your changes.
                </p>
            </div>

            <ProductForm
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                isEdit={true}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                onPublish={handleUpdate}
                onSaveDraft={handleDraft}
                onDelete={handleDelete}
                onCancel={handleCancel}
            />
        </div>
    );
}