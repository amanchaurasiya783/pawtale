import { CurrencyRupeeIcon } from "@heroicons/react/outline";

const ReelsCard = ({ item, price, MRP, offer }) => {
    return (
        <div className="rounded-xl w-56 pb-2 mx-auto text-center flex flex-col justify-between gap-2 sm:flex-col sm:justify-center border shadow-lg p-1">
            <div className="relative w-full aspect-[9/16] h-96 rounded-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${item.id.videoId}?modestbranding=1&showinfo=0&rel=0&&loop=1`}
                    allow="accelerometer; autoplay; picture-in-picture"
                ></iframe>
            </div>
            <div className="block px-2 h-28 sm:text-center">
                <div className="font-semibold mb-1">
                    {item.snippet.title?.replace(/#\S+/g, "").trim() || "PetCare"}
                </div>
                <div className="flex justify-center gap-1 text-sm">
                    <p className="font-semibold flex items-center">
                        <CurrencyRupeeIcon className="w-5 aspect-square mx-auto inline-block" />
                        {price || "Rate"}
                    </p>
                    <p className="text-gray-500 line-through font-medium">
                        {MRP || "MRP"}
                    </p>
                    <p className="text-green-500 font-medium">{offer || "O"}% Off Now</p>
                </div>
            </div>
        </div>
    );
};

export default ReelsCard;
