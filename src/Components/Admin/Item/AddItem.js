import React, { useState } from "react";
import { Button, CircularProgress, TextareaAutosize, TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import db from "../../../Firebase";

export default function AddItem(props) {
  var [state, setState] = useState({});
  const [show, setShow] = useState(true);

  const handleClose = () => {
    
    if(state.itemImage !== undefined && state.itemImage !== null)
    {
      db
      .storage()
      .ref("items/" + state.name)
      .child(state.itemImage).remove();
    }
    setShow(false);
    props.showAddItem(false);
  };

  const Fileupload = async (e) => {
    e.preventDefault();
    var { name } = e.target;

    document.getElementById("uploading").style.display = "block";

    const file = e.target.files[0];
    const storageRef = db
      .storage()
      .ref("items/" + state.name);
    const fileRef = storageRef.child(file.name);
    
    await fileRef.put(file)
    .then((snapshot) => {
      alert("uploaded", file.name);
      document.getElementById("uploading").style.display = "none";
      fileRef.getDownloadURL().then((url) => {
        setState({
          ...state,
          [name]: url,
        });
      });
    });

  };

  const addItem = () => {
    if(state.itemImage === undefined && state.name === undefined){
      alert("Please fill all details and try again!!")
    }
    
    db.firestore().collection("items").doc(state.name).set(state).then(() => {
      alert("Item added");
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
            label={"Item Name"}
            name="name"
            fullWidth
            required
            onChange={handleChange}
          />
          <br />
          <TextField
            label={"Item Descrption"}
            name="description"
            fullWidth
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <TextareaAutosize
            className="textarea"
            label={"Item Details *"}
            name="details"
            rowsMin={2}
            placeholder="Item Details * "
            onChange={handleChange}
          />
          <TextField
            label={"Item Price per day"}
            name="price"
            fullWidth
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <input type="file" name="itemImage" onChange={Fileupload} />
          <p id="uploading" style={{ display: "none"}}> 
          Uploading, Please wait! &nbsp;
          <CircularProgress size="1rem" color="primary" />
           </p>
          
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
          <Button variant="contained" color="primary" onClick={addItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
