import connectToDatabase from "@/app/lib/mongodb";
import Blogs from "@/app/lib/blogModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// get details of Blog By Id
export async function GET(req, { params }) {
  try {
    const { blog } = params;
    await connectToDatabase();
    const blogDetails = await Blogs.findOne({
      _id: blog,
      isDeleted: false,
    })
      .populate([
        { path: "createdBy", select: "firstName lastName savedBlogs" },
        { path: "comments.userID", select: "firstName lastName" },
        { path: "comments.replies.userID", select: "firstName lastName" },
      ])
      .exec();

    if (!blogDetails) {
      return NextResponse.json(
        { message: "Blog Doesn't Exist" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "success", blogDetails },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error on fetching blog details: ", error);
    return NextResponse.json("Internal Server Error: ", error);
  }
}

// update Blog Details By Id
export async function PUT(req, { params }) {
  try {
    const updatedBlogDetails = await req.json();

    const { title, subtitle, content1, content2 } = updatedBlogDetails;

    //validate the required details
    if (!title || !subtitle || !content1 || !content2) {
      return NextResponse.json(
        { message: "Details Missing!" },
        { status: 400 }
      );
    }

    if (!updatedBlogDetails || Object.keys(updatedBlogDetails).length === 0) {
      return NextResponse.json(
        { message: "No Data Provided for Update" },
        { status: 400 }
      );
    }
    const { blog } = params;
    await connectToDatabase();
    const blogDetails = await Blogs.findOneAndUpdate(
      { _id: blog, isDeleted: false },
      updatedBlogDetails,
      { new: true, runValidators: true }
    );

    if (!blogDetails) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog Updated Successfully!", blogDetails },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Updating Blog: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error: ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Update Blog's Like, Comment
export async function PATCH(req, { params }) {
  const { blog: id } = params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid or Missing Blog ID!" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const userID = req.headers.get("x-user-id");

  if (!body)
    return NextResponse.json({ message: "Nothing to Update" }, { status: 204 });

  const { type, rating, comment, reply, commentId, replyId } = body;

  if (!type || !["rating", "comment", "reply"].includes(type)) {
    return NextResponse.json(
      { message: "Invalid type. Must be 'rating', 'comment', or 'reply'." },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    if (type === "rating") {
      if (!userID || rating === undefined || rating < 0 || rating > 5) {
        return NextResponse.json(
          { message: "Invalid rating or userID" },
          { status: 400 }
        );
      }

      update = {
        $pull: { ratings: { userID } },
        $push: { ratings: { userID, rating } },
      };
      const blog = await Blogs.findOneAndUpdate(
        { _id: id, isDeleted: false },
        update,
        {
          new: true,
        }
      );

      if (!blog)
        return NextResponse.json(
          { message: "Blog Not Found!" },
          { status: 404 }
        );

      return NextResponse.json(
        { message: "Rating updated successfully!", blog },
        { status: 200 }
      );
    }

    //to add Comment in blog
    if (type === "comment") {
      if (!userID || !comment || !comment.trim()) {
        return NextResponse.json(
          { message: "Invalid comment or userID" },
          { status: 400 }
        );
      }

      const update = {
        $push: { comments: { userID, comment: comment.trim(), replies: [] } },
      };
      const blog = await Blogs.findOneAndUpdate(
        { _id: id, isDeleted: false },
        update,
        {
          new: true,
        }
      )
        .populate([
          { path: "createdBy", select: "firstName lastName savedBlogs" },
          { path: "comments.userID", select: "firstName lastName" },
          { path: "comments.replies.userID", select: "firstName lastName" },
        ])
        .exec();

      if (!blog)
        return NextResponse.json(
          { message: "Blog Not Found!" },
          { status: 404 }
        );

      return NextResponse.json(
        { message: "Comment added successfully!", blog },
        { status: 200 }
      );
    }

    //to add Reply in blog
    if (type === "reply") {
      if (!reply || !reply.trim() || !userID || !(commentId || replyId)) {
        return NextResponse.json(
          { message: "Invalid reply data" },
          { status: 400 }
        );
      }

      const blog = await Blogs.findOne({ _id: id, isDeleted: false });
      if (!blog)
        return NextResponse.json(
          { message: "Blog Not Found!" },
          { status: 404 }
        );

      const findComment = (comments, targetId) => {
        for (const comment of comments) {
          if (comment._id.toString() === targetId) return comment;
          if (comment.replies && comment.replies.length > 0) {
            const reply = findComment(comment.replies, targetId);
            if (reply) return reply;
          }
        }
        return null;
      };

      const targetComment = findComment(blog.comments, commentId || replyId);
      if (!targetComment)
        return NextResponse.json(
          { message: "Target comment or reply not found" },
          { status: 404 }
        );

      targetComment.replies.push({ userID, comment: reply.trim() });
      await blog.save();

      const newBlog = await Blogs.findOne({ _id: id, isDeleted: false })
        .populate([
          { path: "createdBy", select: "firstName lastName savedBlogs" },
          { path: "comments.userID", select: "firstName lastName" },
          { path: "comments.replies.userID", select: "firstName lastName" },
        ])
        .exec();

      return NextResponse.json(
        { message: "Reply added successfully!", newBlog },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error Updating Blog: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Delete Blog
export async function DELETE(req, { params }) {
  try {
    const { blog } = params;

    // Validate Blog ID
    if (!blog || !mongoose.Types.ObjectId.isValid(blog)) {
      return NextResponse.json(
        { message: "Invalid or missing Blog ID" },
        { status: 400 }
      );
    }

    // Get delete type from query params
    const { searchParams } = new URL(req.url);
    const deleteType = searchParams.get("deleteType");

    if (!deleteType || (deleteType !== "SOFT" && deleteType !== "HARD")) {
      return NextResponse.json(
        { message: "Invalid or missing delete type" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    let deletedBlog;

    // Perform soft delete
    if (deleteType === "SOFT") {
      deletedBlog = await Blogs.findOneAndUpdate(
        { _id: blog, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );
    }
    // Perform hard delete
    else if (deleteType === "HARD") {
      deletedBlog = await Blogs.findByIdAndDelete(blog);
    }

    // Handle blog not found
    if (!deletedBlog) {
      return NextResponse.json(
        { message: "Blog not found or already deleted" },
        { status: 404 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        message: `Blog ${
          deleteType === "SOFT" ? "" : "Permanently"
        } deleted successfully`,
        deletedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Deleting Blog: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
