"use client";
import { useEffect, useState } from "react";
import { HeartIcon as SolidHeart } from "@heroicons/react/solid";
import { HeartIcon as Heart } from "@heroicons/react/outline";
import Cookies from "js-cookie";
import { verifyToken } from "../utils/authenticate";
import { fetchUserData } from "@/app/utils/myLib";

const HeartIcon = ({ id, propliked = false }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = async (e, status) => {
        e.preventDefault();
        e.stopPropagation();
        status ? setLiked(true) : setLiked(false);
        const token = Cookies.get("token");
        const user = token ? await verifyToken(token) : null;
        if (!user) return;
        const response = await fetch(`/api/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                type: status ? "addToWishlist" : "removeFromWishlist",
                productId: id,
            }),
        });
        const data = await response.json();
    };

    useEffect(() => {
        if (!id) return;

        const checkLikeStatus = async () => {
            try {
                const userData = await fetchUserData();
                setLiked(userData?.user.wishlist?.includes(id) || false);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        checkLikeStatus();
    }, [id]);
    return (
        <div>
            {!liked && (
                <Heart
                    onClick={(e) => handleLike(e, 1)}
                    className="w-8 h-8 bg-gray-300 text-background hover:bg-white p-1 rounded-full"
                />
            )}
            {liked && (
                <SolidHeart
                    onClick={(e) => handleLike(e, 0)}
                    className="w-8 h-8 bg-gray-300 text-background hover:bg-white p-1 rounded-full"
                />
            )}
        </div>
    );
};

export default HeartIcon;
