"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBlog({ params }) {
  const router = useRouter();
  const { blog: blogId } = params;

  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content1: "",
    content2: "",
    category: [],
    tags: [],
    images: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch blog details on load
  async function fetchBlogDetail(blogId) {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog details");
      }

      let blogDetails = await response.json();
      blogDetails = blogDetails.blogDetails;

      // Update formData with fetched blog details
      setFormData({
        title: blogDetails.title || "",
        subtitle: blogDetails.subtitle || "",
        content1: blogDetails.content1 || "",
        content2: blogDetails.content2 || "",
        category: blogDetails.category?.join(",") || "",
        tags: blogDetails.tags?.join(",") || "",
        images: blogDetails.images?.join(",") || "",
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!blogId) {
      setError(true);
      setIsLoading(false);
      return;
    }

    fetchBlogDetail(blogId);
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        category: formData.category.split(",").map((item) => item.trim()),
        tags: formData.tags.split(",").map((item) => item.trim()),
        images: formData.images.split(",").map((item) => item.trim()),
      };

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      alert(data.message || "Blog updated successfully!");
      router.back();
    } catch (error) {
      console.error(error);
      alert("Failed to update blog.");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-red-600 m-auto my-5">No Blog Found</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content1"
          placeholder="Content 1"
          value={formData.content1}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content2"
          placeholder="Content 2"
          value={formData.content2}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="text"
          name="category"
          placeholder="Categories (comma-separated)"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="images"
          placeholder="Images URLs (comma-separated)"
          value={formData.images}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
