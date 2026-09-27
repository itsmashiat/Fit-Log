import React from "react";

export default function Loading() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Banner Skeleton */}
      <div className="rounded-3xl bg-[#13161F] border border-[#212634] p-10 h-80 flex items-center justify-between">
        <div className="space-y-4 max-w-md w-full">
          <div className="h-4 bg-[#212634] rounded w-28" />
          <div className="h-12 bg-[#212634] rounded w-3/4" />
          <div className="h-4 bg-[#212634] rounded w-full" />
          <div className="h-10 bg-[#CCFF00]/20 rounded-lg w-40 mt-4" />
        </div>
        <div className="hidden lg:block w-72 h-72 rounded-full bg-[#1E2330]" />
      </div>

      {/* Library Grid Skeleton */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 bg-[#212634] rounded w-48" />
          <div className="h-4 bg-[#212634] rounded w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#13151D] border border-[#202532] overflow-hidden p-0"
            >
              <div className="h-52 bg-[#1A1D27]" />
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <div className="h-5 bg-[#CCFF00]/20 rounded-full w-14" />
                  <div className="h-5 bg-[#CCFF00]/20 rounded-full w-14" />
                </div>
                <div className="h-6 bg-[#202532] rounded w-3/4" />
                <div className="h-4 bg-[#202532] rounded w-1/2" />
                <div className="border-t border-[#1F2432] pt-4 flex gap-4">
                  <div className="h-4 bg-[#202532] rounded w-16" />
                  <div className="h-4 bg-[#202532] rounded w-16" />
                  <div className="h-4 bg-[#202532] rounded w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}