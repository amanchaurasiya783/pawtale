"use client";

import ProductBasicInfo from "./productbasicInfo";
import ProductPricing from "./productpricing";
import ProductImages from "./productimages";
import ProductCategory from "./productcategory";
import ProductInventory from "./productinventory";
import ProductSpecifications from "./productspecifications";
import ProductShipping from "./productshipping";
import ProductSettings from "./productsettings";
import ProductReview from "./productpreview";
import ProductActions from "./productactions";
import DeleteModal from "./deletemodal";

import { ProductFormData } from "../types";

type Props = {
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;

    loading: boolean;
    isEdit?: boolean;

    showDeleteModal?: boolean;
    setShowDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;

    onPublish: () => void;
    onSaveDraft: () => void;
    onCancel: () => void;
    onDelete?: () => void;
};

export default function ProductForm({
    formData,
    setFormData,
    loading,

    isEdit = false,

    showDeleteModal = false,
    setShowDeleteModal,
    onPublish,
    onSaveDraft,
    onCancel,
    onDelete,
}: Props) {
    return (
        <div className="mx-auto max-w-7xl space-y-8">

            <ProductBasicInfo
                formData={formData}
                setFormData={setFormData}
            />

            <ProductPricing
                formData={formData}
                setFormData={setFormData}
            />

            <ProductImages
                formData={formData}
                setFormData={setFormData}
            />

            <ProductCategory
                formData={formData}
                setFormData={setFormData}
            />

            <ProductInventory
                formData={formData}
                setFormData={setFormData}
            />

            <ProductSpecifications
                formData={formData}
                setFormData={setFormData}
            />

            <ProductShipping
                formData={formData}
                setFormData={setFormData}
            />

            <ProductSettings
                formData={formData}
                setFormData={setFormData}
            />

            {isEdit && (
                <ProductReview
                    formData={formData}
                />
            )}

            <ProductActions
                loading={loading}
                isEdit={isEdit}
                onPublish={onPublish}
                onSaveDraft={onSaveDraft}
                onCancel={onCancel}
                onDelete={
                    isEdit && setShowDeleteModal
                        ? () => setShowDeleteModal(true)
                        : undefined
                }
            />

            {isEdit && setShowDeleteModal && (
                <DeleteModal
                    open={showDeleteModal}
                    loading={loading}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={onDelete!}
                />
            )}
        </div>
    );
}