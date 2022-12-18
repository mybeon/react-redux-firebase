import React from "react";
import dayjs from "dayjs";

const Table = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>date</td>
          <td>items</td>
          <td>status</td>
          <td>total amount</td>
        </tr>
      </thead>
      <tbody>
        {props.data.map((order) => {
          const totalAmount = order.items.reduce((acc, current) => acc + current.amount * current.price, 0);
          const items = order.items.map((item) => {
            return item.name;
          });
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{dayjs.unix(order.createdAt.seconds).format("DD/MM/YYYY, HH:mm:ss")}</td>
              <td>{items.join(", ")}</td>
              <td>
                <span style={{ backgroundColor: "#20BE79", color: "white", padding: "5px 10px", borderRadius: "5px" }}>
                  <strong>completed</strong>
                </span>
              </td>
              <td>${totalAmount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
