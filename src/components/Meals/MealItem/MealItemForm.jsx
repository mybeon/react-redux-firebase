import React from "react";
import Input from "../../UI/Input";
import styles from "./mealItemForm.module.css";

const MealItemForm = (props) => {
  return (
    <form className={styles.form}>
      <Input label="Amount" input={{ id: "amount_" + props.id, type: "number", min: "0", max: "10", step: "1", defaultValue: "1" }} />
      <button>+ add</button>
    </form>
  );
};

export default MealItemForm;
