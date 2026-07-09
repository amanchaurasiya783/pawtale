export const dynamic = "force-dynamic";
import ProductDetail from "@/app/productdetail/page";

const fetchDetails = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const result = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!result.ok) {
    throw new Error("store details API failed");
  }
  const response = await result.json();
  return response.productDetails;
};

const ProductData = async ({ params }) => {
  const id = params.id;
  const productDetails = await fetchDetails(id);

  return (
    <div>
      <ProductDetail product={productDetails} />
    </div>
  );
};

export default ProductData;
