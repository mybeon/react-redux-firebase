import { db } from "../../firebase";
import { setDoc, doc } from "@firebase/firestore";
import getCartId from "./getCartId";

const sendCartData = async ({ items, totalAmount }) => {
  try {
    const cartId = getCartId();
    await setDoc(doc(db, "cart", cartId), { items, totalAmount });
    return "success";
  } catch (e) {
    return "firebase failed " + e;
  }
};

export default sendCartData;
