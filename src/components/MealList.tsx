import { MealCard } from "./MealCard.tsx";
import { Loader } from "./Loader.tsx";
import type { Meal } from "../lib/types.ts";

type MealListProps = {
  meals: Meal[];
  loading: boolean;
};

export const MealList = ({ meals, loading }: MealListProps) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10"
      aria-busy={loading}
    >
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <Loader key={i} />)
        : meals.map((m) => <MealCard key={m.idMeal} data={m} />)}
    </div>
  );
};
