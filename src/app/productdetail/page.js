import ProductCard from "../_components/productcard";
import AddToCartButton from "../_components/addtocartbutton";
import StarIcon from "../_components/staricon";
import ProductImages from "@/app/_components/productimages";

function ProductDetail({ product }) {
  const discount =
    product?.mrp && product?.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Gallery Section */}
        <div className="w-full lg:w-[36%] xl:w-[38%]">
          <ProductImages images={product?.images} product={product} />
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-[60%] xl:w-[62%] min-w-0">
          <h1 className="text-2xl text-background font-semibold text-gray-800 leading-tight">
            {product?.name || "Product Name"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            <span className="font-medium">{product?.brand}</span>
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-sm">
              {product?.averageRating?.toFixed(1) || "0.0"} ★
            </span>

            <span className="text-sm text-gray-600">
              {product?.numReviews || 0} Ratings & Reviews
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-background font-semibold">
                ₹{product?.price?.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ₹{product?.mrp?.toLocaleString()}
              </span>
              <span className="text-green-600 font-medium">{discount} off</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              inclusive of all taxes
            </p>
            <p className="text-gray-700 mt-4 whitespace-pre-line">
              {product.description}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <p>
                <span className="font-medium">Brand:</span> {product.brand}
              </p>

              <p>
                <span className="font-medium">SKU:</span> {product.skuID}
              </p>

              <p>
                <span className="font-medium">Category:</span>{" "}
                {product.category.join(", ")}
              </p>

              <p>
                <span className="font-medium">Stock:</span> {product.quantity} (
                {product.stockStatus})
              </p>

              <p>
                <span className="font-medium">Warranty:</span>{" "}
                {product.warranty}
              </p>

              <p>
                <span className="font-medium">Return:</span>{" "}
                {product.returnDays} Days
              </p>
            </div>
          </div>

          {/* Highlights */}
          {/* <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
            {product.specifications.slice(0, 5).map((item) => (
              <li key={item.key}>
                {item.key}: {item.value}
              </li>
            ))}
          </ul> */}

          {/* Specifications */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Specifications
            </h2>

            <div className="border rounded-md overflow-hidden">
              <div className="flex odd:bg-gray-50 p-2 text-sm">
                <div className="w-1/3 text-gray-600">Weight</div>

                <div className="w-2/3">{product.weight} kg</div>
              </div>

              <div className="flex even:bg-white p-2 text-sm">
                <div className="w-1/3 text-gray-600">Dimensions</div>

                <div className="w-2/3">
                  {product.dimensions.length} × {product.dimensions.width} ×{" "}
                  {product.dimensions.height}
                </div>
              </div>

              {product.specifications.map((item) => (
                <div
                  key={item.key}
                  className="flex odd:bg-gray-50 even:bg-white p-2 text-sm"
                >
                  <div className="w-1/3 text-gray-600">{item.key}</div>

                  <div className="w-2/3">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl text-center border-b-2 border-gray-400 py-3">
          Frequently Bought Together
        </h2>
        <div className="grid gap-3 m-2 p-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {product?.relatedProducts?.length > 0
            ? product?.relatedProducts.map((relatedProduct) => (
                <Link href={`/store/${product?._id}`} key={relatedProduct?._id}>
                  <ProductCard
                    id={relatedProduct?._id}
                    mrp={relatedProduct?.mrp}
                    rating={relatedProduct?.ratings}
                    imgPath={relatedProduct?.images?.[0]}
                    ProductName={relatedProduct?.name}
                    price={relatedProduct?.price}
                  />
                </Link>
              ))
            : "No related products available"}
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl text-center border-b-2 border-gray-400 py-3">
          Reviews
        </h2>
        {product?.comments?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {product?.comments.map((comment) => (
              <div
                key={comment?._id}
                className="border p-3 rounded-lg shadow-sm"
              >
                <p className="font-medium">{comment?.comment}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(comment?.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-3 text-sm text-gray-600 mt-1">
                  <span>{comment?.likes} Likes</span>
                  <span>{comment?.replies?.length || 0} Replies</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
