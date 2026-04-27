import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();


const secret = process.env.JWT_SECRET;

//JWT generate
export function generateToken(user) {
    if (!user) return;
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
            username: user.firstName + " " + user.lastName,
        },
        secret,
        { expiresIn: "7d" },
    );
}