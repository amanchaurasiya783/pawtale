// import Button from "../../_common/button/page";
import Button from "@/app/_components/button.tsx";
import Image from "next/image";
const cat2 = "/Assets/cat2.png";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] to-[#dfeaff] text-background">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-40"></div>

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-100 blur-3xl opacity-50"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-10">
        <div className="text-background text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-none">
            PREMIUM CAT FOOD
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-background/80 max-w-3xl mx-auto">
            Healthy meals made with natural ingredients.
          </p>
        </div>
        <div className="grid lg:grid-cols-[1fr_1.2fr_1fr] items-center justify-items-center gap-2">
          <div className="w-2/3 md:w-full text-center md:text-left  space-y-3">
            <p className="text-md font-medium">BEST QUALITY</p>
            <p className="text-4xl font-semibold">
              Limited Time !!
              <br />
              25% OFF – Order Today!
            </p>
          </div>
          <div className="w-2/3 md:w-full text-center md:text-left lg:order-3 space-y-3">
            <div className="flex items-center gap-3">
              ✔<span>100% Natural Ingredients</span>
            </div>

            <div className="flex items-center gap-3">
              ✔<span>Vet Recommended Formula</span>
            </div>

            <div className="flex items-center gap-3 pb-3">
              ✔<span>Free Delivery above ₹999</span>
            </div>
            <Button value={"BUY NOW"} redirectPath={"/store"} />
          </div>
          <div className="relative flex justify-center">
            {/* <div className="w-2/3 md:col-span-2 lg:col-span-1 md:w-full lg:order-2"> */}
            <div className="absolute bottom-8 h-12 w-60 rounded-full bg-black/10 blur-2xl" />
            <Image
              src={cat2}
              alt="Cat Image"
              width={1000}
              height={800}
              className="rounded-xl mx-auto"
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
