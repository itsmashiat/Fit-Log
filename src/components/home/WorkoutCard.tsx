import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/plans/${workout.id}`}
      className="group flex flex-col rounded-2xl bg-[#13151D] border border-[#202532] overflow-hidden hover:border-[#32394c] hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
    >
      {/* Workout Thumbnail */}
      <div className="relative w-full h-52 sm:h-56 bg-[#1A1D27] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13151D] via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Information */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Muscle Group Tag Pills */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="bg-[#CCFF00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white uppercase tracking-tight mt-3 transition-colors group-hover:text-[#CCFF00]">
            {workout.name}
          </h3>

          {/* Equipment line */}
          <p className="text-xs text-gray-400 mt-1">{workout.equipment}</p>
        </div>

        {/* Stats Row */}
        <div className="border-t border-[#1F2432] mt-5 pt-4 flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-gray-400 fill-current" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-gray-400" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;