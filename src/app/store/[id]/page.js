import ProductDetail from "@/app/productdetail/page";

const fetchDetails = async (id) => {
  const result = await fetch(`${process.env.MAIN_URL}/api/products/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
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
