import connectToDatabase from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Products from "@/app/lib/productModel";

//add new product
export async function POST(req, { params }) {
  try {
    const body = await req.json();
    const createdBy = await req.headers.get("x-user-id");

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
    )
      return NextResponse.json(
        { message: "Details Missing!" },
        { status: 400 }
      );

    await connectToDatabase();

    //adding product to db
    const product = await Products.create({
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
    });
    return NextResponse.json(
      { message: "Product Added Successfully!", product },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Fetching Products: ", error);
    return NextResponse.json(
      { message: "Internal Server Error: ", error: error.message },
      { status: 500 }
    );
  }
}

// Fetching All Products
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const products = await Products.find({});
    if (!products || products.length === 0)
      return NextResponse.json(
        { message: "No Product Found!" },
        { status: 204 }
      );
    return NextResponse.json(
      { results: products.length, products },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Fetching Products: ", error);
    return NextResponse.json(
      { message: "Internal Server Error: ", error: error.message },
      { status: 500 }
    );
  }
}
