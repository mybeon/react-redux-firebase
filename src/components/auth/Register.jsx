import React, { useRef } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import Input from "../UI/Input";
import styles from "./auth.module.css";
import { motion } from "framer-motion";

const Register = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;
    try {
      const userCred = await createUserWithEmailAndPassword(auth, emailValue, passValue);
      console.log(auth.currentUser.emailVerified);
      await sendEmailVerification(userCred.user);
      alert("user created");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <motion.div transition={{ duration: 0.5 }} initial={{ opacity: 0, x: -40 }} exit={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
      <form noValidate onSubmit={handleSubmit}>
        <Input ref={emailRef} label="email" input={{ id: "email", type: "email" }} />
        <Input ref={passRef} label="password" input={{ id: "password", type: "password" }} />
        <button className={styles.button} type="submit">
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default Register;
