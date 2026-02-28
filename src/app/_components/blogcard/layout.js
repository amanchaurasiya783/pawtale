const BlogCard = ({ id, imgPath, title, desc }) => {
  return (
    <div className="rounded-xl h-auto md:h-80 min-h-5 flex flex-row justify-between gap-2 shadow-lg sm:flex-col sm:justify-center">
      <div className="relative w-48 h-28 aspect-[3/2] flex-shrink-0 md:flex-shrink max-h-44 sm:w-full sm:h-auto rounded-lg overflow-hidden">
        <img
          src={imgPath || "/Assets/hari_krishna.png"}
          className="w-full h-full object-fit"
        />
      </div>
      <div className="block p-2 sm:text-center">
        <div className="font-semibold mb-1 text-background overflow-hidden truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl hover:opacity-80">
          {title || "Interesting Facts To Knwo Before Caring Pet"}
        </div>
        <div className="font-medium text-background opacity-90">
          {desc || "Interesting Facts To Knwo Before Caring Pet"}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
