"use client";

import React, { useState } from "react";
import { useFitContext } from "@/context/FitContext";
import { SortCriterion } from "@/types/workout";
import { ChevronDown, Search } from "lucide-react";

export const PlanTabsAndSort = () => {
  const {
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    myPlans,
    savedPlans,
  } = useFitContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions: SortCriterion[] = ["Duration", "Calories", "Rating"];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4">
      {/* Tabs: Today's Plan / Saved */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("today")}
          className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
            activeTab === "today"
              ? "bg-[#CCFF00] text-black shadow-md"
              : "bg-[#14171F] text-gray-400 border border-[#212634] hover:text-white"
          }`}
        >
          Today&apos;s Plan ({myPlans.length})
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
            activeTab === "saved"
              ? "bg-[#CCFF00] text-black shadow-md"
              : "bg-[#14171F] text-gray-400 border border-[#212634] hover:text-white"
          }`}
        >
          Saved ({savedPlans.length})
        </button>
      </div>

      {/* Search and Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 sm:w-56">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workouts or tag..."
            className="w-full bg-[#14171F] border border-[#212634] rounded-xl pl-9.5 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#CCFF00] transition-colors"
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full sm:w-auto inline-flex items-center justify-between gap-2.5 bg-[#14171F] border border-[#212634] px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:border-[#32394A] transition-colors"
          >
            <span className="text-gray-500">Sort By:</span>
            <span className="text-[#CCFF00] font-bold">{sortBy}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#161922] border border-[#232836] rounded-xl shadow-2xl py-1 z-20">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    sortBy === option
                      ? "bg-[#252E1D] text-[#CCFF00] font-bold"
                      : "text-gray-300 hover:bg-[#1E222D]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanTabsAndSort;