export const dynamic = "force-dynamic";

import BlogCard from "../../_components/blogcard.tsx";
import Button from "@/app/_components/button.tsx";
import Link from "next/link";

const PetCareBlog = async () => {
  const fetchRandomBlogs = async () => {
    try {
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
      console.log("Error Fetching Products:", error);
      return null;
    }
  };

  const blogs = await fetchRandomBlogs();

  return (
    <section className="bg-[#fafcff] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-background">
            PET BLOGS
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-background">
            Care With Us
          </h2>
        </div>

        {/* Blogs */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {blogs?.map((blog) => (
            <Link key={blog?._id} href={`/blogs/${blog?._id}`}>
              <BlogCard
                imgPath={blog?.images?.[0]}
                title={blog?.title}
                desc={blog?.content1?.slice(0, 100)}
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button redirectPath="/blogs" value="View All" />
        </div>
      </div>
    </section>
  );
};

export default PetCareBlog;
