import React, { useEffect, useState } from "react";
import AppNavbar from "./Navbar";
import Footer from "./Footer";
import db from "../Firebase";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControlLabel,
  Grid,
  ListItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import Login from "./Login";

function Products(props) {
  const [items, setItems] = useState();
  const [state, setState] = useState({});
  const [showLogin, setShowLogin] = useState(false);

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
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const book = (name) => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      alert("Please login to order this!!");
      setShowLogin(true);
    } else if (state.plan === undefined) alert("Please select a plan");
    else if (state.time === undefined) alert("Please select a time");
    else {
      var order = {
        customer: user.userId,
        name: user.userName,
        plan: state.plan,
        item: name,
        quantity: state.quantity ? state.quantity : 1,
        time: state.time,
        date: new Date().toLocaleString(),
        approved: "false",
      };
    
      // TODO: Integrate payment
      if (
        window.confirm(
          `Are you sure to book order for ${name} for ${state.plan} plan?`
        )
      )
        db.firestore()
          .collection("orders")
          .add(order)
          .then(() => {
            "Ordered successfully";
            window.location.reload();
          });
    }
  };

  return (
    <div>
      <AppNavbar />
      {showLogin && (
        <Login
          setLogin={() => {
            setShowLogin(false);
          }}
        />
      )}
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
                    <Card className="text-center item-card" key={item}>
                      <img
                        src={item.itemImage}
                        alt={item.name}
                        key={item.itemImage}
                        className="img-fluid"
                      />

                      <h4 key={item.name}>{item.name}</h4>
                      <h5 key={item.description}>{item.description}</h5>
                      <p key={item.details}>{item.details}</p>

                      <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        name="quantity"
                        onChange={handleChange}
                      />
                      <br />
                      <br />
                      <Select
                        fullWidth
                        defaultValue="choose"
                        name="plan"
                        onChange={handleChange}
                        key="select"
                      >
                        <ListItem value="choose" key="choose" disabled>
                          Choose
                        </ListItem>
                        <ListItem value="monthly" key="monthly">
                          Monthly
                        </ListItem>
                        <ListItem value="alternative" key="alternative">
                          Alternative
                        </ListItem>
                        <ListItem value="weekly" key="weekly">
                          Weekly
                        </ListItem>
                        <ListItem value="tommorow" key="tommorow">
                          Book for tommorow
                        </ListItem>
                      </Select>
                      <br />
                      <br />
                      <RadioGroup
                        name="time"
                        value={state.time}
                        onChange={handleChange}
                        style={{display: "inline"}}
                      >
                        <FormControlLabel
                          value="morning"
                          control={<Radio color="primary" />}
                          label="Morning"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="evening"
                          control={<Radio color="primary" />}
                          label="Evening"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                      <h4 key={item.price}>{item.price}/- Rs</h4>
                      <br />
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
