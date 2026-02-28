export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-100 to-blue-200">
      <div className="relative flex space-x-4">
        {/* Animated paw prints */}
        <div className="w-6 h-6 bg-pink-500 rounded-full animate-bounce"></div>
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-6 h-6 bg-green-500 rounded-full animate-bounce"></div>
      </div>
      <p className="mt-6 text-xl font-semibold text-gray-700">
        Fetching some love for you...
      </p>
    </div>
  );
}
