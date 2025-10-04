# RecipeFinder

Search meals from **TheMealDB** with a clean **React + TypeScript** UI, **Redux Toolkit (RTK Query)** data layer, and **TailwindCSS** styling.  
When the search is empty, the app shows a handful of random meals; typing a query (≥ 3 chars) fetches and shows matching meals. Clicking a meal opens a details modal (via React Portal).

## Tech Stack

- **React** + **TypeScript**
- **Redux Toolkit** + **RTK Query**
- **TailwindCSS**
- **Vite**

## Features (MVP)

- **Empty search state** → show ~8 random meals (`random.php`)
- **Search by name** → `search.php?s=<query>` (debounced in UI; triggers when `query.length >= 3`)
- **Responsive grid** → `grid-cols-1/2/3/4` with gaps
- **Skeleton loading** for cards
- **Meal details modal** (React Portal)
  - Fetches full meal by id: `lookup.php?i=<id>`
  - ESC to close, backdrop click to close, initial focus, body scroll lock

## API (TheMealDB)

- **Search by name**: `GET /search.php?s=<query>`
- **Random meal**: `GET /random.php` (used multiple times to build an initial set)
- **Lookup by ID**: `GET /lookup.php?i=<id>`

> Base URL is configurable via env: `https://www.themealdb.com/api/json/v1/1`

## Project Structure

```text
src/
app/ # Redux store setup
components/ # UI components (SearchBar, MealCard, MealList, Modal, Loader...)
lib/ # types, small utils (e.g., debounce)
pages/ # Home, (planned) Favorites
services/ # RTK Query API (mealApi)
```

## State & Data Flow

- **RTK Query** drives data fetching and caching:
  - `mealApi.searchMeals(query)` → transforms `meals: null` to `[]`
  - `mealApi.getRandomMeals()` → runs several `random.php` calls, dedupes by `idMeal`
  - `mealApi.getMealById(id)` → used by the modal
- **Container pattern**:
  - `Home` owns `query` and decides which hook to call (`random` vs `search`)
  - `MealList` is presentational and renders `meals` + `loading`
  - `MealCard` is clickable and opens the modal (doesn’t fetch itself)

## Environment

Create a `.env` (or `.env.local`) at the project root:

```env
VITE_MEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

## Getting started

- npm install
- npm run dev
- npm build
- npm preview

## TO DO

- **Add favourites functionality**
  - Heart icon on each card (outline vs filled)
  - Persist favourites in localStorage via a small Redux slice and selectors
  - A Favorites page/section showing saved items
- **Add tests**
  - Unit tests (components, selectors, reducers) with Vitest + @testing-library/react
  - Integration tests for search→list and modal open/close flows
- **Add a simple CI/CD YAML file**
  - GitHub Actions workflow to install deps, cache, build, and run tests on PRs

