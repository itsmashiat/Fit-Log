"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitContext } from "@/context/FitContext";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const { myPlans, savedPlans, setActiveTab } = useFitContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePlanClick = (tab: "today" | "saved") => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/plans");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 bg-[#0B0C0E]/90 backdrop-blur-md border-b border-[#1E222D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left side */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                alt="FitLog Logo"
                width={28}
                height={28}
                className="object-contain transition-transform group-hover:scale-110"
                priority
              />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-wider text-white">
              FITLOG
            </span>
          </Link>

          {/* Navigation links in the middle */}
          <nav className="hidden md:flex items-center">
            <div className="bg-[#14161E] border border-[#222632] rounded-full p-1 flex items-center gap-1">
              <Link
                href="/"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isWorkoutsActive
                    ? "bg-[#252E1D] text-[#CCFF00]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Workouts
              </Link>
              <Link
                href="/my-plan"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isMyPlanActive
                    ? "bg-[#252E1D] text-[#CCFF00]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                My Plan
              </Link>
            </div>
          </nav>

          {/* Right-side status badges (counters) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/my-plan"
              onClick={() => handlePlanClick("today")}
              className="flex items-center gap-2 text-xs font-medium text-gray-300 hover:text-white transition-colors"
            >
              <span>Plan</span>
              <span className="inline-flex items-center justify-center bg-[#CCFF00] text-black font-bold min-w-5 h-5 px-1.5 rounded-full text-xs">
                {myPlans.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              onClick={() => handlePlanClick("saved")}
              className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
            >
              <span>Saved</span>
              <span className="inline-flex items-center justify-center border border-[#374151] text-gray-300 font-bold min-w-5 h-5 px-1.5 rounded-full text-xs">
                {savedPlans.length}
              </span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-3">
            <Link
              href="/my-plan"
              onClick={() => handlePlanClick("today")}
              className="inline-flex items-center justify-center bg-[#CCFF00] text-black font-bold h-6 px-2 rounded-full text-xs"
            >
              Plan {myPlans.length}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-[#1E222D] flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isWorkoutsActive ? "bg-[#252E1D] text-[#CCFF00]" : "text-gray-300"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => {
                setActiveTab("today");
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isMyPlanActive ? "bg-[#252E1D] text-[#CCFF00]" : "text-gray-300"
              }`}
            >
              My Plan
            </Link>
            <div className="flex items-center gap-4 px-3 pt-2 border-t border-[#1E222D]">
              <Link
                href="/my-plan"
                onClick={() => handlePlanClick("today")}
                className="flex items-center gap-2 text-xs font-medium text-gray-300"
              >
                <span>Plan</span>
                <span className="bg-[#CCFF00] text-black font-bold px-2 py-0.5 rounded-full text-xs">
                  {myPlans.length}
                </span>
              </Link>
              <Link
                href="/my-plan"
                onClick={() => handlePlanClick("saved")}
                className="flex items-center gap-2 text-xs font-medium text-gray-400"
              >
                <span>Saved</span>
                <span className="border border-[#374151] text-gray-300 font-bold px-2 py-0.5 rounded-full text-xs">
                  {savedPlans.length}
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;