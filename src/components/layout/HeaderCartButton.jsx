import React, { useContext } from "react";
import CartIcon from "./Cart/CartIcon";
import styles from "./headerCartButton.module.css";
import { CartContext } from "../../context/cart-context";

const HeaderCartButton = (props) => {
  const { state } = useContext(CartContext);
  const cartItemNumber = state.items.reduce((acc, currentItem) => {
    return acc + currentItem.amount;
  }, 0);

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{cartItemNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
