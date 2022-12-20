import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Cart from "./components/Cart/Cart";
import Header from "./components/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/auth-slice";
import "./main.css";
import useUpdateCart from "./hooks/cart/use-updateCart";
import useFetchCart from "./hooks/cart/use-fetchCart";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Notification from "./components/UI/Notification";
function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useUpdateCart();
  useFetchCart();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({ email: authUser.email, isVerified: authUser.emailVerified }));
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <React.Fragment>
      {cart.cartIsShown && <Cart />}
      <Notification />
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </React.Fragment>
  );
}

export default App;
