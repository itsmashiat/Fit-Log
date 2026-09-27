import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

interface EmptyPlanStateProps {
  message?: string;
}

export const EmptyPlanState: React.FC<EmptyPlanStateProps> = ({
  message = "Browse the library and add a lift to get today moving.",
}) => {
  return (
    <div className="rounded-2xl md:rounded-3xl border border-dashed border-[#262C3A] bg-[#12141C]/60 py-16 px-6 text-center flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#181C26] border border-[#262C3A] flex items-center justify-center text-[#CCFF00]">
        <Dumbbell className="w-8 h-8" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="font-heading font-extrabold text-2xl text-white tracking-wide uppercase">
          NOTHING HERE YET
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm">{message}</p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
        >
          <span>Go to workouts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EmptyPlanState;