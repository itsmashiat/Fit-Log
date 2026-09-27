"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Workout } from "@/types/workout";
import { useFitContext } from "@/context/FitContext";
import { BarChart3, Flame, Clock, CheckCircle2 } from "lucide-react";

interface WorkoutRechartAnalyticsProps {
  initialWorkouts?: Workout[];
}

interface CustomTooltipPayload {
  name: string;
  fullName: string;
  calories: number;
  duration: number;
  rating: number;
  isDone: boolean;
  status: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: CustomTooltipPayload }>;
  isPlan?: boolean;
}

const CustomTooltipContent: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  isPlan,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#161922] border border-[#2B3142] rounded-xl p-3.5 shadow-2xl text-xs space-y-2 min-w-[200px]">
        <div className="border-b border-[#252A38] pb-1.5">
          <p className="font-bold text-white text-sm">{data.fullName}</p>
          {isPlan && (
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  data.isDone ? "bg-[#CCFF00]" : "bg-amber-400"
                }`}
              />
              <span
                className={`text-[11px] font-semibold ${
                  data.isDone ? "text-[#CCFF00]" : "text-amber-400"
                }`}
              >
                {data.isDone ? "Completed ✓" : "Pending / In Progress"}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              Calories:
            </span>
            <strong className="text-white">{data.calories} kcal</strong>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              Duration:
            </span>
            <strong className="text-white">{data.duration} min</strong>
          </div>
          <div className="flex justify-between items-center text-gray-400 text-[11px] pt-1 border-t border-[#252A38]">
            <span>Rating:</span>
            <strong className="text-gray-200">★ {data.rating}</strong>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const WorkoutRechartAnalytics: React.FC<WorkoutRechartAnalyticsProps> = ({
  initialWorkouts = [],
}) => {
  const { myPlans } = useFitContext();
  const [libraryData, setLibraryData] = useState<Workout[]>(initialWorkouts);
  const [activeDataset, setActiveDataset] = useState<"plan" | "library">("plan");
  const [planFilter, setPlanFilter] = useState<"all" | "completed" | "pending">("all");

  // Fetch API card information if not provided
  useEffect(() => {
    if (initialWorkouts.length === 0) {
      fetch("https://api.abcz.workers.dev/api/fitlog")
        .then((res) => res.json())
        .then((data: Workout[]) => setLibraryData(data))
        .catch((err) => console.error("Failed to load workout card data for recharts:", err));
    }
  }, [initialWorkouts]);

  // Today's plan breakdown
  const completedWorkouts = myPlans.filter((w) => Boolean(w.isDone));
  const pendingWorkouts = myPlans.filter((w) => !w.isDone);

  const completedCalories = completedWorkouts.reduce(
    (acc, w) => acc + (w.caloriesBurned || 0),
    0
  );
  const totalPlanCalories = myPlans.reduce(
    (acc, w) => acc + (w.caloriesBurned || 0),
    0
  );

  const completedDuration = completedWorkouts.reduce(
    (acc, w) => acc + (w.duration || 0),
    0
  );
  const totalPlanDuration = myPlans.reduce(
    (acc, w) => acc + (w.duration || 0),
    0
  );

  const completionPercent =
    myPlans.length > 0 ? Math.round((completedWorkouts.length / myPlans.length) * 100) : 0;

  // Filtered dataset for chart
  let activeWorkouts: Workout[] = [];
  if (activeDataset === "plan") {
    if (myPlans.length === 0) {
      activeWorkouts = [];
    } else if (planFilter === "completed") {
      activeWorkouts = completedWorkouts;
    } else if (planFilter === "pending") {
      activeWorkouts = pendingWorkouts;
    } else {
      activeWorkouts = myPlans;
    }
  } else {
    activeWorkouts = libraryData;
  }

  // Format data for Recharts
  const chartData = activeWorkouts.map((w) => {
    const isDone = Boolean(w.isDone);
    const shortName = w.name.length > 14 ? w.name.slice(0, 12) + "…" : w.name;
    return {
      name: activeDataset === "plan" && isDone ? `✓ ${shortName}` : shortName,
      fullName: w.name,
      calories: w.caloriesBurned,
      duration: w.duration,
      rating: w.rating,
      isDone,
      status: isDone ? "Completed" : "Pending",
    };
  });

  return (
    <div className="rounded-2xl md:rounded-3xl bg-[#13161F] border border-[#212634] p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#CCFF00]" />
            <h3 className="font-heading font-extrabold text-xl text-white tracking-wide uppercase">
              WORKOUT ANALYTICS &amp; ENERGY METRICS
            </h3>
          </div>
          <p className="text-gray-400 text-xs">
            Visual comparison of calories burned (kcal) and duration (min) across card lifts.
          </p>
        </div>

        {/* Controls: Dataset Toggle & Plan Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Plan Done/Pending Sub-Filter */}
          {activeDataset === "plan" && myPlans.length > 0 && (
            <div className="flex items-center bg-[#10121A] border border-[#212634] p-1 rounded-xl">
              <button
                onClick={() => setPlanFilter("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  planFilter === "all"
                    ? "bg-[#CCFF00] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All ({myPlans.length})
              </button>
              <button
                onClick={() => setPlanFilter("completed")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  planFilter === "completed"
                    ? "bg-[#CCFF00] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>Done</span>
                <span className="bg-black/20 px-1 rounded text-[10px]">
                  {completedWorkouts.length}
                </span>
              </button>
              <button
                onClick={() => setPlanFilter("pending")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  planFilter === "pending"
                    ? "bg-[#CCFF00] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>To Do</span>
                <span className="bg-black/20 px-1 rounded text-[10px]">
                  {pendingWorkouts.length}
                </span>
              </button>
            </div>
          )}

          {/* Dataset Toggle */}
          <div className="flex items-center bg-[#181C26] border border-[#232836] p-1 rounded-xl">
            <button
              onClick={() => setActiveDataset("plan")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDataset === "plan"
                  ? "bg-[#CCFF00] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({myPlans.length})
            </button>
            <button
              onClick={() => setActiveDataset("library")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDataset === "library"
                  ? "bg-[#CCFF00] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Library Lifts ({libraryData.length})
            </button>
          </div>
        </div>
      </div>

      {/* Visual Legend / Status Bar */}
      {activeDataset === "plan" && myPlans.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#181C26]/60 border border-[#212634] px-4 py-2 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-400 font-semibold">Calories:</span>
            <div className="flex items-center gap-1.5 text-gray-300">
              <span className="w-3 h-3 rounded bg-[#CCFF00] inline-block shadow-sm shadow-[#CCFF00]/50" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-3 rounded bg-[#455225] inline-block" />
              <span>To Do</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-400 font-semibold">Duration:</span>
            <div className="flex items-center gap-1.5 text-gray-300">
              <span className="w-3 h-3 rounded bg-[#38BDF8] inline-block shadow-sm shadow-[#38BDF8]/50" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-3 rounded bg-[#1E293B] inline-block" />
              <span>To Do</span>
            </div>
          </div>
        </div>
      )}

      {/* Rechart Container */}
      <div className="w-full h-72 sm:h-80">
        {chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-xs space-y-1">
            {activeDataset === "plan" && planFilter === "completed" ? (
              <span>No workouts completed yet today. Mark a workout as done above!</span>
            ) : activeDataset === "plan" && planFilter === "pending" ? (
              <span>All workouts completed for today! Great job!</span>
            ) : (
              <span>No workout data to chart yet. Add exercises to view analytics.</span>
            )}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2432" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                content={<CustomTooltipContent isPlan={activeDataset === "plan"} />}
              />
              <Bar
                dataKey="calories"
                name="Calories (kcal)"
                radius={[6, 6, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`calories-cell-${index}`}
                    fill={
                      activeDataset === "plan"
                        ? entry.isDone
                          ? "#CCFF00"
                          : "#455225"
                        : "#CCFF00"
                    }
                  />
                ))}
              </Bar>
              <Bar
                dataKey="duration"
                name="Duration (min)"
                radius={[6, 6, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`duration-cell-${index}`}
                    fill={
                      activeDataset === "plan"
                        ? entry.isDone
                          ? "#38BDF8"
                          : "#1E293B"
                        : "#3B82F6"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Dynamic Highlights / Real-time Progress */}
      {activeDataset === "plan" && myPlans.length > 0 ? (
        <div className="space-y-3 pt-3 border-t border-[#1F2432]">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 text-xs">
              <span className="text-gray-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
                <span>Session Completion:</span>
                <strong className="text-white">
                  {completedWorkouts.length} of {myPlans.length} lifts ({completionPercent}%)
                </strong>
              </span>
              <span className="text-[#CCFF00] font-bold text-xs">
                {completedCalories} / {totalPlanCalories} kcal burned
              </span>
            </div>
            <div className="w-full bg-[#181C26] h-2 rounded-full overflow-hidden border border-[#232836]">
              <div
                className="bg-[#CCFF00] h-full transition-all duration-500 rounded-full"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          {/* Stats Summary Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="flex items-center gap-2 text-gray-400">
              <Flame className="w-4 h-4 text-[#CCFF00]" />
              <span>
                Burned So Far:{" "}
                <strong className="text-white">{completedCalories} kcal</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>
                Time Completed:{" "}
                <strong className="text-white">
                  {completedDuration} / {totalPlanDuration} min
                </strong>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-gray-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>
                Remaining:{" "}
                <strong className="text-white">
                  {totalPlanCalories - completedCalories} kcal
                </strong>
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Default / Library Highlights */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-[#1F2432] text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <Flame className="w-4 h-4 text-[#CCFF00]" />
            <span>
              Avg Burn:{" "}
              <strong className="text-white">
                {chartData.length
                  ? Math.round(
                      chartData.reduce((a, b) => a + b.calories, 0) / chartData.length
                    )
                  : 0}{" "}
                kcal
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>
              Avg Duration:{" "}
              <strong className="text-white">
                {chartData.length
                  ? Math.round(
                      chartData.reduce((a, b) => a + b.duration, 0) / chartData.length
                    )
                  : 0}{" "}
                min
              </strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-gray-400">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00]" />
            <span>Source: Live FitLog API</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutRechartAnalytics;
