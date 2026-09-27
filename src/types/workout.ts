export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
  isDone?: boolean;
}

export type SortCriterion = "Duration" | "Calories" | "Rating";

export type PlanTab = "today" | "saved";

export interface PlanMetrics {
  totalExercises: number;
  totalDuration: number;
  totalCalories: number;
}