import React from "react";
import { Workout } from "@/types/workout";
import WorkoutCard from "@/components/home/WorkoutCard";

interface TheLibraryProps {
  workouts: Workout[];
}

export const TheLibrary: React.FC<TheLibraryProps> = ({ workouts }) => {
  return (
    <section id="library" className="pt-14 sm:pt-20 scroll-mt-20">
      {/* Section Header */}
      <div className="mb-8 text-left space-y-1">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 3x4 Grid on Large Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default TheLibrary;