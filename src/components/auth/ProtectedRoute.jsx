import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return <React.Fragment>{authState.user ? props.children : navigate("/")}</React.Fragment>;
};

export default ProtectedRoute;
