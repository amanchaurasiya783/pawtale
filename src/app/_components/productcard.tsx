import type { ComponentType } from "react";
import Image from "next/image";
import HeartIcon from "./likedicon";
import StarIconImport from "./staricon";

const StarIcon = StarIconImport as ComponentType<{ id: any }>;

const ProductCard = ({
    id,
    imgPath,
    ProductName,
    price,
    mrp,
    rating,
    reviews,
    LikeStatus,
}) => {
    const discount = Math.round(((mrp - price) / mrp) * 100);

    return (
        <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            {/* Image */}
            <div className="relative overflow-hidden bg-gray-50">

                {/* Discount Badge */}
                <div className="absolute left-4 top-4 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    {discount}% OFF
                </div>

                {/* Wishlist */}
                <div className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 shadow-lg">
                    <HeartIcon
                        id={id}
                        propliked={LikeStatus}
                    />
                </div>

                <div className="aspect-square overflow-hidden">
                    <Image
                        src={imgPath}
                        alt={ProductName}
                        width={500}
                        height={500}
                        className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-110"
                        unoptimized
                    />
                </div>

            </div>

            {/* Content */}

            <div className="space-y-1 p-4">

                {/* Rating */}

                <div className="flex items-center gap-2">

                    <StarIcon id={id} />

                    <span className="text-sm text-gray-500">
                        ({reviews || 1})
                    </span>

                </div>

                {/* Name */}

                <h3 className="line-clamp-2 truncate max-w-[280px] min-h-[5px] text-lg font-semibold text-background">
                    {ProductName}
                </h3>

                {/* Price */}

                <div className="flex items-end gap-2">

                    <span className="text-2xl font-bold text-background">
                        ₹{price}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                        ₹{mrp}
                    </span>

                </div>

                <p className="text-sm font-medium text-green-600">
                    You save ₹{mrp - price}
                </p>

                {/* Button */}

                <button className="mt-2 w-full rounded-xl bg-background py-2 text-sm font-semibold text-white transition hover:opacity-90">
                    Add to Cart
                </button>

            </div>

        </div>
    );
};

export default ProductCard;