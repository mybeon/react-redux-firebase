import { useEffect } from "react";
import { useSelector } from "react-redux";
import sendCartData from "../../functions/cart/sendCartData";

const useUpdateCart = () => {
  const cart = useSelector((state) => state);
  useEffect(() => {
    if (!cart.isInitial) {
      sendCartData({ items: cart.items, totalAmount: cart.totalAmount }).catch((e) => {
        alert(e);
      });
    }
  }, [cart.items, cart.totalAmount, cart.isInitial]);
};

export default useUpdateCart;
