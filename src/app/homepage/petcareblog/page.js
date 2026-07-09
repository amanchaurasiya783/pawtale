export const dynamic = "force-dynamic";
import BlogCard from "../../_components/blogcard.tsx";
// import Button from "../../_common/button/page";
import Button from "@/app/_components/button.tsx";
import Link from "next/link";

const PetCareBlog = async () => {
  const fetchRandomBlogs = async () => {
    try {
      // fetch random products from API

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/blogs?limit=5`, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("PetCare Blog API failed");
      }
      const blogs = await response.json();

      return blogs.blogs;
    } catch (error) {
      console.log("Error Fetching Products: ", error);
      return null;
    }
  };

  const blogs = await fetchRandomBlogs();

  return (
    <div className="mx-auto my-5 p-6">
      <p className="text-md text-center font-medium text-background">
        PET BLOGS
      </p>
      <div className="text-3xl font-semibold text-center mt-3 mb-8 text-background">
        Care With Us
      </div>
      <div className="my-5 mx-2 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-3">
        {blogs?.map((blog) => (
          <Link key={blog?._id} href={`/blogs/${blog?._id}`} passHref>
            <BlogCard
              key={blog?._id}
              imgPath={blog?.images?.[0]}
              title={blog?.title}
              desc={blog?.content1?.slice(0, 100)}
            />
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Button redirectPath={"/blogs"} value={"View All"} />
      </div>
    </div>
  );
};

export default PetCareBlog;
