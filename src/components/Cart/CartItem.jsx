import React from "react";
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { add, remove } from "../../store";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const dispatch = useDispatch();

  const onAddHandler = () => {
    const item = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: 1,
    };
    dispatch(add(item));
  };
  const onRemoveHandler = () => {
    dispatch(remove(props.id));
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
