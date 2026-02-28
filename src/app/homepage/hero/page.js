import Button from "../../_common/button/page";
import Image from "next/image";
const cat2 = "/Assets/cat2.png";

const Hero = () => {
  return (
    <div className="bg-light_background text-background">
      <div className="mx-auto max-w-screen-xl space-y-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-5xl text-background text-center font-semibold sm:text-9xl">
          CAT FOOD
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-2">
          <div className="w-2/3 md:w-full text-center md:text-left  space-y-3">
            <p className="text-md font-medium">BEST QUALITY</p>
            <p className="text-4xl font-semibold">
              Limited Time !!
              <br />
              25% OFF – Order Today!
            </p>
          </div>
          <div className="w-2/3 md:w-full text-center md:text-left lg:order-3 space-y-3">
            <p className="text-md my-3 space-y-2 font-medium">
              Telles orchi ac auctor augue mauris augue cursus mattis molestie a
              iaculis at. Eu feugiat pretium nibh ipsum consequat.
            </p>
            <Button value={"BUY NOW"} redirectPath={"/store"} />
          </div>
          <div className="w-2/3 md:col-span-2 lg:col-span-1 md:w-full lg:order-2">
            <Image
              src={cat2}
              alt="Krishna Image"
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
