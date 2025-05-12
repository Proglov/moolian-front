import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from 'react-redux'
import CartProductsReducer from "./CartProductsSlice";
import authReducer from "./auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@/services/baseApi";


export const makeStore = () => {
    const store = configureStore({
        reducer: {
            [baseApi.reducerPath]: baseApi.reducer,
            CartProducts: CartProductsReducer,
            auth: authReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baseApi.middleware),
    });

    setupListeners(store.dispatch);

    // Sync CartProducts to localStorage on any state change
    if (typeof window !== "undefined") {
        store.subscribe(() => {
            const state = store.getState();
            localStorage.setItem("cart", JSON.stringify(state.CartProducts));
        });
    }

    return store;
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
