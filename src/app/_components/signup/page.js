"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";

// Validation schema
const validationSchema = yup.object({
  action: yup.string().trim(),
  firstName: yup.string().trim().required("First Name is required!"),
  lastName: yup.string().trim().required("Last Name is required!"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required!"),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Phone is required!"),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required!"),
  C_Password: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = ({ setShowSignUp }) => {
  const formik = useFormik({
    initialValues: {
      action: "signup",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      C_Password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // trimming any extra spaces
      const trimmedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.trim()])
      );
      try {
        const response = await axios.post("/api/users", trimmedValues);
        console.log("Success: ", response.data);
        const token = response.data.token;
        //save jwt in cookie
        Cookies.set("token", token, {
          expires: 7,
          path: "",
          sameSite: "Strict",
          secure: true,
        });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            savedBlogs: response.data.savedBlogs,
            likedBlogs: response.data.likedBlogs,
          })
        );
        resetForm();
      } catch (error) {
        console.error("Error catching form: ", error);
      }
    },
  });

  return (
    <>
      <div className="my-12 border-b text-center">
        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
          Or Create New Account
        </div>
      </div>

      <form className="mx-auto max-w-xs" onSubmit={formik.handleSubmit}>
        {/* First Name */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        {formik.errors.firstName && (
          <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        )}

        {/* Last Name */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        {formik.errors.lastName && (
          <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
        )}

        {/* Email */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        {/* Phone Number */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.errors.phone && (
          <div className="text-red-500 text-sm">{formik.errors.phone}</div>
        )}

        {/* Password */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}

        {/* Confirm Password */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Confirm Password"
          name="C_Password"
          value={formik.values.C_Password}
          onChange={formik.handleChange}
        />
        {formik.errors.C_Password && (
          <div className="text-red-500 text-sm">{formik.errors.C_Password}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span className="ml-3">Sign Up</span>
        </button>

        {/* Switch to Login Button */}
        <button
          type="button"
          className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          onClick={() => setShowSignUp(false)}
        >
          <span className="ml-3">Already Have an Account?</span>
        </button>

        <p className="mt-6 text-xs text-gray-600 text-center">
          I agree to abide{" "}
          <a href="#" className="border-b border-gray-500 border-dotted">
            Terms of Service
          </a>{" "}
          and its{" "}
          <a href="#" className="border-b border-gray-500 border-dotted">
            Privacy Policy
          </a>
        </p>
      </form>
    </>
  );
};

export default SignUp;
