import { useState } from "react";
import { Header } from "../components/Header.tsx";
import { SearchBar } from "../components/SearchBar.tsx";
import { MealList } from "../components/MealList.tsx";
import { Layout } from "../components/Layout.tsx";
import { Modal } from "../components/Modal.tsx";
import {
  useGetRandomMealsQuery,
  useSearchMealsQuery,
  useGetMealByIdQuery,
} from "../services/mealApi.ts";

const Home = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const showRandom = query.length < 2;

  const { data: meal, isLoading: isMealLoading } = useGetMealByIdQuery(
    selectedId!,
    {
      skip: !selectedId,
    }
  );

  const {
    data: searchMeals = [],
    isLoading: loadingSearch,
    isFetching: fetchingSearch,
  } = useSearchMealsQuery(query.trim(), {
    skip: query.length < 3,
  });

  const {
    data: randomMeals = [],
    isLoading: loadingRandom,
    isFetching: fetchingRandom,
  } = useGetRandomMealsQuery();

  const meals = query.length >= 3 ? searchMeals : randomMeals;
  const loading = showRandom
    ? loadingRandom || fetchingRandom
    : loadingSearch || fetchingSearch;

  return (
    <Layout>
      <Header />
      <SearchBar query={query} setQuery={setQuery} />
      <MealList
        meals={meals}
        loading={loading}
        onSelect={(id) => setSelectedId(id)}
      />
      <Modal
        meal={meal}
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        title={meal?.strMeal ?? "Meal details"}
        isLoading={isMealLoading}
      />
    </Layout>
  );
};

export default Home;
