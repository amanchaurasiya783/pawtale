"use client";

import { ProductFormData } from "../types";

type Props = {
    formData: ProductFormData;
};

export default function ProductReview({ formData }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#0E3A78]">
                        Customer Reviews
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Ratings and customer feedback.
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-3xl font-bold text-yellow-500">
                        ⭐ {formData.averageRating?.toFixed(1) || "0.0"}
                    </p>

                    <p className="text-sm text-gray-500">
                        {formData.numReviews || 0} Reviews
                    </p>
                </div>
            </div>

            {formData.ratings?.length ? (
                <div className="space-y-4">

                    {formData.ratings.map((review: any, index: number) => (
                        <div
                            key={index}
                            className="rounded-xl border border-gray-100 p-4"
                        >
                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {review.user?.name || "Customer"}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Rating
                                    </p>
                                </div>

                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                                    ⭐ {review.rating}
                                </span>

                            </div>

                            {review.comment && (
                                <p className="mt-3 text-gray-600">
                                    {review.comment}
                                </p>
                            )}
                        </div>
                    ))}

                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">

                    <p className="text-lg font-semibold text-gray-600">
                        No Reviews Yet
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Customer reviews will appear here once users start rating this product.
                    </p>

                </div>
            )}

        </div>
    );
}