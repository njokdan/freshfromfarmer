import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap"
import db from "../Firebase";

export default function Login(props) {
  var [state, setState] = useState({});
  var [user, setUser] = useState({});

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const login = async () => {
    const data = await db
      .firestore()
      .collection("users")
      .doc(state.)
      .get();

    var user = data.data();

    if (user === {}) {
      alert("Invalid Phone Number");
      return;
    }
    if (user.password === state.password) {
      alert("success");

      var userDetails = {
          userType: user.type,
          userName: user.name,
          userId: user.phone
      };

      localStorage.setItem("userDetails", JSON.stringify(userDetails))
      props.setLogin(true);
      if(user.type === "admin") window.location.replace("/admin/");
    } else {
      alert("Invalid password, please try again!");
    }
}

  const handleChange = (e) => {
    setState({ [e.target.name]: e.target.value });
  };

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TextField
          label={"Phone Number"}
          name="phone"
          fullWidth
          onChange={handleChange}
        />
        <br />
        <TextField label={"Password"} name="password" fullWidth onChange={handleChange} />
        <br />
        </Modal.Body>
        <Modal.Footer>
          
        <Button variant="outlined" color="primary" style={{margin: "5px"}}>
          
          Sign Up
        </Button>
        <Button variant="contained" color="primary" onClick={login}>
          
          Login
        </Button>
        
        
        </Modal.Footer>
      </Modal>


    </>
  );
}
