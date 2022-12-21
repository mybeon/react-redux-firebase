import { db } from "../../firebase";
import { setDoc, doc } from "@firebase/firestore";

const sendCartData = async ({ id, items, totalAmount }) => {
  try {
    await setDoc(doc(db, "cart", id), { items, totalAmount });
    return "success";
  } catch (e) {
    return "firebase failed " + e;
  }
};

export default sendCartData;
