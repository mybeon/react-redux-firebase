import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./cart.module.css";
import { CartContext } from "../../context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Cart = (props) => {
  const [userName, setUserName] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { state, dispatch } = useContext(CartContext);
  const emptyCart = state.items.length === 0;

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  function handleOrder(userInfo) {
    setIsSubmitting(true);
    setUserName(userInfo.name);

    addDoc(collection(db, "orders"), {
      items: state.items,
      user: userInfo,
      createdAt: Timestamp.fromDate(new Date()),
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        dispatch({ type: "RESET" });
      })
      .catch(() => {});
  }

  const cartActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
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
    <Modal onBackdropClick={props.onHideCart}>
      <ul className={styles["cart-items"]}>
        {state.items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${state.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHideCart} onSubmit={handleOrder} />}
      {!isCheckout && cartActions}
    </Modal>
  );
};

export default Cart;
