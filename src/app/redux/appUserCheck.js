"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./userSlice";
export const AppUserCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    console.log("HELLOWWW");
  }, []);
  return <div>Hello</div>;
};
