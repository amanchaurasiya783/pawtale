import ProductCard from "../_components/productcard";
import AddToCartButton from "../_components/addtocartbutton";
import StarIcon from "../_components/staricon";
import ProductImages from "@/app/_components/productimages";

function ProductDetail({ product }) {
  // Mock product data
  const productw = {
    id: "123",
    title:
      "Samsung Galaxy S23 Ultra 5G (Phantom Black, 12GB RAM, 256GB Storage)",
    brand: "Samsung",
    price: 109999,
    discountedPrice: 94999,
    rating: 4.7,
    reviews: 12453,
    images: [
      "/galaxy-s23-ultra-1.jpg",
      "/galaxy-s23-ultra-2.jpg",
      "/galaxy-s23-ultra-3.jpg",
      "/galaxy-s23-ultra-4.jpg",
    ],
    highlights: [
      "200MP Quad Camera System",
      "S Pen Support with 2.8ms latency",
      "5000mAh Battery | 45W Fast Charging",
      "Corning Gorilla Glass Victus 2",
    ],
    specifications: {
      general: {
        "Model Name": "Galaxy S23 Ultra",
        "Model Number": "SM-S918BZKQINS",
        Color: "Phantom Black",
        "SIM Type": "Dual SIM (Nano + eSIM)",
      },
      display: {
        "Display Size": "6.8 inch",
        Resolution: "QHD+ (3088 x 1440)",
        "Refresh Rate": "120Hz",
      },
      performance: {
        Processor: "Snapdragon 8 Gen 2",
        RAM: "12GB",
        Storage: "256GB",
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery Section */}
        <div className="md:w-2/5">
          <ProductImages images={product?.images} product={product} />
        </div>

        {/* Product Details Section */}
        <div className="md:w-3/5">
          <h1 className="text-2xl text-background font-semibold text-gray-800">
            {product?.name || "Product Name"}
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-sm">
              {product?.ratings?.length} ★
            </span>
            <span className="text-sm text-gray-600">
              {productw.reviews.toLocaleString()} Ratings & Reviews
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
              <span className="text-green-600 font-medium">
                {product?.discount} off
              </span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              inclusive of all taxes
            </p>
            <p className="text-gray-700 mt-4">
              {product?.description || "Description not available"}
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-800">Highlights</h2>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
              {productw.highlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Specifications
            </h2>

            {Object.entries(productw.specifications).map(([section, items]) => (
              <div key={section} className="mb-4">
                <h3 className="font-medium text-gray-700 capitalize">
                  {section}
                </h3>
                <div className="mt-2 border rounded-md overflow-hidden">
                  {Object.entries(items).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex odd:bg-gray-50 even:bg-white p-2 text-sm"
                    >
                      <div className="w-1/3 text-gray-600">{key}</div>
                      <div className="w-2/3">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
                <ProductCard
                  key={relatedProduct?._id}
                  imgPath={relatedProduct?.images?.[0]}
                  ProductName={relatedProduct?.name}
                  price={relatedProduct?.price}
                />
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
