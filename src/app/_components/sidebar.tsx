"use client";
import { SearchCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import BlogCard from "./blogcard";

export default function Sidebar() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        // Fetch suggestions here (mock data for now)
        setSuggestions([
            { id: 1, title: "Mastering JavaScript" },
            { id: 2, title: "Introduction to Tailwind CSS" },
            { id: 3, title: "Why Next.js is Amazing" },
        ]);
    }, []);

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
            <ul className="space-y-3">
                {suggestions.map((item) => (
                    <li
                        key={item.id}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
