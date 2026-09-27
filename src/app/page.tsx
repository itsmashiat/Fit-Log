import React from "react";
import Banner from "@/components/home/Banner";
import TheLibrary from "@/components/home/TheLibrary";
import { Workout } from "@/types/workout";
import { fallbackWorkouts } from "@/data/workouts";

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.statusText}`);
    }
    const data: Workout[] = await res.json();
    return data && data.length > 0 ? data : fallbackWorkouts;
  } catch (err) {
    console.error("API error, falling back to local dataset:", err);
    return fallbackWorkouts;
  }
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div className="space-y-6 sm:space-y-10">
      <Banner />
      <TheLibrary workouts={workouts} />
    </div>
  );
}
