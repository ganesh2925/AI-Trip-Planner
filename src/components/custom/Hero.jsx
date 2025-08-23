import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { HeroScrollDemo } from "./ProjectImageScroll";
import { MacbookScrollDemo } from "./MacbookScrollDemo";

const Hero = () => {
  const ScreenSize = window.matchMedia("(max-width: 768px)").matches;
  return (
    <div className="flex flex-col items-center mx-55 gap-9">
      <h1 className="font-extrabold text-[80px] text-center max-lg:text-[48px] max-sm:mt-8 mt-16 mx-8">
        <span className="text-[#f56551]">
          Discover You Next Adventutre with AI:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-4xl max-sm:text-xl text-gray-500 text-center m-3">
        Your Presonal trip planner and travel curator, creating custom
        Itineraries tailored to your interests and budget.
      </p>
      {ScreenSize ? <HeroScrollDemo /> : <MacbookScrollDemo />}
      <Link to={"/create-trip"}>
        <Button className="mb-10 text-2xl p-8">Get Started, It's Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
