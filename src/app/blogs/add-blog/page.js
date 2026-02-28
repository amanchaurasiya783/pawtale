"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content1: "",
    content2: "",
    category: [],
    tags: [],
    images: [],
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, values) => {
    setFormData({
      ...formData,
      [name]: values.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message || "Blog added successfully!");
      setFormData({
        title: "",
        subtitle: "",
        content1: "",
        content2: "",
        category: [],
        tags: [],
        images: [],
      });
      router.back();
    } catch (error) {
      console.error(error);
      alert("Failed to add blog.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
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
          onChange={(e) => handleArrayChange("category", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          onChange={(e) => handleArrayChange("tags", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="images"
          placeholder="Images URLs (comma-separated)"
          onChange={(e) => handleArrayChange("images", e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}
