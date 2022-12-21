import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import Input from "../UI/Input";
import styles from "./auth.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addNotification, setUsername } from "../../store/auth-slice";
import { BeatLoader } from "react-spinners";

const Register = (props) => {
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const userNameValue = userNameRef.current.value;
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;
    try {
      const userCred = await createUserWithEmailAndPassword(auth, emailValue, passValue);
      await updateProfile(userCred.user, { displayName: userNameValue });
      await sendEmailVerification(userCred.user);
      dispatch(setUsername(userNameValue));
      dispatch(addNotification({ type: "success", message: "successfully registered." }));
      props.close();
    } catch (e) {
      setLoading(false);
      setError("invalid email/short password (minimum 8)");
    }
  };
  return (
    <motion.div transition={{ duration: 0.5 }} initial={{ opacity: 0, x: -40 }} exit={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 20 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.error}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
      <form noValidate onSubmit={handleSubmit}>
        <Input ref={userNameRef} label="username" input={{ id: "username", type: "text" }} />
        <Input ref={emailRef} label="email" input={{ id: "email", type: "email" }} />
        <Input ref={passRef} label="password" input={{ id: "password", type: "password" }} />
        <button className={styles.button} type="submit">
          {loading ? <BeatLoader color="white" size={10} /> : "Register"}
        </button>
      </form>
    </motion.div>
  );
};

export default Register;
