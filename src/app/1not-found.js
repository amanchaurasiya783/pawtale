// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center px-6 md:px-12">
        {/* Error Image */}
        <img
          src="/images/404-illustration.svg"
          alt="404 Illustration"
          className="w-72 md:w-96 mx-auto mb-8"
        />

        {/* Error Message */}
        <h1 className="text-5xl font-bold text-blue-700 mb-4">Oops!</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          We can’t seem to find the page you’re looking for.
        </p>

        <p className="text-gray-500 mb-8">
          Error code: <span className="font-semibold">404</span>
        </p>

        {/* Back to Home Button */}
        <Link href="/">
          <a className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200">
            Back to Home
          </a>
        </Link>
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-blue-100" />
    </div>
  );
}
