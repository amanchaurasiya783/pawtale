import connectToDatabase from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Products from "@/app/lib/productModel";

// add new product
export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const createdBy = req.headers.get("x-user-id");

    if (!createdBy) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    const product = await Products.create({
      ...body,
      createdBy,
    });

    return NextResponse.json(
      {
        message:
          product.status === "draft"
            ? "Draft saved successfully!"
            : "Product added successfully!",
        product,
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error Adding Product:", error);

    // Duplicate slug / SKU
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];

      return NextResponse.json(
        {
          message: `${field} already exists.`,
          success: false,
        },
        { status: 409 },
      );
    }

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);

      return NextResponse.json(
        {
          message: "Validation failed.",
          success: false,
          errors,
        },
        { status: 400 },
      );
    }

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

// Fetch Products with Pagination
export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "latest";

    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
      // status: "published",
    };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = {};

    switch (sort) {
      case "price-asc":
        sortOption = { price: 1 };
        break;

      case "price-desc":
        sortOption = { price: -1 };
        break;

      case "name-asc":
        sortOption = { name: 1 };
        break;

      case "name-desc":
        sortOption = { name: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const totalProducts = await Products.countDocuments(filter);

    const products = await Products.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts,
          limit,
        },
        message: "Products Found !",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

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

// /api/products ? page = 1 & limit=12
//   / api / products ? page = 2 & limit=12
//   / api / products ? page = 3 & limit=12 & sort=price - asc
//   / api / products ? page = 1 & limit=12 & sort=price - desc
//   / api / products ? page = 1 & limit=12 & search=dog
// /api/products?page=2&limit=12&search=cat&sort=name-asc
