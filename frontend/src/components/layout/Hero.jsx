import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full">

      <img src={heroImg} alt="Rabbit" className="w-full h-[350px] sm:h-[450px] md:h-[600px] lg:h-[750px] object-cover" />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">

        <div className="text-center text-white max-w-4xl">

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold uppercase leading-tight mb-4"> Vacation <br /> Ready </h1>

          <p className="text-xs sm:text-sm md:text-lg lg:text-xl mb-6"> Explore our vacation-ready outfits with fast worldwide shipping. </p>

          <Link to="#" className="inline-block bg-white text-gray-900 px-5 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg rounded hover:bg-gray-200 transition duration-300"> Shop Now </Link>

        </div>
      </div>

    </section>
  );
};

export default Hero;