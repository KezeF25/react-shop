import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";

export type CartItem = {
  id: string;
  imgURL: string;
  title: string;
  price: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalItems: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalItems: 0,
  totalPrice: 0,
  items: GetCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;
        if (findItem.count === 0) {
          state.items = state.items.filter(
            (obj) => obj.id !== action.payload.id
          );
        }
      }
    },
    deleteItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
    },
    clearItems(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, deleteItem } =
  cartSlice.actions;

export default cartSlice.reducer;
