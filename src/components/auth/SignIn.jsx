import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import styles from "./auth.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

const SignIn = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;
    try {
      await signInWithEmailAndPassword(auth, emailValue, passValue);
      props.close();
    } catch (e) {
      setLoading(false);
      setError("invalid email/password");
    }
  };
  return (
    <motion.div initial={{ opacity: 0, x: -40 }} exit={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
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
        <Input ref={emailRef} label="email" input={{ id: "email", type: "email" }} />
        <Input ref={passRef} label="password" input={{ id: "password", type: "password" }} />
        <div className={styles["remember-me"]}>
          <input type="checkbox" />
          <span>Remember me</span>
        </div>
        <button className={styles.button} type="submit">
          {loading ? <BeatLoader color="white" size={10} /> : "Sign In"}
        </button>
      </form>
    </motion.div>
  );
};

export default SignIn;
