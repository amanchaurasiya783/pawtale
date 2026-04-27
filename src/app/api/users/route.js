import connectToDatabase from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/app/lib/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";

// Fetch All Users
export async function GET(req, { params }) {}

//Add New user OR LogIn User
export async function POST(req) {
  try {
    const body = await req.json();
    const { action, firstName, lastName, email, phone, password } = body;

    //database connection
    await connectToDatabase();

    if (!action || !["signup", "login", "logout"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid or missing action field" },
        { status: 400 },
      );
    }

    // for signup
    if (action === "signup") {
      const existingUser = await Users.findOne({ email });

      //check if user already exist
      if (existingUser) {
        return NextResponse.json(
          { error: "User already exist with this email" },
          { status: 400 },
        );
      }

      //hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      // creating New User
      const newUser = await Users.create({
        firstName,
        lastName,
        email,
        phone: parseInt(phone),
        password: hashedPassword,
        role: "user",
      });

      const token = generateToken(newUser);

      return NextResponse.json(
        { message: "User Created Successfully", user: newUser, token },
        { status: 201 },
      );
    }
    // for login
    else if (action === "login") {
      const user = await Users.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { message: "User doesn't exist" },
          { status: 401 },
        );
      }

      //compare password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return NextResponse.json(
          { message: "Invalid Email or Incorrect Password!" },
          { status: 401 },
        );
      }

      //generate jwt token
      const token = generateToken(user);

      return NextResponse.json(
        {
          message: "Login Success",
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            username: user.firstName + " " + user.lastName,
          },
          token,
        },
        { status: 200 },
      );
    } else if (action === "logout") {
      console.log("Logged Out Successfully");
      const response = NextResponse.json({
        message: "Logged Out Successfully!",
      });
      response.cookies.set("token", "", { maxAge: 0 });
      return response;
    }
  } catch (error) {
    console.error("Error while handling Auth: ", error);
    return NextResponse.json(
      { message: "Failed in User Auth: ", error },
      { status: 500 },
    );
  }
}

//Update User
// export async function PUT(req, { params }) {
//   const body = await req.json();
// }
