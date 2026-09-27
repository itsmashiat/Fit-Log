import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export const Banner = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#13161F] border border-[#212634] p-6 sm:p-10 md:p-12 lg:p-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Typography and CTA */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6 text-left">
          <p className="font-bold text-xs tracking-widest text-[#CCFF00] uppercase">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            TRAIN WITH INTENT. <br className="hidden sm:inline" />
            LOG EVERY SET.
          </h1>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-lg hover:shadow-[#CCFF00]/10 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right column: Hero 3D Illustration */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] aspect-square">
            <Image
              src="/assets/banner.png"
              alt="FitLog Training Hero"
              fill
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;