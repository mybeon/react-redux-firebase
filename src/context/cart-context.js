import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  items: [],
  totalAmount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
      const existingCartItem = state.items[existingCartItemIndex];
      let updateItems;
      let updateAmount;
      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updateItems = [...state.items];
        updateItems[existingCartItemIndex] = updateItem;
        updateAmount = state.totalAmount + action.item.price * action.item.amount;
      } else {
        updateItems = [...state.items, action.item];
        updateAmount = state.totalAmount + action.item.price * action.item.amount;
      }
      return {
        items: updateItems,
        totalAmount: updateAmount,
      };
    case "REMOVE":
      let updateRemoveItems;
      let updateRemoveAmount;
      const removeItemIndex = state.items.findIndex((item) => item.id === action.id);
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
        updateRemoveItems = state.items.filter((item) => item.id !== action.id);
        updateRemoveAmount = state.totalAmount.toFixed(2) - removeItem.price;
      }
      return {
        items: updateRemoveItems,
        totalAmount: updateRemoveAmount,
      };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};
