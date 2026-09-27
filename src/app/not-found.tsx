import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#141720] border border-[#232836] flex items-center justify-center text-[#CCFF00] shadow-xl shadow-black/50">
        <Dumbbell className="w-10 h-10 -rotate-45" />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
          404 ERROR
        </p>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight uppercase">
          PAGE NOT FOUND
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
          The lift or page you are looking for has been racked away or does not exist.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workouts Library</span>
        </Link>
      </div>
    </div>
  );
}