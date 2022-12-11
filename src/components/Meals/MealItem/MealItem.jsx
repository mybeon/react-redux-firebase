import React, { useContext } from "react";
import styles from "./mealItem.module.css";
import MealItemForm from "./MealItemForm";
import { CartContext } from "../../../context/cart-context";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const { dispatch } = useContext(CartContext);
  const addToCartHandler = (amount) => {
    const item = {
      id: props.id,
      name: props.name,
      amount,
      price: props.price,
    };
    dispatch({ type: "ADD", item });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
