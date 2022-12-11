import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./headerCartButton.module.css";
import { CartContext } from "../../context/cart-context";

const HeaderCartButton = (props) => {
  const {
    state: { items },
  } = useContext(CartContext);
  const [animeBtn, setAnimeBtn] = useState(false);
  const cartItemNumber = items.reduce((acc, currentItem) => {
    return acc + currentItem.amount;
  }, 0);

  const btnClasses = `${styles.button} ${animeBtn ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setAnimeBtn(true);
    const timer = setTimeout(() => {
      setAnimeBtn(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{cartItemNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
