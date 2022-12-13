import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    add(state, action) {
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      const existingCartItem = state.items[existingCartItemIndex];
      let updateItems;
      let updateAmount;
      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updateItems = [...state.items];
        updateItems[existingCartItemIndex] = updateItem;
        updateAmount = state.totalAmount + action.payload.price * action.payload.amount;
      } else {
        updateItems = [...state.items, action.payload];
        updateAmount = state.totalAmount + action.payload.price * action.payload.amount;
      }
      state.items = updateItems;
      state.totalAmount = updateAmount;
    },
    remove(state, action) {
      let updateRemoveItems;
      let updateRemoveAmount;
      const removeItemIndex = state.items.findIndex((item) => item.id === action.payload);
      const removeItem = state.items[removeItemIndex];
      if (removeItem.amount > 1) {
        const updateItem = {
          ...removeItem,
          amount: removeItem.amount - 1,
        };
        updateRemoveItems = [...state.items];
        updateRemoveItems[removeItemIndex] = updateItem;
        updateRemoveAmount = state.totalAmount - updateItem.price;
      } else {
        updateRemoveItems = state.items.filter((item) => item.id !== action.payload);
        updateRemoveAmount = state.totalAmount.toFixed(2) - removeItem.price;
      }
      state.items = updateRemoveItems;
      state.totalAmount = updateRemoveAmount;
    },
    reset(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { add, remove, reset } = cartSlice.actions;

const store = configureStore({ reducer: cartSlice.reducer });
export default store;
