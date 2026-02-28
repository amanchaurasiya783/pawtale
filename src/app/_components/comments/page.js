"use client";
import { useState } from "react";
import AddComment from "../addcomment/page";
import Comment from "../comment/page";

const Comments = ({ blogId, comments }) => {
  const [allComment, setAllComment] = useState(
    Array.isArray(comments) ? comments : [],
  );
  return (
    <div className="relative">
      <AddComment blogId={blogId} setAllComment={setAllComment} />
      {allComment.length > 0 ? (
        <div className="h-96 overflow-auto mt-5">
          <div className="text-2xl font-semibold text-background my-5">
            Comments ({allComment.length})
          </div>
          {allComment.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              commentId={comment._id}
              blogId={blogId}
              setAllComment={setAllComment}
            />
          ))}
        </div>
      ) : (
        <div className="text-2xl font-semibold text-background my-5">
          No Comments Yet
        </div>
      )}
    </div>
  );
};

export default Comments;
