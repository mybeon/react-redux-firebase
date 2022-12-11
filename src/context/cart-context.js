import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  items: [],
  totalAmount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const updateItems = [...state.items, action.item];
      const updateAmount = state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updateItems,
        totalAmount: updateAmount,
      };
    case "REMOVE":
      return;
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};
