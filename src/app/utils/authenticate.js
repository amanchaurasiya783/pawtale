import { jwtVerify } from "jose";

// const KEY = process.env.NEXTAUTH_SECRET;
const KEY = "BUMBLEBEE26795303SERVERHOTRELOAD79673ASGHDL";

const SECRET_KEY = new TextEncoder().encode(KEY);

//function to verify token
export async function verifyToken(token) {
  try {
    if (!token) return false;
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("Token verification failed: ", error.message);
    return false;
  }
}
