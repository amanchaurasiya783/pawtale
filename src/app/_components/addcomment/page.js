"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function AddComment({ setAllComment, blogId }) {
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);
  //submit form and set blog data to useState
  const submitComment = async (commentData, blogId) => {
    const content = { type: "comment", ...commentData };
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch blog details");
    }
    const blog = await response.json();
    console.log("blog : ", blog.blog.comments);

    setAllComment(blog.blog.comments);
  };
  return (
    <div className="w-full flex gap-3">
      <Image
        className="rounded-full overflow-hidden w-16 aspect-square"
        src={"/assets/hari_krishna.png"}
        width={100}
        height={100}
        alt="profile pic"
      />
      <form
        ref={formRef}
        className="w-full relative"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setSubmitting(true);
            const comment = e.target.elements.comment.value;
            if (!comment) {
              alert("Comment cannot be empty");
              return;
            }
            await submitComment({ comment: comment }, blogId);
            formRef.current.reset();
            setSubmitting(false);
          } catch (error) {
            console.log(error.message);
            alert("Failed to submit comment. Please try again.");
          }
        }}
      >
        <input
          type="text"
          name="comment"
          placeholder="Comment"
          className="bg-transparent outline-none p-1 w-full border-b-2"
          required
          aria-label="Comment"
        />
        <button
          type="submit"
          className="absolute mt-10 right-0 px-3 py-1 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
          disabled={submitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
