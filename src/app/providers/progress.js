"use client";

import NProgress from "nprogress";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "nprogress/nprogress.css"; // Import styles

export default function ProgressBar() {
  const pathname = usePathname(); // Detect route changes

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 500); // Ensure visibility

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]); // Triggers on path change

  return null;
}
