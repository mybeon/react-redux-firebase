import React from "react";
import mainImage from "../../assets/meals.jpg";
import styles from "./header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={mainImage} alt="react meals" />
      </div>
    </React.Fragment>
  );
};

export default Header;
