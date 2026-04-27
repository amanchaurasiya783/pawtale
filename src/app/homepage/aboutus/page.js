import Image from "next/image";
// import Button from "../../_common/button/page";
import Button from "@/app/_components/button.tsx";

const AboutUs = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-center my-16 md:my-10">
      <div className="w-full sm:w-1/2 aspect-square overflow-hidden">
        <Image
          src={"/Assets/dog3.png"}
          width={200}
          height={200}
          unoptimized={true}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-5 w-full mx-auto text-center sm:mx-0 sm:text-left sm:w-1/2">
        <div className="text-3xl font-semibold my-3 text-background">
          About Us
        </div>
        <p className="my-4 font-medium text-background">
          PetsZone was founded with a passion for pets and a commitment to
          providing high-quality pet care products and services. Our journey
          began with a mission to make the lives of pets and their owners easier
          and happier. We’ve grown from a small local store to a trusted online
          resource for all things pet-related. At PetsZone, we believe in
          nurturing the bond between people and their pets, and we are
          constantly working to improve and expand our range of products to meet
          our customers needs.
        </p>
        <Button redirectPath={"/about"} value={"Know More"} />
      </div>
    </div>
  );
};

export default AboutUs;
