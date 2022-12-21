import React, { useState } from "react";
import Modal from "../UI/Modal";
import styles from "./cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { reset, hideCart } from "../../store/cart-slice";
import { addNotification } from "../../store/auth-slice";

const Cart = (props) => {
  const [userName, setUserName] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartState = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const emptyCart = cartState.items.length === 0;

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  function handleOrder(userInfo) {
    setIsSubmitting(true);
    if (user) {
      setUserName(userInfo.name);
      addDoc(collection(db, "orders"), {
        items: cartState.items,
        user: userInfo,
        userId: user.uid,
        createdAt: Timestamp.fromDate(new Date()),
      })
        .then(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          dispatch(reset());
        })
        .catch(() => {});
    } else {
      setIsSubmitting(false);
      dispatch(addNotification({ type: "error", message: "You have to be signed in." }));
    }
  }

  const cartActions = (
    <div className={styles.actions}>
      <button
        className={styles["button--alt"]}
        onClick={() => {
          dispatch(hideCart());
        }}
      >
        Close
      </button>
      {!emptyCart && (
        <button className={styles.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  if (isSubmitting) {
    return (
      <Modal onBackdropClick={props.onHideCart}>
        <p style={{ textAlign: "center" }}>Processing your order ...</p>
      </Modal>
    );
  }
  if (isSubmitted) {
    return (
      <Modal onBackdropClick={props.onHideCart}>
        <p style={{ textAlign: "center" }}>Thank you, {userName}.</p>
        <p style={{ textAlign: "center" }}>Your order has been successfully sent !</p>
      </Modal>
    );
  }

  return (
    <Modal>
      <ul className={styles["cart-items"]}>
        {cartState.items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${cartState.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && <Checkout onSubmit={handleOrder} />}
      {!isCheckout && cartActions}
    </Modal>
  );
};

export default Cart;
