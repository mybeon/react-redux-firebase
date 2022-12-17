import React from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { useDispatch } from "react-redux";
import { hideCart } from "../../store/cart-slice";

const element = document.getElementById("overlays");

const Backdrop = (props) => {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        dispatch(hideCart());
      }}
    />
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const Modal = ({ children }) => {
  return (
    <React.Fragment>
      {createPortal(<Backdrop />, element)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, element)}
    </React.Fragment>
  );
};

export default Modal;
