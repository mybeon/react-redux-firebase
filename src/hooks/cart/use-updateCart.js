import { useEffect } from "react";
import { useSelector } from "react-redux";
import sendCartData from "../../functions/cart/sendCartData";

const useUpdateCart = () => {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!cart.isInitial) {
      if (user) {
        sendCartData({ id: user.uid, items: cart.items, totalAmount: cart.totalAmount }).catch((e) => {
          alert(e);
        });
      }
    }
  }, [cart.items, cart.totalAmount, cart.isInitial, user]);
};

export default useUpdateCart;
