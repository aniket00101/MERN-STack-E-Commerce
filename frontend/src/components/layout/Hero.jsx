import React from "react";
import heroImg from "../../assets/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full">

      {/* Background Image */}
      <img 
        src={heroImg} 
        alt="Rabbit" 
        className="w-full h-[350px] sm:h-[450px] md:h-[600px] lg:h-[750px] object-cover" 
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 flex items-center justify-center px-4">

        <div className="text-center max-w-4xl">

          {/* Gradient Heading */}
          <h1 className="
            text-3xl sm:text-4xl md:text-6xl lg:text-8xl
            font-extrabold uppercase leading-tight mb-6
            bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500
            bg-clip-text text-transparent
            drop-shadow-[0_4px_20px_rgba(255,120,0,0.4)]
          ">
            Escape <br /> In Style
          </h1>

          {/* Paragraph */}
          <p className="
            text-xs sm:text-sm md:text-lg lg:text-xl 
            mb-8 text-gray-200
          ">
            Discover effortless 
            <span className="text-yellow-400 font-medium"> luxury </span>
            and travel-ready outfits designed to turn every destination into your 
            <span className="text-red-400 font-medium"> runway</span>.
          </p>

          {/* Gradient Button */}
          <Link 
            to="#"
            className="
              inline-block
              bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500
              text-black
              font-semibold
              px-6 py-3
              sm:px-8 sm:py-4
              text-sm sm:text-base md:text-lg
              rounded-xl
              shadow-lg
              hover:scale-105
              transition duration-300
            "
          >
            Shop Now
          </Link>

        </div>

      </div>

    </section>
  );
};

export default Hero;