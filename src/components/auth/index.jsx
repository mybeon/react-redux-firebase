import React, { useState } from "react";
import styles from "./auth.module.css";
import { FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

import Modal from "../UI/Modal";
import Register from "./Register";
import SignIn from "./SignIn";

const Auth = (props) => {
  const [tab, setTab] = useState("signIn");
  function handleTab(val) {
    setTab(val);
  }

  return (
    <Modal>
      <button className={styles.icon}>
        <FiX color="#2c0d00da" size={30} onClick={props.onModalClose} />
      </button>
      <div className={styles["tab-container"]}>
        <button onClick={handleTab.bind(null, "signIn")} className={tab === "signIn" ? styles.active : ""}>
          sign in
        </button>
        <button onClick={handleTab.bind(null, "register")} className={tab === "register" ? styles.active : ""}>
          register
        </button>
      </div>
      <AnimatePresence>{tab === "signIn" ? <SignIn close={props.onModalClose} /> : <Register close={props.onModalClose} />}</AnimatePresence>
    </Modal>
  );
};

export default Auth;
