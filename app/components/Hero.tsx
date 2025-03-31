import React from "react";
import GetStartedBtn from "./GetStartedBtn";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "@/public/assets/hero.jpeg";
import { MarqueeDemo } from "./Reviews";
import Footer from "./Footer";

interface NavbarProps {
  userId: string | null;
}

const Hero = ({ userId }: NavbarProps) => {
  return (
    <>
      {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(145%_135%_at_50%_6%,#000_55%,#63e_110%)]"></div> */}
      <section className="relative flex flex-col items-center justify-center py-12 lg:py-20 z-10">
        <div className="text-center">
          <span className="text-sm text-white font-medium tracking-tight bg-purple-500 backdrop-blur-sm px-4 py-2 rounded-full">
            Introducing InvoicePulse 2.0
          </span>

          <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
            Invoicing made{" "}
            <span className="block -mt-2 bg-gradient-to-l from-purple-600 via-sky-500 to-blue-700 text-transparent bg-clip-text  ">
              <TypingAnimation className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ">
                super easy!
              </TypingAnimation>
            </span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
            Creating Invoices can be a pain! We at InvoiceMarshal make it super
            easy for you to get paid in time!
          </p>

          <div className="mt-7 mb-12">
            <Link href={userId ? "/dashboard" : "/sign-in"}>
              <GetStartedBtn />
            </Link>
          </div>
        </div>
        <div className="w-full py-12 mx-auto mt-12">
          <Image
            src={HeroImage}
            alt="Hero image"
            className="relative object-cover w-full border rounded-lg lg:rounded-2xl shadow-2xl"
          />
        </div>
        <div className="max-w-full">
          <h2 className="text-2xl font-thin">Reviews</h2>
          <MarqueeDemo />
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Hero;
