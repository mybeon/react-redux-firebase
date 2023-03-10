import React from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/layout/Header";
import { useSelector } from "react-redux";
import "./main.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Notification from "./components/UI/Notification";
import useUpdateCart from "./hooks/cart/use-updateCart";
import useFetchCart from "./hooks/cart/use-fetchCart";
import useAuth from "./hooks/auth/use-auth";

function App() {
  const { cartIsShown } = useSelector((state) => state.cart);
  useAuth();
  useUpdateCart();
  useFetchCart();

  return (
    <React.Fragment>
      {cartIsShown && <Cart />}
      <Notification />
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </React.Fragment>
  );
}

export default App;
