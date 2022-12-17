import React from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/layout/Header";
import { useSelector } from "react-redux";
import "./main.css";
import useUpdateCart from "./hooks/cart/use-updateCart";
import useFetchCart from "./hooks/cart/use-fetchCart";
import { RouterProvider } from "react-router-dom";
import router from "./router";
function App() {
  const cart = useSelector((state) => state);
  useUpdateCart();
  useFetchCart();

  return (
    <React.Fragment>
      {cart.cartIsShown && <Cart />}
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </React.Fragment>
  );
}

export default App;
