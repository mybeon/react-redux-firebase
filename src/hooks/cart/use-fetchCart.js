import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { setCart } from "../../store/cart-slice";

const useFetchCart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "cart", user.uid);
      getDoc(docRef)
        .then((res) => {
          if (res.exists()) {
            dispatch(setCart(res.data()));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [dispatch, user]);
};

export default useFetchCart;
