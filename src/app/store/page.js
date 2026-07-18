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
import Pagination from "../_components/pagination";

const Store = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.blog.searchTerm);
  const products = useSelector((state) => state.product?.products);

  // Fetch all products
  const fetchProducts = async (page = 1) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/products?page=${page}&limit=12`);

      const result = await response.json();
      console.log("resulttttt : ", result);

      dispatch(setProducts(result.products));

      setFilteredProducts(result.products);

      setCurrentPage(result.pagination.currentPage);

      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

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
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-24 h-fit rounded-2xl border bg-white p-5 shadow-sm">
            <FilterSection onFilter={handleFilter} />
          </div>
          <div className="space-y-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : loading ? (
                Array(6)
                  .fill()
                  .map((_, index) => (
                    <Skeleton key={index} height={400} className="rounded-xl" />
                  ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <Link href={`/store/${item?._id}`} key={index}>
                    {/* {console.log(item?.images?.[0])}; */}
                    <ProductCard
                      id={item?._id}
                      imgPath={item?.images?.[0]}
                      ProductName={item?.name}
                      price={item?.price}
                      mrp={item?.mrp}
                      rating={item?.ratings}
                    />
                  </Link>
                ))
              ) : (
                <p>No Product Found!</p>
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
