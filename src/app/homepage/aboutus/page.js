import Image from "next/image";
import Button from "@/app/_components/button.tsx";

const AboutUs = () => {
  return (
    <section className="bg-[#fafcff] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/Assets/dog3.png"
              alt="About PetVibe"
              width={700}
              height={700}
              priority
              unoptimized
              className="h-auto w-full max-w-lg object-contain"
            />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-background">
              ABOUT PETVIBE
            </p>

            <h2 className="mt-3 text-3xl font-bold text-background md:text-4xl">
              About Us
            </h2>

            <p className="mt-6 text-base leading-8 text-background/90">
              PetsZone was founded with a passion for pets and a commitment to
              providing high-quality pet care products and services. Our journey
              began with a mission to make the lives of pets and their owners
              easier and happier. We have grown from a small local store to a
              trusted online resource for all things pet-related. At PetsZone,
              we believe in nurturing the bond between people and their pets,
              and we are constantly working to improve and expand our range of
              products to meet our customer needs.
            </p>

            <div className="mt-8">
              <Button redirectPath="/about" value="Know More" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
