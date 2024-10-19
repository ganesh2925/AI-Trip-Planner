import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-55 gap-9">
      <h1 className="font-extrabold text-[40px] text-center max-sm:mt-8 mt-16 mx-8">
        <span className="text-[#f56551]">
          Discover You Next Adventutre with AI:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center m-3">
        Your Presonal trip planner and travel curator, creating custom
        Itineraries tailored to your interests and budget.
      </p>

      <Link to={"/create-trip"}>
        <Button className='mb-10'>Get Started, It's Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
