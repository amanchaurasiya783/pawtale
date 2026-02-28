"use client";
import Link from "next/link";
import BlogCard from "../_components/blogcard/layout";
import Sidebar from "../_components/sidebar/page";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { verifyToken } from "../utils/authenticate";

const fetchSavedBlogs = async () => {
  const token = Cookies.get("token");
  const user = await verifyToken(token);
  const response = await fetch(`/api/users/${user.id}?populate=savedBlogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.user.savedBlogs;
};

export default function Blogs() {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch all Blogs
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await fetchSavedBlogs();
        console.log("Blogs: ", blogs);
        setSavedBlogs(blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div
      className={`my-5 px-2 w-full mx-auto container ${
        loading
          ? "w-full text-center"
          : "flex justify-center flex-col md:flex-row"
      }`}
    >
      {loading && (
        <p className="w-full text-center text-black cursor-not-allowed">
          Loading...
        </p>
      )}
      <div
        className={`w-full text-center md:w-2/3 p-2 shadow-lg ${
          savedBlogs?.length === 0
            ? "w-full mx-auto"
            : "grid justify-center justify-items-center grid-cols-1 md:px-3 md:grid-cols-3 gap-2 sm:grid-cols-2"
        }`}
      >
        {!loading &&
          (savedBlogs?.length > 0 ? (
            savedBlogs.map((blog) => (
              <Link href={`/blogs/${blog._id}`} key={blog._id}>
                <BlogCard
                  imgPath={blog.images[0]}
                  title={blog.title}
                  desc={blog.content1.slice(0, 100)}
                />
              </Link>
            ))
          ) : (
            <Link href="/blogs" className="border border-red-300 mx-auto">
              <p className="w-full text-center text-black cursor-not-allowed">
                No Saved Blog Found !
              </p>
              <p className="w-full text-center text-black cursor-pointer">
                Add some blogs to your list.
              </p>
            </Link>
          ))}
      </div>
      {/* <div className="w-full md:w-1/3 shadow-lg p-4">
        <Sidebar />
      </div> */}
    </div>
  );
}
