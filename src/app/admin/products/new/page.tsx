"use client";

import { useRouter } from "next/navigation";

import useProductForm from "../hooks/useProductForm";
import ProductForm from "../components/productform";

export default function NewProductPage() {
    const router = useRouter();

    const {
        formData,
        setFormData,
        loading,
        submitProduct,
        saveDraft,
    } = useProductForm();

    const handlePublish = async () => {
        const success = await submitProduct({
            updates: {
                status: "published"
            }
        });
        if (success.success) {
            router.replace("/admin/products");
        }
    };

    const handleDraft = async () => {
        const success = await saveDraft();
        if (!!success.success) router.push("/admin/products");
    };

    const handleCancel = () => {
        const ans = confirm("Do You Really Want to Cancel ?");
        if (ans) {
            router.replace("/admin/products");
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">

            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-[#0E3A78]">
                    Add New Product
                </h1>

                <p className="mt-2 text-gray-500">
                    Fill all required product details before publishing.
                </p>
            </div>

            <ProductForm
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                isEdit={false}
                onPublish={handlePublish}
                onSaveDraft={handleDraft}
                onCancel={handleCancel}
            />

        </div>
    );
}