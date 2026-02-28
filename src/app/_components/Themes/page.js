"use client";

import { useState, useEffect, createContext, useContext } from "react";
import {} from "@heroicons/react/outline";

const themes = {
  dark: {
    background: "bg-[#0D1117]",
    text: "text-[#E6EDF3]",
    bubbleUser: "bg-[#161B22]",
    bubbleBot: "bg-[#21262D]",
  },
  light: {
    background: "bg-[#F8FAFC]",
    text: "text-[#334155]",
    bubbleUser: "bg-[#E0F2FE]",
    bubbleBot: "bg-[#DCFCE7]",
  },
  corporate: {
    background: "bg-[#FFFFFF]",
    text: "text-[#1E293B]",
    bubbleUser: "bg-[#E2E8F0]",
    bubbleBot: "bg-[#CBD5E1]",
  },
  futuristic: {
    background: "bg-gradient-to-r from-[#0F172A] to-[#1E293B]",
    text: "text-[#F8FAFC]",
    bubbleUser: "bg-[#1E293B]",
    bubbleBot: "bg-[#334155]",
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.className = `${themes[theme].background} ${themes[theme].text}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme} animateTheme`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-2">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-400 bg-white text-black"
      >
        {Object.keys(themes).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
