"use client";

type ProductActionsProps = {
    loading: boolean;
    isEdit?: boolean;

    onSaveDraft: () => void;
    onPublish: () => void;
    onDelete?: () => void;
    onCancel: () => void;
};

export default function ProductActions({
    loading,
    isEdit = false,
    onSaveDraft,
    onPublish,
    onDelete,
    onCancel,
}: ProductActionsProps) {
    return (
        <div className="sticky bottom-0 z-40 mt-10 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-lg shadow-2xl">

            <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">

                {/* Left */}

                <div>
                    <h3 className="text-xl font-semibold text-[#0E3A78]">
                        Ready to publish?
                    </h3>

                    <p className="text-sm text-gray-500">
                        Review all information before publishing this product.
                    </p>
                </div>

                {/* Right */}

                <div className="flex flex-wrap gap-3">

                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSaveDraft}
                        disabled={loading}
                        className="rounded-xl border border-blue-600 px-6 py-3 font-medium text-blue-700 transition hover:bg-blue-50 disabled:opacity-50"
                    >
                        Save Draft
                    </button>

                    <button
                        type="submit"
                        onClick={onPublish}
                        disabled={loading}
                        className="rounded-xl bg-[#0E3A78] px-8 py-3 font-semibold text-white transition hover:bg-[#12448c] disabled:opacity-50"
                    >
                        {loading
                            ? "Please wait..."
                            : isEdit
                                ? "Update Product"
                                : "Publish Product"}
                    </button>

                    {/* show it on editing product only */}
                    {isEdit && (
                        <button
                            type="button"
                            onClick={onDelete}
                            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                            Delete Product
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}