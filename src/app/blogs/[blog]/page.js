import Comments from "@/app/_components/comments/page";
import BookmarkIconComp from "@/app/_components/bookmarkicon/page";
import { SearchCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

// Fetch Blog Details
async function fetchBlogById(blogId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/blogs/${blogId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null;
  }
}

export default async function Blog({ params }) {
  const { blog: blogId } = params;
  if (!blogId || !mongoose.isValidObjectId(blogId)) {
    notFound();
  }

  const blog = await fetchBlogById(blogId);
  if (!blog) notFound();

  const {
    createdAt,
    createdBy,
    images,
    comments = [],
    title,
    subtitle,
    content2: content,
    content1: intro_content,
  } = blog.blogDetails;

  return (
    <div className="my-5 px-2 mx-auto container flex flex-col md:flex-row gap-6">
      {/* Main Blog Content */}
      <div className="w-full md:w-4/5 rounded-lg shadow-lg p-4 bg-white">
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <img
            src={images[0] || "/Assets/default_banner.png"}
            className="w-full h-full object-cover"
            alt={title || "blog banner image"}
          />
        </div>
        <div className="flex justify-between items-center my-3 text-gray-600 text-sm">
          <p>
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {comments.length > 0 && `• ${comments.length} Comment(s)`}
          </p>
          <div className="flex items-center gap-2">
            {/* Bookmark Icon */}
            <BookmarkIconComp
              status={createdBy.savedBlogs.includes(blogId)}
              blogId={blogId}
            />
            <img
              src={images[1] || "/Assets/default_author.png"}
              className="w-7 h-7 rounded-full"
              alt="author profile"
            />
            <span className="font-medium">
              {createdBy.firstName + " " + createdBy.lastName ||
                "Unknown Author"}
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-semibold my-4">
          {title || "Untitled Blog"}
        </h1>
        <p className="text-gray-700 mb-4 font-medium">
          {intro_content || "Introduction content is not available."}
        </p>
        <div className="flex gap-4 flex-col-reverse sm:flex-row pb-24">
          <div className="w-full md:w-3/5">
            <h2 className="text-xl font-semibold my-3">
              {subtitle || "No subtitle provided"}
            </h2>
            <p className="text-gray-700 font-medium">
              {content || "No content available."}
            </p>
          </div>
          <div className="w-full sm:w-2/5">
            <img
              src={images[1] || "/Assets/default_secondary.png"}
              alt="Secondary Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Comment Section */}
        <div className="mx-3 my-5">
          <Comments blogId={blogId} comments={comments} />
        </div>
        <hr className="h-0.5 bg-gray-300" />
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-1/5 rounded-lg shadow-lg p-4 bg-white space-y-6">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Search blogs"
            className="flex-grow bg-transparent outline-none text-gray-700"
          />
          <SearchCircleIcon className="w-6 h-6 text-background" />
        </div>

        {/* Trending Blogs */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Trending</h3>
          <ul className="space-y-3">
            {[
              "Sample Trending Blog 1",
              "Sample Trending Blog 2",
              "Sample Trending Blog 3",
            ].map((blog, index) => (
              <li key={index} className="text-sm text-gray-700">
                <a href="#" className="hover:text-blue-600">
                  {blog}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Uploaded Blogs */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Latest Uploaded</h3>
          <ul className="space-y-3">
            {[
              "Latest Blog Post 1",
              "Latest Blog Post 2",
              "Latest Blog Post 3",
            ].map((blog, index) => (
              <li key={index} className="text-sm text-gray-700">
                <a href="#" className="hover:text-blue-600">
                  {blog}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <img
          src="/Assets/hari_krishna.png"
          alt="Advertisement"
          className="w-full aspect-square my-4"
        />
      </aside>
    </div>
  );
}
