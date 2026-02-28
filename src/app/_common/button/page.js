"use client";
const Button = ({ value, redirectPath }) => {
  return (
    <button
      onClick={
        redirectPath ? () => window.location.replace(redirectPath) : undefined
      }
      className="inline-block bg-background text-foreground text-md font-medium transition-all cursor-pointer px-7 py-2 rounded-3xl hover:opacity-80 focus:opacity-85"
    >
      {value || "Button"}
    </button>
  );
};

export default Button;
