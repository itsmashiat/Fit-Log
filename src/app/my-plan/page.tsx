"use client";

import React from "react";
import { useFitContext } from "@/context/FitContext";
import PlanMetricsStats from "@/components/my-plan/PlanMetricsStats";
import PlanTabsAndSort from "@/components/my-plan/PlanTabsAndSort";
import PlanCard from "@/components/my-plan/PlanCard";
import EmptyPlanState from "@/components/my-plan/EmptyPlanState";
import WorkoutRechartAnalytics from "@/components/analytics/WorkoutRechartAnalytics";

export default function MyPlanPage() {
  const { myPlans, savedPlans, activeTab, isLoaded } = useFitContext();

  const currentList = activeTab === "today" ? myPlans : savedPlans;

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="space-y-1 text-left">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <PlanMetricsStats />

      {/* Tabs and Sort controls */}
      <PlanTabsAndSort />

      {/* Workouts List or Loading / Empty States */}
      {!isLoaded ? (
        <div className="py-16 text-center text-gray-400 font-medium animate-pulse">
          Loading workouts…
        </div>
      ) : currentList.length === 0 ? (
        <EmptyPlanState
          message={
            activeTab === "today"
              ? "Browse the library and add a lift to get today moving."
              : "Save exercises from the library to build your future training sessions."
          }
        />
      ) : (
        <div className="space-y-3.5">
          {currentList.map((workout) => (
            <PlanCard key={workout.id} workout={workout} tab={activeTab} />
          ))}
        </div>
      )}

      {/* Recharts Analytics Section */}
      <div className="pt-6">
        <WorkoutRechartAnalytics />
      </div>
    </div>
  );
}