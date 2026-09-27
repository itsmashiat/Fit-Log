import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#1C1F2A] bg-[#0B0C0E] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: brand logo icon + FITLOG */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="font-heading font-extrabold text-lg tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Right: copyright line */}
        <p className="text-xs text-gray-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;