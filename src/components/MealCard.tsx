import type { Meal } from "./../lib/types";

type MealCardProps = { data: Meal; onSelect?: (id: string) => void };

export const MealCard = ({ data, onSelect }: MealCardProps) => {
  return (
    <div className="cursor-pointer" onClick={() => onSelect?.(data.idMeal)}>
      <img
        src={data.strMealThumb}
        alt={data.strMeal}
        loading="lazy"
        className="hover:scale-105 transition-transform duration-200"
      />
      <strong className="text-xs leading-none">{data.strMeal}</strong>
    </div>
  );
};
