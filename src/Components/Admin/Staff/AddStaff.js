import React, { useState } from "react";
import { Button, CircularProgress, TextareaAutosize, TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import db from "../../../Firebase";

export default function AddStaff(props) {
  var [state, setState] = useState({});
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.showAddStaff(false);
  };

  const addStaff = () => {
    db.firestore().collection("staffs").doc(state.phone).set(state).then(() => {
      alert("Staff added");
      window.location.reload();
    });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
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
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            label={"Staff Name"}
            name="name"
            fullWidth
            required
            onChange={handleChange}
          />
          <br />
          <TextField
            label={"Staff Phone"}
            name="phone"
            fullWidth
            required
            onChange={handleChange}
          />
          <br />
          <TextField
            label={"Staff Location (For delivery)"}
            name="location"
            fullWidth
            required
            onChange={handleChange}
          />
          <br />
          <TextField
            label={"Staff Address"}
            name="address"
            fullWidth
            required
            onChange={handleChange}
          />
          <br />
          <TextField
            label={"Another Number"}
            name="another_phone"
            fullWidth
            required
            onChange={handleChange}
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            style={{ margin: "5px" }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={addStaff}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
