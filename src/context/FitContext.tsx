"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { Workout, SortCriterion, PlanTab } from "@/types/workout";

interface FitContextType {
  myPlans: Workout[];
  savedPlans: Workout[];
  activeTab: PlanTab;
  setActiveTab: (tab: PlanTab) => void;
  sortBy: SortCriterion;
  setSortBy: (sort: SortCriterion) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleAddToPlan: (workout: Workout) => boolean;
  handleSaveForLater: (workout: Workout) => boolean;
  handleRemove: (workoutId: number, from: PlanTab) => void;
  handleToggleDone: (workoutId: number) => void;
  isLoaded: boolean;
}

const FitContext = createContext<FitContextType | undefined>(undefined);

export const FitProvider = ({ children }: { children: ReactNode }) => {
  const [myPlans, setMyPlans] = useState<Workout[]>([]);
  const [savedPlans, setSavedPlans] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<PlanTab>("today");
  const [sortBy, setSortBy] = useState<SortCriterion>("Duration");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load persisted plans on initial client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedToday = localStorage.getItem("fitlog_today_plans");
        const storedSaved = localStorage.getItem("fitlog_saved_plans");

        if (storedToday) {
          setMyPlans(JSON.parse(storedToday));
        }
        if (storedSaved) {
          setSavedPlans(JSON.parse(storedSaved));
        }
      } catch (err) {
        console.error("Failed to read from localStorage:", err);
      } finally {
        setIsLoaded(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Sync today's plan to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_today_plans", JSON.stringify(myPlans));
    } catch (err) {
      console.error("Failed to save today's plan to localStorage:", err);
    }
  }, [myPlans, isLoaded]);

  // Sync saved plans to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_saved_plans", JSON.stringify(savedPlans));
    } catch (err) {
      console.error("Failed to save saved plans to localStorage:", err);
    }
  }, [savedPlans, isLoaded]);

  // Add workout to Today's Plan (with cap of 5)
  const handleAddToPlan = (workout: Workout): boolean => {
    const exists = myPlans.some((item) => item.id === workout.id);
    if (exists) {
      toast.info(`"${workout.name}" is already in your Today's Plan`);
      return false;
    }

    if (myPlans.length >= 5) {
      toast.warning("Today's Plan is capped at 5 lifts. Complete or remove one first!");
      return false;
    }

    setMyPlans((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success(`Added "${workout.name}" to today's plan`);
    return true;
  };

  // Add workout to Saved for Later
  const handleSaveForLater = (workout: Workout): boolean => {
    const exists = savedPlans.some((item) => item.id === workout.id);
    if (exists) {
      toast.info(`"${workout.name}" is already in your Saved list`);
      return false;
    }

    setSavedPlans((prev) => [...prev, workout]);
    toast.success(`Saved "${workout.name}" for later`);
    return true;
  };

  // Remove workout from plan or saved
  const handleRemove = (workoutId: number, from: PlanTab) => {
    if (from === "today") {
      const removed = myPlans.find((item) => item.id === workoutId);
      setMyPlans((prev) => prev.filter((item) => item.id !== workoutId));
      if (removed) {
        toast.info(`Removed "${removed.name}" from today's plan`);
      }
    } else {
      const removed = savedPlans.find((item) => item.id === workoutId);
      setSavedPlans((prev) => prev.filter((item) => item.id !== workoutId));
      if (removed) {
        toast.info(`Removed "${removed.name}" from saved list`);
      }
    }
  };

  // Mark / unmark workout as done
  const handleToggleDone = (workoutId: number) => {
    setMyPlans((prev) =>
      prev.map((item) => {
        if (item.id === workoutId) {
          const nextState = !item.isDone;
          if (nextState) {
            toast.success(`Marked "${item.name}" as done! Great job!`);
          } else {
            toast.info(`Marked "${item.name}" as not completed`);
          }
          return { ...item, isDone: nextState };
        }
        return item;
      })
    );
  };

  // Sorted and filtered list helper
  const sortWorkouts = useCallback(
    (list: Workout[]) => {
      const sorted = [...list].sort((a, b) => {
        if (sortBy === "Duration") return b.duration - a.duration;
        if (sortBy === "Calories") return b.caloriesBurned - a.caloriesBurned;
        if (sortBy === "Rating") return b.rating - a.rating;
        return 0;
      });

      if (!searchQuery.trim()) return sorted;
      const q = searchQuery.toLowerCase();
      return sorted.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    },
    [sortBy, searchQuery]
  );

  const sortedMyPlans = useMemo(() => sortWorkouts(myPlans), [myPlans, sortWorkouts]);
  const sortedSavedPlans = useMemo(() => sortWorkouts(savedPlans), [savedPlans, sortWorkouts]);

  return (
    <FitContext.Provider
      value={{
        myPlans: sortedMyPlans,
        savedPlans: sortedSavedPlans,
        activeTab,
        setActiveTab,
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
        handleAddToPlan,
        handleSaveForLater,
        handleRemove,
        handleToggleDone,
        isLoaded,
      }}
    >
      {children}
    </FitContext.Provider>
  );
};

export const useFitContext = (): FitContextType => {
  const context = useContext(FitContext);
  if (!context) {
    throw new Error("useFitContext must be used within a FitProvider");
  }
  return context;
};