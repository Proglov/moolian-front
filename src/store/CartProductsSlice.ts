import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadCartState } from "@/store/LocalStorage";
import { IProduct } from "@/types/product.type";
import { RootState } from "./store";

export interface ICartProductItem extends Pick<IProduct, "_id"> {
  volume: number;
  number: number;
};
const initialState: ICartProductItem[] = loadCartState();

type CartProductPayload = { _id: string; volume: number };

export const CartProductsSlice = createSlice({
  name: "CartProducts",
  initialState,
  reducers: {
    IncrementCart: (state, action: PayloadAction<CartProductPayload>) => {
      const idx = state.findIndex(
        item => item._id === action.payload._id && item.volume === action.payload.volume
      );
      if (idx >= 0) {
        state[idx].number += 1;
      } else {
        state.push({ _id: action.payload._id, volume: action.payload.volume, number: 1 });
      }
    },
    DecrementCart: (state, action: PayloadAction<CartProductPayload>) => {
      const idx = state.findIndex(
        item => item._id === action.payload._id && item.volume === action.payload.volume
      );
      if (idx >= 0) {
        if (state[idx].number === 1) {
          state.splice(idx, 1);
        } else {
          state[idx].number -= 1;
        }
      }
    },
    ResetCartProducts: () => []
  },
});

export const { IncrementCart, DecrementCart, ResetCartProducts } = CartProductsSlice.actions;

export default CartProductsSlice.reducer;

export const selectCartTotalQuantity = (state: RootState) =>
  state.CartProducts.reduce((sum, item) => sum + item.number, 0);

export const selectCartProduct = (state: RootState, _id: string, volume: number): ICartProductItem | undefined =>
  state.CartProducts.find(item => item._id === _id && item.volume === volume);
