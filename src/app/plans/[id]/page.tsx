import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Workout } from "@/types/workout";
import { fallbackWorkouts } from "@/data/workouts";
import PlanDetailsButtons from "@/components/details/PlanDetailsButtons";
import { ArrowLeft } from "lucide-react";

interface PlanDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function fetchWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("API error fetching single workout:", err);
  }

  const numericId = parseInt(id, 10);
  const found = fallbackWorkouts.find((w) => w.id === numericId);
  return found || null;
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    if (res.ok) {
      const data: Workout[] = await res.json();
      return data.map((item) => ({ id: String(item.id) }));
    }
  } catch (err) {
    console.error("Failed to fetch static params, using fallbacks:", err);
  }
  return fallbackWorkouts.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({
  params,
}: PlanDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await fetchWorkout(id);

  if (!workout) {
    return {
      title: "Workout Not Found | FitLog",
    };
  }

  return {
    title: `${workout.name} — Workout Specs | FitLog`,
    description: workout.description,
  };
}

export default async function PlanDetailsPage({ params }: PlanDetailsPageProps) {
  const { id } = await params;
  const workout = await fetchWorkout(id);

  if (!workout) {
    notFound();
  }

  const specRows = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#CCFF00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual / Media */}
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden bg-[#13151D] border border-[#202532] shadow-2xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Column: Workout Info, Specs Table, Instructions, Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Category Tags */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="bg-[#CCFF00] text-black font-extrabold text-[11px] tracking-wider uppercase px-3 py-1 rounded-full"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-none">
              {workout.name}
            </h1>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Key Specs Table / Panel */}
          <div className="rounded-2xl bg-[#14171F] border border-[#222634] divide-y divide-[#222634] overflow-hidden">
            {specRows.map((spec) => (
              <div
                key={spec.label}
                className="px-5 py-3.5 flex items-center justify-between text-xs sm:text-sm hover:bg-[#181C26] transition-colors"
              >
                <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">
                  {spec.label}
                </span>
                <span className="font-semibold text-gray-200">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Instructions Section */}
          <div className="space-y-3">
            <h3 className="font-heading font-extrabold text-lg text-white uppercase tracking-wide">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2.5">
              {workout.instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#1F2432] text-[#CCFF00] font-bold text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-to-action buttons */}
          <PlanDetailsButtons workout={workout} />
        </div>
      </div>
    </div>
  );
}