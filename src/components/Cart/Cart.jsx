import React, { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./cart.module.css";
import { CartContext } from "../../context/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { state } = useContext(CartContext);
  const emptyCart = state.items.length === 0;
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
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {!emptyCart && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
