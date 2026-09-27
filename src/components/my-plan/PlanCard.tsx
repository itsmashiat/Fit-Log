"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout, PlanTab } from "@/types/workout";
import { useFitContext } from "@/context/FitContext";
import { Clock, Flame, Star, Check, CheckCheck, X, Plus } from "lucide-react";

interface PlanCardProps {
  workout: Workout;
  tab: PlanTab;
}

export const PlanCard: React.FC<PlanCardProps> = ({ workout, tab }) => {
  const { handleRemove, handleToggleDone, handleAddToPlan } = useFitContext();

  const isDone = workout.isDone || false;

  return (
    <div
      className={`rounded-2xl border bg-[#13151E] p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all duration-200 ${
        isDone
          ? "border-[#CCFF00]/40 bg-[#161B1C]/60 opacity-90"
          : "border-[#212634] hover:border-[#2f3647]"
      }`}
    >
      {/* Left: Thumbnail & Details */}
      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
        <div className="relative w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-[#1A1D27] flex-shrink-0">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="112px"
            className="object-cover object-top"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3
              className={`font-heading font-extrabold text-base sm:text-lg uppercase tracking-tight truncate ${
                isDone ? "line-through text-gray-400" : "text-white"
              }`}
            >
              {workout.name}
            </h3>
            {isDone && (
              <span className="bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Done
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400 truncate">{workout.equipment}</p>

          <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-gray-400 fill-current" />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-gray-400" />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-[#212634]">
        {/* View Details Link */}
        <Link
          href={`/plans/${workout.id}`}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 border border-[#2b3140] hover:text-white hover:border-gray-500 hover:bg-[#1A1D27] transition-colors"
        >
          View Details
        </Link>

        {/* Saved Tab specific: Move to Today's Plan */}
        {tab === "saved" && (
          <button
            onClick={() => handleAddToPlan(workout)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#252E1D] text-[#CCFF00] border border-[#CCFF00]/30 hover:bg-[#CCFF00] hover:text-black transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Plan</span>
          </button>
        )}

        {/* Today Tab specific: Mark as Done Button */}
        {tab === "today" && (
          <button
            onClick={() => handleToggleDone(workout.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isDone
                ? "bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/50"
                : "bg-[#CCFF00] hover:bg-[#b8e600] text-black"
            }`}
          >
            {isDone ? (
              <>
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Done</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Mark as Done</span>
              </>
            )}
          </button>
        )}

        {/* Remove Button */}
        <button
          onClick={() => handleRemove(workout.id, tab)}
          className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
          aria-label="Remove workout"
          title="Remove from plan"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PlanCard;