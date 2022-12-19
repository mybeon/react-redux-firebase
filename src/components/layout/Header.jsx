import React, { useState } from "react";
import mainImage from "../../assets/meals.jpg";
import styles from "./header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useDispatch } from "react-redux";
import { showCart } from "../../store/cart-slice";
import Auth from "../auth/index";

const Header = (props) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  function closeModal() {
    setIsModalVisible(false);
  }
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <div className={styles["btn-container"]}>
          <button className={styles.button} onClick={() => setIsModalVisible(true)}>
            <span>Login</span>
          </button>
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
