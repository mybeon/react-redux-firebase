import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { setCart } from "../../store/cart-slice";

const useFetchCart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      const docRef = doc(db, "cart", cartId);
      getDoc(docRef)
        .then((res) => {
          dispatch(setCart(res.data()));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [dispatch]);
};

export default useFetchCart;
