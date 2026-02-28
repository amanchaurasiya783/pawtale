import connectToDatabase from "@/app/lib/mongodb";
import Blogs from "@/app/lib/blogModel";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

//Add Blog
export async function POST(req) {
  const body = await req.json();
  const { title, subtitle, content1, content2, category, tags, images } = body;

  const userId = await req.headers.get("x-user-id");

  if (!title || !subtitle || !content1 || !content2 || !userId) {
    return NextResponse.json({ message: "Details Missing!" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const blog = await Blogs.create({
      title,
      subtitle,
      content1,
      content2,
      category,
      tags,
      images,
      createdBy: userId,
    });

    return NextResponse.json(
      { message: "Blog Created Successfully!", blog },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Creating Blog Failed: ${error.message}` },
      { status: 500 }
    );
  }
}

// Fetch All Blogs
export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const limit = searchParams.limit ? parseInt(searchParams.limit) : 10; // default limit 10 for pagination
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const skipPage = page ? parseInt(page) - 1 : 0;
    const createdBy = searchParams.createdBy || null; // for fetching blogs by user
    const sortBy = searchParams.sortBy || "createdAt"; // default sort by createdAt

    // for custom query for selected ids
    let blogs;
    if (createdBy) {
      const blogs = await Blogs.find({
        createdBy,
        isDeleted: false,
      })
        .skip(skipPage)
        .sort(sortBy)
        .limit(limit)
        .exec();
      if (!blogs.length) {
        return NextResponse.json(
          { message: "No blogs found for the given User ID." },
          { status: 404 }
        );
      }
      return NextResponse.json({ blogs }, { status: 200 });
    } else {
      // fetching all blogs at once
      blogs = await Blogs.find(
        { isDeleted: false },
        { _id: 1, title: 1, content1: 1, images: 1, views: 1, likes: 1 }
      )
        .skip(skipPage)
        .sort(sortBy)
        .limit(limit)
        .exec();
      return NextResponse.json(
        {
          message: "Query Success",
          results: blogs.length,
          blogs,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Fetching Blogs Error: ${error.message}` },
      { status: 500 }
    );
  }
}
