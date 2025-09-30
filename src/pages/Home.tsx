import { useState } from "react";
import { Header } from "../components/Header.tsx";
import { SearchBar } from "../components/SearchBar.tsx";
import { MealList } from "../components/MealList.tsx";
import { Layout } from "../components/Layout.tsx";
import {
  useGetRandomMealsQuery,
  useSearchMealsQuery,
} from "../services/mealApi.ts";

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const showRandom = query.length < 2;

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
      <MealList meals={meals} loading={loading} />
    </Layout>
  );
};

export default Home;
