import connectToDatabase from "@/app/lib/mongodb";
import Users from "@/app/lib/userModel";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/utils/authenticate";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const token = req.cookies.get("token")?.value;
    const userData = await verifyToken(token);
    const userid = userData?.id || null;
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required!" },
        { status: 400 }
      );
    }
    if (!userid || userid !== userId) {
      throw new Error("Unauthorized Access!");
    }
    const { searchParams } = new URL(req.url);
    const populateFields = searchParams?.get("populate") || "";
    const populateOptions = populateFields
      ? populateFields.split(",").map((field) => ({ path: field }))
      : [];
    const user = await Users.findById(userId).populate(populateOptions);

    return user
      ? NextResponse.json({ message: "Success", user }, { status: 200 })
      : NextResponse.json({ message: "User Not Found" }, { status: 404 });
  } catch (error) {
    console.log("error : ", error);
    const isUnauthorized = error?.message === "Unauthorized Access!";
    return NextResponse.json(
      {
        message: error?.message || "Internal Server Error!",
      },
      {
        status: isUnauthorized ? 401 : 500,
      }
    );
  }
}

export async function PATCH(req, { params }) {
  const userId = req.headers.get("x-user-id");
  const body = await req.json();
  const { type, blogId, productId, product } = body;
  if (!body) {
    return NextResponse.json({ message: "Nothing to Update" }, { status: 204 });
  }

  if (
    !type ||
    ![
      "saveBlog",
      "unSaveBlog",
      "likeBlog",
      "dislikeBlog",
      "addToCart",
      "removeFromCart",
      "addToWishlist",
      "removeFromWishlist",
    ].includes(type)
  ) {
    return NextResponse.json({ message: "Invalid type." }, { status: 400 });
  }

  try {
    await connectToDatabase();
    let update;
    switch (type) {
      case "saveBlog":
        update = {
          $addToSet: { savedBlogs: blogId },
        };
        break;
      case "unSaveBlog":
        update = {
          $pull: { savedBlogs: blogId },
        };
        break;
      case "likeBlog":
        update = {
          $addToSet: { likedBlogs: blogId },
        };
        break;
      case "dislikeBlog":
        update = {
          $pull: { likedBlogs: blogId },
        };
        break;
      case "addToCart":
        update = {
          $addToSet: { cart: product },
        };
        break;
      case "removeFromCart":
        update = {
          $pull: { cart: { _id: productId } },
        };
        break;
      case "addToWishlist":
        update = {
          $addToSet: { wishlist: productId },
        };
        break;
      case "removeFromWishlist":
        update = {
          $pull: { wishlist: productId },
        };
        break;
      default:
        break;
    }
    if (!update)
      return NextResponse.json(
        { message: "Nothing to Update!" },
        { status: 204 }
      );
    const user = await Users.findByIdAndUpdate(userId, update, {
      new: true,
    });
    if (!user) {
      return NextResponse.json({ message: "User Not Found!" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "Blog saved successfully!",
        user,
      },
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

export async function PUT(req, { params }) {
  const userId = req.headers.get("x-user-id");
  const formData = await req.formData();

  if (!formData) {
    return NextResponse.json({ message: "Nothing to Update" }, { status: 204 });
  }
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  console.log(
    "firstName, lastName, email, phone",
    firstName,
    lastName,
    email,
    phone
  );

  if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
    return NextResponse.json(
      { message: "Missing Required Fields!" },
      { status: 400 }
    );
  }

  await connectToDatabase();
  try {
    const user = await Users.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phone },
      { new: true }
    );
    if (!user) throw new Error("User Not Found!");

    return NextResponse.json(
      {
        message: "User Updated Successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Updating User: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error: ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
