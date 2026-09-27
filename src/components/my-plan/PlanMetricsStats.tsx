"use client";

import React from "react";
import { useFitContext } from "@/context/FitContext";

export const PlanMetricsStats = () => {
  const { myPlans, savedPlans, activeTab } = useFitContext();
  const currentList = activeTab === "today" ? myPlans : savedPlans;

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((sum, item) => sum + (item.duration || 0), 0);
  const totalCalories = currentList.reduce(
    (sum, item) => sum + (item.caloriesBurned || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 bg-[#13161F] border border-[#212634] rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-[#212634] overflow-hidden">
      {/* Exercises Metric */}
      <div className="p-6 sm:p-7 flex flex-col justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Exercises
        </p>
        <p className="font-heading font-extrabold text-4xl sm:text-5xl text-[#CCFF00] mt-2">
          {totalExercises}
        </p>
      </div>

      {/* Minutes Metric */}
      <div className="p-6 sm:p-7 flex flex-col justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Minutes
        </p>
        <p className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
          {totalMinutes}
        </p>
      </div>

      {/* Calories Metric */}
      <div className="p-6 sm:p-7 flex flex-col justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Calories
        </p>
        <p className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
          {totalCalories}
        </p>
      </div>
    </div>
  );
};

export default PlanMetricsStats;