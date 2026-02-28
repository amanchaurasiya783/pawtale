"use client";
import HeroSection from "../_components/herosection/page";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function About() {
  const values = [
    {
      title: "Compassion",
      description: "We care deeply about the welfare of pets.",
      icon: "❤️",
    },
    {
      title: "Integrity",
      description: "Honesty and transparency are at the core of our values.",
      icon: "🔍",
    },
    {
      title: "Quality",
      description: "We offer only the best products for your pets.",
      icon: "⭐",
    },
    {
      title: "Innovation",
      description:
        "We are constantly improving to serve pets and pet owners better.",
      icon: "💡",
    },
  ];

  const teamMembers = [
    { name: "John Doe", role: "CEO", imageUrl: "/images/john.jpg" },
    { name: "Jane Smith", role: "COO", imageUrl: "/images/jane.jpg" },
    {
      name: "Sam Wilson",
      role: "Head of Marketing",
      imageUrl: "/images/sam.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Anna K.",
      feedback:
        "PetsZone has transformed the way I care for my pet! Their products are top-notch.",
      imageUrl: "/images/anna.jpg",
    },
    {
      name: "Mike L.",
      feedback: "Amazing service and a great selection of pet products!",
      imageUrl: "/images/mike.jpg",
    },
    {
      name: "Sarah T.",
      feedback:
        "The customer support team is very helpful, and my dog loves their treats.",
      imageUrl: "/images/sarah.jpg",
    },
  ];

  const milestones = [
    { number: "10K+", label: "Happy Pets" },
    { number: "500+", label: "Products" },
    { number: "50+", label: "Pet Experts" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <>
      <HeroSection title={"About Us"} backgroundImage={"/Assets/hero1.webp"} />

      <div className="py-10">
        {/* Our Story Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-6xl mx-auto my-10 px-4"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Story</h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Welcome to PetCare, your one-stop destination for everything
              pet-related! Whether you are a new pet parent or a seasoned pet
              lover, we are here to provide you with top-quality products,
              expert advice, and valuable resources to ensure your furry,
              feathery, or scaly friend leads a happy and healthy life.
            </p>
          </motion.div>

          {/* Image Grid Section */}
          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/pet-care-1.jpg"
                alt="Happy dogs"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="relative h-36 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/pet-care-2.jpg"
                  alt="Cat playing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-36 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/pet-care-3.jpg"
                  alt="Pet products"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-gray-700 leading-relaxed">
              PetCare was born out of pure love and admiration for pets. We
              understand that pets are not just animals; they are family. Our
              journey began when a group of pet enthusiasts and professionals
              came together with a shared vision—to create a platform where pet
              owners could find everything they need under one roof.
            </p>
          </motion.div>
        </motion.section>

        {/* Milestones Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-blue-50 py-16 my-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-blue-900 text-center mb-12"
            >
              Our Impact
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-white rounded-xl shadow-md"
                >
                  <h3 className="text-4xl font-bold text-blue-800 mb-2">
                    {milestone.number}
                  </h3>
                  <p className="text-gray-600">{milestone.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto my-16 px-4"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-blue-900 text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Team Section */}
        {/* <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto my-16 px-4"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-blue-900 text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="text-center bg-white p-6 rounded-xl shadow-md"
              >
                <div className="relative w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden border-4 border-blue-100">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* Testimonials Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto my-16 px-4"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-blue-900 text-center mb-12"
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-xl shadow-md"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    {testimonial.name}
                  </h3>
                </div>
                <p className="text-gray-700 italic">{testimonial.feedback}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-700 to-background rounded-2xl p-12 my-16 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Pamper Your Pet?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy pet owners who trust us for their pet care
            needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/store")}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white text-background font-bold py-3 px-8 rounded-full shadow-lg"
          >
            Shop Now
          </motion.button>
        </motion.section>
      </div>
    </>
  );
}
