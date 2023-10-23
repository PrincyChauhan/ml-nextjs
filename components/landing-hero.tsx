"use client";

import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Various ML Models</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          <TypewriterComponent
            options={{
              strings: ["Support vector machine(SVM)","Logistic Regression","K-Nearest Neighbors(KNN)"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div>
        <Link href="/image">
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};
