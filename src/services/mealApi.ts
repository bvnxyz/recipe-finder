import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Meal } from "../lib/types";

const BASE_URL = import.meta.env.VITE_MEAL_API_URL ?? 'https://www.themealdb.com/api/json/v1/1';

type SearchResponse = { meals: Meal[] | null };

export const mealApi = createApi({
    reducerPath: "mealApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    keepUnusedDataFor: 60, // cache 1 min
    refetchOnFocus: false,
    refetchOnReconnect: false,
    tagTypes: [],
    endpoints: (builder) => ({
        searchMeals: builder.query<Meal[], string>({
            query: (q) => `search.php?s=${encodeURIComponent(q)}`,
            transformResponse: (res: SearchResponse) => res.meals || [],
        }),
        getRandomMeals: builder.query<Meal[], void>({
            async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
                const requests = Array.from({ length: 8}, () => baseQuery('random.php'));
                const results = await Promise.all(requests);

                const all: Meal[] = results.map(r => (r.data as { meals: Meal[] | undefined })?.meals?.[0]).filter(Boolean) as Meal[];

                // Deduplicate by idMeal
                const seen = new Set<string>();
                const deduped = all.filter(m => (seen.has(m.idMeal) ? false : (seen.add(m.idMeal), true)));

                return { data: deduped }
            }
        })
    })
})

export const { useSearchMealsQuery, useGetRandomMealsQuery } = mealApi;