export const dynamic = "force-dynamic";

import Button from "@/app/_components/button.tsx";
import CategoryCard from "../../_components/categorycard.tsx";
import ProductCard from "../../_components/productcard";
import Link from "next/link";

const ShopByCategory = async () => {
  const categoryBanners = [
    { name: "Dog", imgPath: "/Assets/dog1.png" },
    { name: "Cat", imgPath: "/Assets/catBanner.jpg" },
    { name: "Rabbit", imgPath: "/Assets/rabbitBanner.jpg" },
    { name: "Horse", imgPath: "/Assets/horseBanner.webp" },
    { name: "Birds", imgPath: "/Assets/birdBanner.jpg" },
    { name: "Fishes", imgPath: "/Assets/fishBanner.jpg" },
  ];

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

      const products = await product.json();

      return products.products;
    } catch (error) {
      console.log("Error Fetching Products:", error);
      return null;
    }
  };

  const products = await fetchRandomProducts();

  return (
    <section className="bg-[#fafcff] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-background">
            Pet Nutrients
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-background">
            Shop By Category
          </h2>
        </div>

        {/* Categories */}
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categoryBanners.map((category) => (
            <CategoryCard
              key={category.name}
              CategoryName={category.name}
              imgPath={category.imgPath}
              redirectPath="/store"
            />
          ))}
        </div>

        {/* Featured Products */}
        <div className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-background">
              Featured Collection
            </p>

            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-background">
              Trending Products
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((product) => (
              <Link href={`/store/${product?._id}`} key={product?._id}>
                <ProductCard
                  id={product?._id}
                  imgPath={product?.images?.[0]}
                  ProductName={product?.name}
                  price={product?.price}
                  mrp={product?.mrp}
                  rating={product?.ratings}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Button redirectPath="/store" value="View All Products" />
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
