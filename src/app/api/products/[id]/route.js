import connectToDatabase from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Products from "@/app/lib/productModel";
import mongoose from "mongoose";

// Find Product by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Invalid or Missing Product ID!" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const productDetails = await Products.findById(id);

    // Check if Product exists
    if (!productDetails) {
      return NextResponse.json(
        { message: "Product Not Found!" },
        { status: 404 }
      );
    }
    return NextResponse.json({ productDetails }, { status: 200 });
  } catch (error) {
    console.error("Error Fetching Product: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Update Product Details by ID
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    if (!body)
      return NextResponse.json(
        { message: "Nothing to Update" },
        { status: 204 }
      );

    const { id } = params;

    // Validate ID
    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Invalid or Missing Product ID!" },
        { status: 400 }
      );
    }
    const {
      name,
      description,
      skuID,
      price,
      mrp,
      discount,
      images,
      category,
      quantity,
      createdBy,
    } = body;

    // checking NULL for required values
    if (
      !name ||
      !description ||
      !skuID ||
      !price ||
      !mrp ||
      !discount ||
      !category ||
      !quantity ||
      !createdBy
    ) {
      return NextResponse.json(
        { message: "Details Missing!" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Fetching Product by ID
    const updatedProductDetails = await Products.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    // Check if Product exists
    if (!updatedProductDetails) {
      return NextResponse.json(
        { message: "Product Not Found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ updatedProductDetails }, { status: 200 });
  } catch (error) {
    console.error("Error Fetching Product: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Update Product's Like, Comment
export async function PATCH(req, { params }) {
  const { id } = params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid or Missing Product ID!" },
      { status: 400 }
    );
  }

  const body = await req.json();
  if (!body)
    return NextResponse.json({ message: "Nothing to Update" }, { status: 204 });

  const { type, userID, rating, comment, text, commentId, replyId } = body;

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

      const update = {
        $pull: { ratings: { userID } },
        $push: { ratings: { userID, rating } },
      };
      const product = await Products.findByIdAndUpdate(id, update, {
        new: true,
      });

      if (!product)
        return NextResponse.json(
          { message: "Product Not Found!" },
          { status: 404 }
        );

      return NextResponse.json(
        { message: "Rating updated successfully!", product },
        { status: 200 }
      );
    }

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
      const product = await Products.findByIdAndUpdate(id, update, {
        new: true,
      });

      if (!product)
        return NextResponse.json(
          { message: "Product Not Found!" },
          { status: 404 }
        );

      return NextResponse.json(
        { message: "Comment added successfully!", product },
        { status: 200 }
      );
    }

    if (type === "reply") {
      if (!text || !text.trim() || !userID || (!commentId && !replyId)) {
        return NextResponse.json(
          { message: "Invalid reply data" },
          { status: 400 }
        );
      }

      const product = await Products.findById(id);
      if (!product)
        return NextResponse.json(
          { message: "Product Not Found!" },
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

      const targetComment = findComment(product.comments, commentId || replyId);
      if (!targetComment)
        return NextResponse.json(
          { message: "Target comment or reply not found" },
          { status: 404 }
        );

      targetComment.replies.push({ userID, comment: text.trim() });
      await product.save();

      return NextResponse.json(
        { message: "Reply added successfully!", product },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error Updating Product: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

//Delete Product
export async function DELETE(req, { params }) {
  const { id, type } = params;

  if (!id || !type || !["soft", "hard"].includes(type)) {
    return NextResponse.json({ message: "type not found!" }, { status: 204 });
  }

  // For SOFT Delete
  if (type === "soft") {
    const product = await Products.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!product)
      return NextResponse.json(
        { message: "Product Not Found!" },
        { status: 404 }
      );
    return NextResponse.json(
      { message: "Product Deleted!", product },
      { status: 200 }
    );
  }
  // For HADR Delete
  if (type === "hard") {
    const product = await Products.findByIdAndDelete(id);
    if (!product)
      return NextResponse.json(
        { message: "Product Not Found or Already Deleted!" },
        { status: 404 }
      );
    return NextResponse.json(
      { message: "Product Deleted!", product },
      { status: 200 }
    );
  }
}
