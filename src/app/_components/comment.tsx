"use client";

import { useState } from "react";
import Button from "./button";

const Comment = ({ comment, commentId, blogId, setAllComment }) => {
    const { userID, createdAt, comment: content } = comment;
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitReply = async (e) => {
        try {
            e.preventDefault();
            if (!replyContent.trim()) return;
            setIsSubmitting(true);
            const response = await fetch(`/api/blogs/${blogId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "reply",
                    commentId: commentId,
                    reply: replyContent.trim(),
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to submit reply");
            }
            const updatedBlog = await response.json();
            setAllComment(updatedBlog.newBlog.comments);
            setShowReplyForm(false);
            setReplyContent("");
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full relative py-2 border-b-2">
            <div className="flex gap-3">
                <img
                    src={"/Assests/hari_krishna.png"}
                    className="w-12 h-12 overflow-hidden rounded-full"
                />
                <div>
                    <div className="text-xl font-semibold text-background">
                        {userID ? `${userID.firstName} ${userID.lastName}` : "User Name"}
                    </div>
                    <div className="text-gray-500 text-sm">
                        {new Date(createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            </div>
            <p className="text-gray-700">
                {content ||
                    "Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui."}
            </p>
            {/* Reply Button */}
            <div
                className="relative mt-2 sm:absolute sm:right-0 sm:top-0"
                onClick={() => setShowReplyForm(!showReplyForm)}
            >
                <Button value={"Reply"} redirectPath="" />
            </div>
            {/* Reply Form */}
            {showReplyForm && (
                <div className="mt-3">
                    <input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full p-1 border-b-2 outline-none"
                        disabled={isSubmitting}
                    />
                    <button
                        onClick={submitReply}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
                        disabled={isSubmitting || !replyContent.trim()}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Reply"}
                    </button>
                </div>
            )}

            {/* Replies */}
            {comment.replies.length > 0 && (
                <div className="ml-6 mt-4">
                    <h3 className="font-semibold text-gray-600">Replies:</h3>
                    {comment.replies.map((reply, index) => (
                        <div key={index} className="border-l-2 pl-4 mt-2">
                            <div className="text-sm text-gray-500">
                                {reply.userID.firstName + " " + reply.userID.lastName ||
                                    "User Name"}{" "}
                                • {new Date(reply.createdAt).toLocaleDateString()}
                            </div>
                            <p className="text-gray-700">{reply.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
