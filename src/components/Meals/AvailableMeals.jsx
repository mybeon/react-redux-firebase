import React, { useEffect, useState } from "react";
import styles from "./availableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const AvailableMeals = () => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    getDocs(collection(db, "meals"))
      .then((snap) => {
        const result = [];
        snap.forEach((doc) => {
          const docObject = {
            id: doc.id,
            ...doc.data(),
          };
          result.push(docObject);
        });
        setIsLoading(false);
        setData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <section className={styles.meals}>
      <Link to="/orders" className={styles.button}>
        Orders
      </Link>
      <Card>
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        <ul>
          {data.map((meal) => (
            <MealItem key={meal.id} {...meal} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
