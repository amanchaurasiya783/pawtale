import Button from "@/app/_common/button/page";

export default function CommentForm() {
  return (
    <div className="mx-auto p-4 w-full">
      <div className="text-2xl font-semibold text-background my-3">
        Leave A Comment
      </div>
      <p className="text-sm font-medium text-gray-600">
        Your email address will not be published.
      </p>
      <p className="text-sm text-gray-600">
        Required fields are marked <span className="text-red-500">*</span>
      </p>

      <form className="mt-4 space-y-4 font-medium">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Name *
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name *"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email *
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email *"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="website" className="sr-only">
              Website
            </label>
            <input
              type="text"
              id="website"
              placeholder="Website"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="comment" className="sr-only">
              Comment *
            </label>
            <textarea
              id="comment"
              placeholder="Comment *"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="save-info"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="save-info" className="ml-2 text-gray-700 text-sm">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
        <div className="mx-3">
          <Button value={"Post Comment"} />
        </div>
      </form>
    </div>
  );
}
