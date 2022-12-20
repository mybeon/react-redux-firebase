import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./notification.module.css";
import { removeNotification } from "../../store/auth-slice";

const element = document.getElementById("overlays");

const NotificationComponent = () => {
  const { notification } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notification) {
      const timeOut = setTimeout(() => {
        dispatch(removeNotification());
      }, 2600);

      return () => clearTimeout(timeOut);
    }
  }, [notification, dispatch]);
  return notification ? <div className={`${styles.container} ${styles[notification.type]}`}>{notification.message}</div> : <></>;
};

const Notification = () => {
  return <React.Fragment>{createPortal(<NotificationComponent />, element)}</React.Fragment>;
};

export default Notification;
