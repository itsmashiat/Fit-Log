"use client";

import React from "react";
import { Workout } from "@/types/workout";
import { useFitContext } from "@/context/FitContext";
import { CalendarPlus, Bookmark, Check } from "lucide-react";

interface PlanDetailsButtonsProps {
  workout: Workout;
}

export const PlanDetailsButtons: React.FC<PlanDetailsButtonsProps> = ({
  workout,
}) => {
  const { handleAddToPlan, handleSaveForLater, myPlans, savedPlans } =
    useFitContext();

  const isAlreadyInPlan = myPlans.some((item) => item.id === workout.id);
  const isAlreadySaved = savedPlans.some((item) => item.id === workout.id);

  return (
    <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
      <button
        onClick={() => handleAddToPlan(workout)}
        className={`flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md ${
          isAlreadyInPlan
            ? "bg-[#252E1D] text-[#CCFF00] border border-[#CCFF00]/40"
            : "bg-[#CCFF00] hover:bg-[#b8e600] text-black hover:shadow-[#CCFF00]/20 active:scale-[0.99]"
        }`}
      >
        {isAlreadyInPlan ? (
          <>
            <Check className="w-4 h-4" />
            <span>In Today&apos;s Plan</span>
          </>
        ) : (
          <>
            <CalendarPlus className="w-4 h-4" />
            <span>Add to today&apos;s plan</span>
          </>
        )}
      </button>

      <button
        onClick={() => handleSaveForLater(workout)}
        className={`inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all duration-200 ${
          isAlreadySaved
            ? "bg-[#1E2330] border-[#374151] text-[#CCFF00]"
            : "border-[#32394A] text-gray-200 hover:bg-[#1E2330] hover:border-gray-500 active:scale-[0.99]"
        }`}
      >
        <Bookmark className="w-4 h-4" />
        <span>{isAlreadySaved ? "Saved" : "Save for later"}</span>
      </button>
    </div>
  );
};

export default PlanDetailsButtons;