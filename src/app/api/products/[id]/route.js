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
        { message: "Invalid or Missing Product ID!", success: false },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const productDetails = await Products.findById(id);

    // Check if Product exists
    if (!productDetails) {
      return NextResponse.json(
        { message: "Product Not Found!", success: false },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { productDetails, message: "Product Found!", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error Fetching Product: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
        success: false,
      },
      { status: 500 },
    );
  }
}

// Update Product Details by ID
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    if (!body)
      return NextResponse.json(
        { message: "Nothing to Update", success: false },
        { status: 204 },
      );

    const { id } = params;

    // Validate ID
    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Invalid or Missing Product ID!", success: false },
        { status: 400 },
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
        { message: "Details Missing!", success: false },
        { status: 400 },
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
        { message: "Product Not Found!", success: false },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        updatedProductDetails,
        success: true,
        message: "Product Updated Successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error Fetching Product: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
        success: false,
      },
      { status: 500 },
    );
  }
}

// PATCH /api/products/[id]
export async function PATCH(req, { params }) {
  const { id } = params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid Product ID!", success: false },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { message: "Nothing to update.", success: false },
        { status: 400 },
      );
    }
    if (body.name && !body.slug?.trim()) {
      body.slug = body.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }

    const { type } = body;

    // General Product Update
    if (!type) {
      const product = await Products.findByIdAndUpdate(
        id,
        { $set: body },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!product) {
        return NextResponse.json(
          { message: "Product not found.", success: false },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          message: "Product updated successfully.",
          success: true,
          product,
        },
        { status: 200 },
      );
    }

    // Rating
    if (type === "rating") {
      const { userID, rating } = body;

      if (!userID || rating == null || rating < 0 || rating > 5) {
        return NextResponse.json(
          { message: "Invalid rating data.", success: false },
          { status: 400 },
        );
      }

      const product = await Products.findById(id);

      if (!product) {
        return NextResponse.json(
          { message: "Product not found.", success: false },
          { status: 404 },
        );
      }

      product.ratings = product.ratings.filter(
        (r) => r.userID.toString() !== userID,
      );

      product.ratings.push({ userID, rating });

      await product.save();

      return NextResponse.json(
        {
          message: "Rating updated successfully.",
          success: true,
          product,
        },
        { status: 200 },
      );
    }

    // Comment
    if (type === "comment") {
      const { userID, comment } = body;

      if (!userID || !comment?.trim()) {
        return NextResponse.json(
          { message: "Invalid comment.", success: false },
          { status: 400 },
        );
      }

      const product = await Products.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              userID,
              comment: comment.trim(),
              replies: [],
            },
          },
        },
        { new: true },
      );

      if (!product) {
        return NextResponse.json(
          { message: "Product not found.", success: false },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          message: "Comment added successfully.",
          success: true,
          product,
        },
        { status: 200 },
      );
    }

    // Reply
    if (type === "reply") {
      const { userID, text, commentId, replyId } = body;

      if (!userID || !text?.trim() || (!commentId && !replyId)) {
        return NextResponse.json(
          { message: "Invalid reply data.", success: false },
          { status: 400 },
        );
      }

      const product = await Products.findById(id);

      if (!product) {
        return NextResponse.json(
          { message: "Product not found.", success: false },
          { status: 404 },
        );
      }

      const findComment = (comments, targetId) => {
        for (const c of comments) {
          if (c._id.toString() === targetId) return c;

          const found = findComment(c.replies || [], targetId);

          if (found) return found;
        }

        return null;
      };

      const target = findComment(product.comments, commentId || replyId);

      if (!target) {
        return NextResponse.json(
          { message: "Comment not found.", success: false },
          { status: 404 },
        );
      }

      target.replies.push({
        userID,
        comment: text.trim(),
      });

      await product.save();

      return NextResponse.json(
        {
          message: "Reply added successfully.",
          success: true,
          product,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "Invalid update type.", success: false },
      { status: 400 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

//Delete Product
export async function DELETE(req, { params }) {
  const { id, type } = params;

  if (!id || !type || !["soft", "hard"].includes(type)) {
    return NextResponse.json(
      { message: "type not found!", success: false },
      { status: 204 },
    );
  }

  // For SOFT Delete
  if (type === "soft") {
    const product = await Products.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!product)
      return NextResponse.json(
        { message: "Product Not Found!", success: false },
        { status: 404 },
      );
    return NextResponse.json(
      { message: "Product Deleted!", product, success: true },
      { status: 200 },
    );
  }
  // For HADR Delete
  if (type === "hard") {
    const product = await Products.findByIdAndDelete(id);
    if (!product)
      return NextResponse.json(
        { message: "Product Not Found or Already Deleted!", success: false },
        { status: 404 },
      );
    return NextResponse.json(
      { message: "Product Deleted!", product, success: true },
      { status: 200 },
    );
  }
}
