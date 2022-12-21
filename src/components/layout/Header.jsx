import React, { useState } from "react";
import mainImage from "../../assets/meals.jpg";
import styles from "./header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../../store/cart-slice";
import { addNotification } from "../../store/auth-slice";
import Auth from "../auth/index";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { BsFillPersonFill } from "react-icons/bs";

const Header = (props) => {
  let button;
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  function closeModal() {
    setIsModalVisible(false);
  }

  function onLogout() {
    signOut(auth).then(() => {
      dispatch(addNotification({ type: "success", message: "Logged out." }));
    });
  }

  if (authState.user) {
    button = (
      <React.Fragment>
        <div className={styles.welcome}>
          <BsFillPersonFill />
          <span>Welcome back, {authState.user.name}</span>
        </div>
        <button className={styles.button} onClick={onLogout}>
          <span>Logout</span>
        </button>
      </React.Fragment>
    );
  } else {
    button = (
      <button className={styles.button} onClick={() => setIsModalVisible(true)}>
        <span>Login</span>
      </button>
    );
  }

  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <div className={styles["btn-container"]}>
          {button}
          <HeaderCartButton
            onClick={() => {
              dispatch(showCart());
            }}
          />
          {isModalVisible && <Auth onModalClose={closeModal} />}
        </div>
      </header>
      <div className={styles["main-image"]}>
        <img src={mainImage} alt="react meals" />
      </div>
    </React.Fragment>
  );
};

export default Header;
