import type { ComponentType } from "react";
import Image from "next/image";
import StarIconImport from "./staricon";
import HeartIcon from "./likedicon";

type ProductCardProps = {
    id: any;
    imgPath?: string;
    ProductName?: string;
    LikeStatus?: boolean;
};

const StarIcon = StarIconImport as ComponentType<{ id: any }>;

const ProductCard = ({ id, imgPath, ProductName, LikeStatus }: ProductCardProps) => {
    return (
        <div className="group relative shadow-lg p-2 flex flex-col gap-3 justify-center transition-all ease-in-out duration-300">
            <div className="relative w-45 h-55 aspect-square overflow-hidden rounded-lg p-2">
                <Image
                    src={imgPath || "/Assets/hari_krishna.png"}
                    alt="Category Images"
                    width={300}
                    height={500}
                    layout="responsive"
                    className="relative w-full h-full object-cover my-auto transition-transform duration-300 ease-in-out transform group-hover:scale-y-0"
                />
                <Image
                    src={imgPath || "/Assets/hari_krishna.png"}
                    alt="Category Images"
                    width={300}
                    height={500}
                    layout="responsive"
                    className="absolute inset-0 w-full h-full object-cover my-auto transition-transform duration-300 ease-in-out transform scale-y-0 group-hover:scale-y-100"
                />
            </div>
            <div className="flex flex-col justify-end">
                <div className="text-center">
                    <StarIcon id={id} />
                    <p className="text-center text-background font-medium">
                        {ProductName || "Product Name"}
                    </p>
                    <div className="flex justify-end mt-1">
                        <HeartIcon id={id} propliked={LikeStatus || true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
