import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/app/lib/mongodb";
import Users from "@/app/lib/userModel";
import { generateToken } from "@/app/api/users/route";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ profile }) {
      await connectToDatabase();
      console.log("Profile:", profile);

      let existingUser = await Users.findOne({ email: profile?.email });

      if (!existingUser && profile?.email) {
        existingUser = await Users.create({
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          phone: null,
          password: null,
        });
      }

      return true;
    },
    async jwt({ token }) {
      await connectToDatabase();
      const user = await Users.findOne({ email: token.email });
      if (user) {
        const newToken = generateToken(user);
        token.accessToken = newToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.userData = {
          savedBlogs: token.savedBlogs || [],
          likedBlogs: token.likedBlogs || [],
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
