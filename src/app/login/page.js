"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SignUp from "../_components/signup";
import LogIn from "../_components/login";
import Cookies from "js-cookie";

const LogInPage = () => {
  const { data: session, status } = useSession();
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("User is authenticated:", session);
      const token = session.accessToken;
      console.log("User : ", token);

      // Check if token is valid and not expired
      if (token) {
        Cookies.set("token", token, {
          expires: 7,
          path: "",
          sameSite: "Strict",
          secure: true,
        });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            savedBlogs: session.userData.savedBlogs || [],
            likedBlogs: session.userData.likedBlogs || [],
          }),
        );
      }

      // signOut(); // Sign out the user if already authenticated
      window.location.href = "/";
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center">
            <Image
              src="/Assets/hari_krishna.png"
              alt="Logo"
              width={128}
              height={128}
              className="w-32"
            />
          </div>

          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-semibold text-center">
              {session ? `Welcome, ${session.user?.name}!` : "Sign Up / Log In"}
            </h1>

            <div className="w-full flex-1 mt-8">
              {/* Google Sign-In / Sign-Out */}
              <div className="flex flex-col items-center">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="w-full max-w-xs font-semibold shadow-sm rounded-lg py-3 bg-red-500 text-white transition-all duration-300 ease-in-out focus:outline-none hover:bg-red-600"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="w-full max-w-xs font-semibold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow"
                  >
                    <div className="bg-white p-2 rounded-full">
                      <Image
                        src="/Assets/hari_krishna.png"
                        className="rounded-full"
                        alt="Google Logo"
                        width={70}
                        height={70}
                      />
                    </div>
                    <span className="ml-4 font-medium">
                      Sign In with Google
                    </span>
                  </button>
                )}
              </div>

              {/* Email/Password Login or Signup */}
              {!session &&
                (showSignUp ? (
                  <SignUp setShowSignUp={setShowSignUp} />
                ) : (
                  <LogIn setShowSignUp={setShowSignUp} />
                ))}
            </div>
          </div>
        </div>

        {/* Right Side Image Panel */}
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/Assets/hari_krishna.png)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
