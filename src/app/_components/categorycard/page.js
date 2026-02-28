import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ CategoryName, imgPath, redirectPath }) => {
  return (
    <Link href={redirectPath}>
      <div className="group text-center space-y-2 cursor-pointer">
        <div className="rounded-full overflow-clip w-40 h-40 mx-auto flex items-center justify-center">
          <Image
            src={imgPath || "/Assets/cat1.png"}
            alt="Category Images"
            width={160}
            height={160}
            layout="responsive"
            className="w-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={true}
          />
        </div>
        <p className="font-semibold text-lg text-background group-hover:opacity-80 transition-opacity duration-300">
          {CategoryName || "Category Name"}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
