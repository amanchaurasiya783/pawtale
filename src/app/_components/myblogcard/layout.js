import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";

const MyBlogCard = ({ blogId, imgPath, title, desc }) => {
  const handleDelete = async () => {
    try {
      const deleteConfirm = window.confirm(
        "Are you sure you want to delete this blog?"
      );
      if (!deleteConfirm) return;
      const response = await fetch(`/api/blogs/${blogId}?deleteType=SOFT`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error Deleting Blog");
      }
      const data = await response.json();
      alert("Blog Deleted Successfully");
    } catch (error) {
      console.log("Error Deleting Blog: ", error);
      alert("Error Deleting Blog: ", error.message);
    }
  };
  return (
    <div className="rounded-xl flex flex-row justify-between gap-2 shadow-lg sm:flex-col sm:justify-center group">
      <div className="relative w-48 h-28 aspect-[3/2] max-h-44 sm:w-full sm:h-auto rounded-lg overflow-hidden">
        <div className="absolute top-2 left-2 z-10 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <TrashIcon
            className="w-5 h-5 text-red-500 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <Link href={`/blogs/${blogId}/edit-blog`}>
            <PencilIcon className="w-5 h-5 text-blue-500" />
          </Link>
        </div>
        <img
          src={imgPath || "/Assets/hari_krishna.png"}
          className="w-full h-full object-fit"
        />
      </div>
      <div className="block p-2 sm:text-center">
        <div className="font-semibold mb-1">
          {title || "* Let's Care Together *"}
        </div>
        <div className="font-medium">{desc || "* Let's Care Together *"}</div>
      </div>
    </div>
  );
};

export default MyBlogCard;
