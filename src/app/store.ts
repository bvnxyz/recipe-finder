import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { mealApi } from "../services/mealApi";

export const store = configureStore({
    reducer: {
        [mealApi.reducerPath]: mealApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mealApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;