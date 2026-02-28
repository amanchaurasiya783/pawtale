"use client";
import Link from "next/link";
import Sidebar from "../_components/sidebar/page";
import { PlusCircleIcon as AddIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { verifyToken } from "../utils/authenticate";
import MyBlogCard from "../_components/myblogcard/layout";
import { useSelector } from "react-redux";

const fetchUser = async () => {
  const token = Cookies.get("token");
  const user = await verifyToken(token);
  return user;
};

export default function Blogs() {
  const [myBlogs, setMyBlogs] = useState([]);

  //fetch all Blogs
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const user = await fetchUser();
        if (!user) {
          throw new Error("User not found");
        }
        const response = await axios.get(
          `${process.env.MAIN_URL}/api/blogs?userId=${user.id}`,
        );
        const blogs = response.data.blogs;

        setMyBlogs(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  const userRole = useSelector((state) => state.user.userRole);
  const canAddBlog = ["Admin", "Beyonder"].includes(userRole);

  return (
    <div className="my-5 px-2 w-full mx-auto container justify-center flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 shadow-lg relative">
        {canAddBlog && (
          <div className="relative h-20 flex gap-2">
            <Link
              href="/blogs/add-blog"
              className="absolute top-4 right-4 z-10"
            >
              <AddIcon className="w-8 h-8 text-blue-500 cursor-pointer" />
            </Link>
          </div>
        )}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 relative">
          {myBlogs.length > 0
            ? myBlogs.map((blog) => (
                <Link href={`/blogs/${blog._id}`} key={blog._id}>
                  <MyBlogCard
                    blogId={blog._id}
                    imgPath={blog.images[0]}
                    title={blog.title}
                    desc={blog.content1.slice(0, 100)}
                  />
                </Link>
              ))
            : "No Blog Found"}
        </div>
      </div>
      {/* <div className="w-full md:w-1/3 shadow-lg p-4">
        <Sidebar />
      </div> */}
    </div>
  );
}
