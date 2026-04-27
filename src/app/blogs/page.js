"use client";
import Link from "next/link";
import BlogCard from "../_components/blogcard.tsx";
import Sidebar from "../_components/sidebar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from "../redux/blogSlice";
import axios from "axios";
import HeroSection from "../_components/herosection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const dispatch = useDispatch();
  const fetchedBlogs = useSelector((state) => state.blog?.blogs);
  const searchTerm = useSelector((state) => state.blog?.searchTerm);
  const isLoading = fetchedBlogs.length === 0;

  // Fetch Blogs
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogs?page=1&limit=15",
        );
        const blogs = response.data.blogs;
        dispatch(setBlogs(blogs));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, [dispatch]);

  // Filter Blogs
  useEffect(() => {
    if (!searchTerm || !searchTerm.trim()) {
      setAllBlogs(fetchedBlogs);
    } else {
      const filteredBlogs = fetchedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      );
      setAllBlogs(filteredBlogs);
    }
  }, [fetchedBlogs, searchTerm]);

  return (
    <>
      <HeroSection title="Blogs" backgroundImage="/Assets/hero1.webp" />

      <div className="my-5 px-2 w-full mx-auto container justify-center flex flex-col md:flex-row">
        {/* Blog List */}
        <div className="w-full md:w-2/3 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading
            ? [...Array(6)].map((_, index) => (
                <div key={index} className="border rounded-lg p-3 shadow-md">
                  <Skeleton height={200} />
                  <Skeleton height={20} className="mt-2" />
                  <Skeleton height={15} width="80%" className="mt-2" />
                </div>
              ))
            : allBlogs.length > 0
              ? allBlogs.map((blog) => (
                  <Link href={`/blogs/${blog?._id}`} key={blog?._id}>
                    <BlogCard
                      imgPath={blog?.images?.[0]}
                      title={blog?.title}
                      desc={blog?.content1?.slice(0, 90) + " ..."}
                    />
                  </Link>
                ))
              : "No Blogs Found"}
        </div>

        {/* Sidebar (uncomment when needed) */}
        {/* <div className="w-full md:w-1/3 shadow-lg p-4">
          <Sidebar />
        </div> */}
      </div>
    </>
  );
}
