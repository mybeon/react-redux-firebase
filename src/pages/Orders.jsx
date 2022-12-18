import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { BeatLoader } from "react-spinners";
import Table from "../components/Table";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    getDocs(collection(db, "orders"))
      .then((res) => {
        const documents = [];
        res.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }));
        setOrders(documents);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);
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
  return (
    <React.Fragment>
      <section className="summary">
        <h2>Your orders. See your last orders !</h2>
        <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
        <p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!</p>
      </section>
      {tableContent}
    </React.Fragment>
  );
};

export default Orders;
