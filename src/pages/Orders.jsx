import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { BeatLoader } from "react-spinners";
import Table from "../components/Table";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const collRef = collection(db, "orders");
    const q = query(collRef, where("userId", "==", user.uid));
    getDocs(q)
      .then((res) => {
        const documents = [];
        res.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }));
        setOrders(documents);
      })
      .catch((e) => {
        alert(e);
      });
  }, [user?.uid]);
  let tableContent;
  if (orders === null) {
    tableContent = (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "65%", margin: "5rem auto 0 auto" }}>
        <BeatLoader />
      </div>
    );
  }
  if (orders && orders.length > 0) {
    tableContent = <Table data={orders} />;
  }
  if (orders && orders.length === 0) {
    tableContent = (
      <div className="no-orders">
        <p>You have no orders yet.</p>
        <Link to="/">Make your first order !</Link>
      </div>
    );
  }
  return (
    <ProtectedRoute>
      <section className="summary">
        <h2>Your orders. See your last orders !</h2>
        <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
        <p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!</p>
      </section>
      {tableContent}
    </ProtectedRoute>
  );
};

export default Orders;
