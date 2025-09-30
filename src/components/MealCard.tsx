import type { Meal } from "./../lib/types";

type MealCardProps = { data: Meal };

export const MealCard = ({ data }: MealCardProps) => {
  return (
    <div>
      <img src={data.strMealThumb} alt={data.strMeal} loading="lazy" />
      <strong className="text-xs leading-none">{data.strMeal}</strong>
    </div>
  );
};
