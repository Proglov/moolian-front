import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadCartState } from "@/store/LocalStorage";
import { IProduct } from "@/types/product.type";


export type CartProduct = Pick<IProduct, "_id"> & {
  number: number;
};
const initialState: CartProduct[] = loadCartState();

export const CartProductsSlice = createSlice({
  name: "CartProducts",
  initialState,
  reducers: {
    IncrementCart: (state, action: PayloadAction<string>) => {
      const idx = state.findIndex(item => item._id === action.payload);
      if (idx >= 0) {
        state[idx].number += 1;
      } else {
        state.push({ _id: action.payload, number: 1 });
      }
    },
    DecrementCart: (state, action: PayloadAction<string>) => {
      const idx = state.findIndex(item => item._id === action.payload);
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