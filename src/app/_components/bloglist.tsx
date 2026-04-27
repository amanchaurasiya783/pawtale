"use client";
import { useEffect, useState } from "react";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blog data here (mock data for now)
        setBlogs([
            {
                id: 1,
                title: "Understanding React Hooks",
                description: "Learn about React hooks and how to use them.",
            },
            {
                id: 2,
                title: "Getting Started with Next.js",
                description: "A guide to building applications with Next.js.",
            },
            {
                id: 3,
                title: "Advanced CSS with Tailwind",
                description: "Tips and tricks for using Tailwind CSS effectively.",
            },
        ]);
    }, []);

    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <div key={blog.id} className="p-4 bg-white shadow rounded-lg">
                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                    <p className="text-gray-700">{blog.description}</p>
                </div>
            ))}
        </div>
    );
}
