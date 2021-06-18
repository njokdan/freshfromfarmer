import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppNavbar from "./Navbar";
import Footer from "./Footer";
import db from "../Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const Form = ({ handleClose }) => {
  const classes = useStyles();
  const [state, setState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const signUp = async (e) => {
    e.preventDefault();
    const data = await db
      .firestore()
      .collection("users")
      .doc(state.phone)
      .get();

    var user = data.data();

    if (state.password !== state.repassword) alert("Password does not match");
    else if (user !== {} && user !== undefined && user !== null) {
      // console.log(user);
      alert("Phone Number already exists");
    } else {
      // console.log(state);

      db.firestore()
        .collection("users")
        .doc(state.phone)
        .set(state)
        .then(() => {
          alert("Account created successfully");
          
        });  
    }
  };

  return (
    <div>
      <AppNavbar />
      <div className="main">
        <form className={classes.root} >
          <TextField
            label="Name"
            variant="filled"
            required
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            variant="filled"
            required
            name="phone"
            value={state.phone}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="filled"
            required
            name="email"
            value={state.email}
            onChange={handleChange}
          />

          <TextField
            label="Address"
            variant="filled"
            required
            name="address"
            value={state.address}
            onChange={handleChange}
          />
          <TextField
            label="Pincode"
            variant="filled"
            required
            name="pincode"
            value={state.pincode}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            name="password"
            value={state.password}
            onChange={handleChange}
          />

          <TextField
            label="Re Enter Password"
            variant="filled"
            type="password"
            required
            name="repassword"
            value={state.repassword}
            onChange={handleChange}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={signUp}
            >
              Signup
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Form;
