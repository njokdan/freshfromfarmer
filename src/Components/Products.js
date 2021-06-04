import React, { useEffect, useState } from "react";
import AppNavbar from "./Navbar";
import Footer from "./Footer";
import db from "../Firebase";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  ListItem,
  Select,
} from "@material-ui/core";


function Products(props) {
  const [items, setItems] = useState();
  const [state, setState] = useState({});

  const fetchItems = async () => {
    const response = db.firestore().collection("items");
    const data = await response.get();

    let arr = [];

    data.docs.forEach((item) => {
      arr.push(item.data());
    });

    setItems(arr);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState({
      ...state,
      [name]: value,
    })
  }

  const book = (name) => {
    let plan = state.plan;

    console.log(name, plan)
  }

  return (
    <div>
      <AppNavbar />
      <div className="main">
        <h2 className="text-center">Our Products</h2>
        {items === undefined && (
          <div className="text-center" style={{ padding: "70px" }}>
            <CircularProgress size="4rem" color="primary" />
          </div>
        )}
        {items !== undefined && items.length === 0 && (
          <div className="text-center" style={{ padding: "70px" }}>
            <h4>No Data</h4>
          </div>
        )}
        <Box>
          <Grid container spacing={3} style={{ margin: "30px" }}>
            {items !== undefined &&
              items.length !== 0 &&
              items.map((item) => {
                return (
                  <Grid item md={3}>
                    <Card
                      className="text-center item-card"
                      key={item.name}
                    >
                      <img
                        src={item.itemImage}
                        className="img-fluid"
                      />

                      <h4>{item.name}</h4>
                      <h5>{item.description}</h5>
                      <p>{item.details}</p>
                      <Select fullWidth defaultValue="choose" name="plan" onChange={handleChange}>
                      <ListItem value="choose" disabled>Choose</ListItem>
                        <ListItem value="monthly">Monthly</ListItem>
                        <ListItem value="alternative">Alternative</ListItem>
                        <ListItem value="weekly">Weekly</ListItem>
                        <ListItem value="tommorow">Book for tommorow</ListItem>
                      </Select>
                      <h4>{item.price}/- Rs</h4>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => book(item.name)}
                      >
                        Book
                      </Button>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
