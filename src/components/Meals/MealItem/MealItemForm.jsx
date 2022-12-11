import React, { useRef } from "react";
import Input from "../../UI/Input";
import styles from "./mealItemForm.module.css";

const MealItemForm = (props) => {
  const itemAmountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = +itemAmountRef.current.value;
    if (typeof enteredAmount === "number" && enteredAmount > 0 && enteredAmount < 6) {
      props.onAddToCart(enteredAmount);
    }
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={itemAmountRef}
        label="Amount"
        input={{ id: "amount_" + props.id, type: "number", min: "0", max: "10", step: "1", defaultValue: "1" }}
      />
      <button type="submit">+ add</button>
    </form>
  );
};

export default MealItemForm;
