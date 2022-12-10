import React from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

const element = document.getElementById("overlays");

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const Modal = ({ children, onBackdropClick }) => {
  return (
    <React.Fragment>
      {createPortal(<Backdrop onClick={onBackdropClick} />, element)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, element)}
    </React.Fragment>
  );
};

export default Modal;
