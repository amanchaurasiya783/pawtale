"use client";
import { useEffect, useState } from "react";
import ProductCard from "../_components/productcard";
import FilterSection from "@/app/_components/filtersection";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/productSlice";
import HeroSection from "../_components/herosection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const dynamic = "force-dynamic";

const Store = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.blog.searchTerm);
  const products = useSelector((state) => state.product?.products);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products`);
      if (!response.ok) throw new Error("Failed to fetch products.");
      const result = await response.json();
      dispatch(setProducts(result.products)); // Save products to redux store
      setFilteredProducts(result.products); // Initialize filtered list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchTerm || !searchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) =>
          product?.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          product?.category?.some((cat) =>
            cat.toLowerCase().includes(searchTerm.trim().toLowerCase()),
          ),
      );
      setFilteredProducts(filteredProducts);
    }
  }, [products, searchTerm]);

  const handleFilter = ({ priceRange, selectedTags, selectedCategory }) => {
    const filtered = products.filter((product) => {
      const matchesPrice =
        product?.price >= priceRange[0] && product?.price <= priceRange[1];
      const matchesTags = selectedTags.every((tag) =>
        product?.tags?.includes(tag),
      );
      const matchesCategory = selectedCategory
        ? product?.category === selectedCategory
        : true;

      return matchesPrice && matchesTags && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  const handleSort = (option) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (option) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    setFilteredProducts(sorted);
    setSortOption(option);
  };

  return (
    <>
      <HeroSection title={"Store"} backgroundImage={"/Assets/hero1.webp"} />
      <div className="my-5 px-2 mx-auto container">
        <div className="flex gap-3 justify-center flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <FilterSection onFilter={handleFilter} />
          </div>
          <div className="w-full mx-auto md:w-2/3">
            <div className="p-3 w-full flex justify-between items-center">
              <p>
                {loading ? (
                  <Skeleton width={200} />
                ) : (
                  `Showing ${filteredProducts.length} of ${products.length} Results`
                )}
              </p>
              <select
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="p-2 px-4 rounded-xl border border-gray-800"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
            <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : loading ? (
                Array(6)
                  .fill()
                  .map((_, index) => <Skeleton key={index} height={250} />)
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <Link href={`/store/${item?._id}`} key={index}>
                    <ProductCard
                      id={item?._id}
                      imgPath={item?.images?.[0]}
                      ProductName={item?.name}
                    />
                  </Link>
                ))
              ) : (
                <p>No Product Found!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
