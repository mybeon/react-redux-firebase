import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { logout, login } from "../../store/auth-slice";
import { reset } from "../../store/cart-slice";

const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({ email: authUser.email, isVerified: authUser.emailVerified, uid: authUser.uid, name: authUser.displayName }));
      } else {
        dispatch(logout());
        dispatch(reset());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuth;
