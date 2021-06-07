import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Button as Btn } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import db from "../../Firebase";
import AppNavbar from "../Navbar";
import Sidebar from "./Sidebar";

function Orders(props) {
  const [orders, setOrders] = useState();

  const fetchOrders = async () => {
    const response = db.firestore().collection("orders");

    response.onSnapshot((docSnapshot) => {
      let arr = [];

      docSnapshot.forEach((item) => {
        arr.push({ ...item.data(), "orderId": item.id });
      });

      setOrders(arr);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const setDates = async (order, startDate, val, inc, index) => {
    var date = new Date(startDate);
    date.setDate(date.getDate() + 1);

    for (let i = 0; i < val; i += inc) {
      date.setDate(date.getDate() + inc);
      var temp = order.time + date.toLocaleDateString().replaceAll("/", "-").toString();


      var a = await db
        .firestore()
        .collection("supply")
        .doc(temp)
        .collection(order.customer)
        .doc(order.item)
        .get()
        .then((doc) => {
          if (doc.data() !== undefined) {
            console.log(doc.data() ? doc.data() : 0)
            db.firestore()
              .collection("supply")
              .doc(temp)
              .collection(order.customer)
              .doc(order.item)
              .update({
                "quantity":
                  (doc.data() ? parseInt(doc.data().quantity) : 0) +
                  parseInt(order.quantity),
              });
          } else {
            db.firestore()
              .collection("supply")
              .doc(temp)
              .set({"datetime": temp});
            db.firestore()
              .collection("supply")
              .doc(temp)
              .collection(order.customer)
              .doc(order.item)
              .set({
                quantity: parseInt(order.quantity),
                phone: order.customer,
                item: order.item,
              });
          }
        });
    }

    // deleteOrder(index)
  };
  const approve = (index) => {
    if (window.confirm("Are you sure to approve this order?")) {
      var order = orders[index];

      if (order.plan === "monthly") {
        setDates(order, order.date, 5, 1, index);
      } else if (order.plan === "alternative") {
        setDates(order, order.date, 5, 2, index);
      } else if (order.plan === "weekly") {
        setDates(order, order.date, 2, 1, index);
      } else if (order.plan === "tommorow") {
        setDates(order, order.date, 1, 1, index);
      }
    }
  };

  const deleteOrder = (index) => {
    if (window.confirm("Are you sure to delete this order?")) {
      db.firestore().collection("orders").doc(orders[index].orderId).delete();
    }
  };
  return (
    <div>
      <AppNavbar />
      <Sidebar />
      <div className="content">
        <h2 className="text-center">Orders</h2>
        <Table>
          <TableHead>
            <TableCell>Customer</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Plan</TableCell>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((order, index) => (
                <TableRow>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>
                    {order.quantity ? order.quantity : (order.quantity = 1)}
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>{order.plan}</TableCell>
                  <TableCell>
                    <Btn variant="success" onClick={() => approve(index)}>
                      Approve
                    </Btn>
                  </TableCell>
                  <TableCell>
                    <Btn variant="danger" onClick={() => deleteOrder(index)}>
                      Delete
                    </Btn>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      
    </div>
  );
}

export default Orders;
