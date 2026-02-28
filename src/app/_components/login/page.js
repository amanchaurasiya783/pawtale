"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";

//validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email ID!")
    .required("Email is required!"),
  password: yup
    .string()
    .trim()
    .min(8, "Password length should be atleast for 8 characters!")
    .required("Password is required!"),
});

const LogIn = ({ setShowSignUp }) => {
  const formik = useFormik({
    initialValues: {
      action: "login",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const trimmedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.trim()])
      );
      try {
        const response = await axios.post("/api/users", trimmedValues);
        //save JWT in Cookie
        Cookies.set("token", response.data.token, {
          expires: 7,
          secure: true,
          path: "/",
          sameSite: "Strict",
        });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            savedBlogs: response.data.savedBlogs,
            likedBlogs: response.data.likedBlogs,
          })
        );
        resetForm();
        window.location.href = "/";
      } catch (error) {
        console.error("Error catching form: ", error);
      }
    },
  });

  return (
    <>
      <div className="my-12 border-b text-center">
        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
          OR LogIn Now
        </div>
      </div>

      <form className="mx-auto max-w-xs" onSubmit={formik.handleSubmit}>
        {/* Email */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />{" "}
        {formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
        {/* Password */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
        <button
          className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          type="submit"
        >
          <span className="ml-3">LogIn Now</span>
        </button>
        <button
          className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          onClick={() => setShowSignUp(true)}
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
          <span className="ml-3">Create New Account?</span>
        </button>
      </form>
    </>
  );
};

export default LogIn;
