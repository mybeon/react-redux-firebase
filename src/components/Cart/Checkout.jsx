import React, { useRef, useState } from "react";
import styles from "./checkout.module.css";
import { useDispatch } from "react-redux";
import { hideCart } from "../../store/cart-slice";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const addressRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const [validForm, setValidForm] = useState(true);

  function validateString(...values) {
    let validString = true;
    values.forEach((value) => {
      if (value.trim() === "") {
        validString = false;
      }
    });
    return validString;
  }

  function validateNumber(value) {
    setValidForm(true);
    let validNumber = false;
    if (typeof value === "number" && value <= 99999) {
      validNumber = true;
    }
    return validNumber;
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const postal = +postalRef.current.value;
    const city = cityRef.current.value;
    const isValid = validateString(name, address, city);
    const isNumberValid = validateNumber(postal);

    if (isValid && isNumberValid) {
      props.onSubmit({ name, address, postal, city });
    } else {
      setValidForm(false);
    }
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      {!validForm && <p style={{ fontSize: "12px", color: "red" }}>Form not valid. Please enter correct values.</p>}
      <div className={styles.control}>
        <label htmlFor="name">name</label>
        <input ref={nameRef} id="name" type="text" />
      </div>
      <div className={styles.control}>
        <label htmlFor="address">address</label>
        <input ref={addressRef} id="address" type="text" />
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">postal code</label>
        <input ref={postalRef} type="text" id="postal" />
      </div>
      <div className={styles.control}>
        <label htmlFor="city">city</label>
        <input ref={cityRef} type="text" id="city" />
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => {
            dispatch(hideCart());
          }}
        >
          cancel
        </button>
        <button className={styles.submit}>submit</button>
      </div>
    </form>
  );
};

export default Checkout;
