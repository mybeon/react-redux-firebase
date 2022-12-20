import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { addNotification } from "../../store/auth-slice";

const ProtectedRoute = (props) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authState.user) {
      dispatch(addNotification({ type: "error", message: "unauthorized" }));
    }
  }, [authState.user, dispatch]);

  return authState.user ? <React.Fragment>{props.children}</React.Fragment> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
