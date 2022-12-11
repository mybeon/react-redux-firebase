import React, { useContext } from "react";
import classes from "./CartItem.module.css";
import { CartContext } from "../../context/cart-context";

const CartItem = (props) => {
  const { dispatch } = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const onAddHandler = () => {
    const item = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: 1,
    };
    dispatch({ type: "ADD", item });
  };
  const onRemoveHandler = () => {
    dispatch({ type: "REMOVE", id: props.id });
  };
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemoveHandler}>−</button>
        <button onClick={onAddHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
