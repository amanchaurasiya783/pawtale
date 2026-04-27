export const dynamic = "force-dynamic";
import ProductDetail from "@/app/productdetail/page";

const fetchDetails = async (id) => {
  const result = await fetch(`/api/products/${id}`, {
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
