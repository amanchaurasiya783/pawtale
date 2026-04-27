"use client";
import { useEffect, useState } from "react";
import { BookmarkIcon as SolidBookmark } from "@heroicons/react/solid";
import { BookmarkIcon as Bookmark } from "@heroicons/react/outline";
import axios from "axios";
import Cookies from "js-cookie";
import { verifyToken } from "@/app/utils/authenticate";
const token = Cookies.get("token");

const BookmarkIconComp = ({ blogId, status }) => {
    const [saveStatus, setSaveStatus] = useState(status);

    // Fetch User Data to Check Saved Blogs
    async function isBlogSavedByUser(blogId) {
        const user = await verifyToken(token);
        try {
            if (!user || typeof user === "boolean") throw new Error("User not found");
            const response = await axios.get(
                // `${process.env.DEVELOPMENT_URL}/api/users/${user.id}`
                `${process.env.PRODUCTION_URL}/api/users/${user.id}`
            );
            if (response.status !== 200)
                throw new Error("Failed to fetch user details");

            return response.data?.user.savedBlogs.includes(blogId) || false;
        } catch (error) {
            console.error("Error fetching user details:", error.message);
            return false;
        }
    }

    // Update bookmark status
    const updateBookmark = async (status) => {
        try {
            const user = await verifyToken(token);
            if (!user || typeof user === "boolean") throw new Error("User not found");
            const userId = user.id;
            const response = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogId,
                    type: saveStatus ? "unSaveBlog" : "saveBlog",
                }),
            });
            if (!response.ok) throw new Error("Failed to update bookmark");
            setSaveStatus(status);
            const data = await response.json();
        } catch (error) {
            console.error("Error updating bookmark: ", error);
            alert("Error updating bookmark: " + error.message);
        }
    };

    useEffect(() => {
        isBlogSavedByUser(blogId).then((status) => setSaveStatus(status));
    }, []);

    return (
        <div>
            {!saveStatus ? (
                <Bookmark
                    onClick={() => updateBookmark(true)}
                    className="w-8 h-8 hover:bg-gray-100 p-1 rounded-full"
                />
            ) : (
                <SolidBookmark
                    onClick={() => updateBookmark(false)}
                    className="w-8 h-8 hover:bg-gray-100 p-1 rounded-full"
                />
            )}
        </div>
    );
};

export default BookmarkIconComp;
