import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from 'react-redux'
import CartProductsReducer from "./cart-products/CartProductsSlice";
import authReducer from "./auth";
import { productApi } from '../services/products'
import { setupListeners } from "@reduxjs/toolkit/query";


export const makeStore = () => {
    const store = configureStore({
        reducer: {
            [productApi.reducerPath]: productApi.reducer,
            CartProducts: CartProductsReducer,
            auth: authReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productApi.middleware),
    });

    setupListeners(store.dispatch);

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
