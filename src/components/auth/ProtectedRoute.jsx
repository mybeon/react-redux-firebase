import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../../store/auth-slice";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        dispatch(addNotification({ type: "error", message: "You should be logged in." }));
        navigate("/", { replace: true });
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <BeatLoader size={30} color="black" />
      </div>
    );
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ProtectedRoute;
