export const dynamic = "force-dynamic";
// import Button from "../../_common/button/page";
import Button from "@/app/_components/button.tsx";
import CategoryCard from "../../_components/categorycard.tsx";
import ProductCard from "../../_components/productcard";

const ShopByCategory = async () => {
  // Category Banners
  const categoryBanners = [
    { name: "Dog", imgPath: "/Assets/dog1.png" },
    { name: "Cat", imgPath: "/Assets/catBanner.jpg" },
    { name: "Rabbit", imgPath: "/Assets/rabbitBanner.jpg" },
    { name: "Horse", imgPath: "/Assets/horseBanner.webp" },
    { name: "Birds", imgPath: "/Assets/birdBanner.jpg" },
    { name: "Fishes", imgPath: "/Assets/fishBanner.jpg" },
  ];

  // Fetch random products from API
  const fetchRandomProducts = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const product = await fetch(`${baseUrl}/api/products`, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const products = await product?.json();

      return products.products;
    } catch (error) {
      console.log("Error Fetching Products: ", error);
      return null;
    }
  };

  const products = await fetchRandomProducts();

  return (
    <div className="mx-auto my-5 p-6">
      <p className="text-md text-center font-medium text-background">
        PET NUTRIENTS
      </p>
      <div className="text-3xl font-semibold text-center mt-3 mb-8 text-background">
        Shop By Category
      </div>
      <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-5 gap-y-5">
        {categoryBanners.map((category) => (
          <CategoryCard
            key={category.name}
            CategoryName={category.name}
            imgPath={category.imgPath}
            redirectPath={"/store"}
          />
        ))}
      </div>
      <div className="mx-auto my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-5 gap-y-5">
        {products?.map((product) => (
          <ProductCard
            key={product?._id}
            id={product?._id}
            imgPath={product?.images?.[0]}
            ProductName={product?.name}
          />
        ))}
      </div>
      <div className="text-center">
        <Button redirectPath={"/store"} value={"View All"} />
      </div>
    </div>
  );
};

export default ShopByCategory;
