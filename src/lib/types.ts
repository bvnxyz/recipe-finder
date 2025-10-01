export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export type MealDetail = Meal & {
    strInstructions?: string;
    strCategory?: string;
    strArea?: string;
}