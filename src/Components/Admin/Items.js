import React, { useEffect, useState } from "react";
import AppNavbar from "../Navbar";
import AddItem from "./AddItem";
import Sidebar from "./Sidebar";
import db from "../../Firebase";
import { Button as Btn } from "react-bootstrap";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";

function Items(props) {
  const [showAddItem, setshowAddItem] = useState(false);
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

  const handleChange = (e, index) => {
    let stateItems = [...items];
    let item = { ...stateItems[index] };
    const { name, value } = e.target;
    item[name] = value;
    stateItems[index] = item;
    setItems(stateItems);
  };

  const Fileupload = async (e, name, index) => {
    e.preventDefault();

    document.getElementById("uploading").style.display = "block";

    const file = e.target.files[0];
    const storageRef = db.storage().ref("items/" + name);
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file).then((snapshot) => {
      alert("uploaded", file.name);
      document.getElementById("uploading").style.display = "none";
      fileRef.getDownloadURL().then((url) => {
        let stateItems = [...items];
        let item = { ...stateItems[index] };
        item["itemImage"] = url;
        stateItems[index] = item;
        setItems(stateItems);
      });
    });
  };

  const update = (name, index) => {
    db.firestore().collection("items").doc(name).set(items[index]);
    alert("Updated");
    window.location.reload();
  };

  const deleteItem = (name) => {
    db.firestore().collection("items").doc(name).delete();

    let storageRef = db.storage().ref(`items/${"Milk"}`);

    storageRef.listAll().then(function (result) {
      result.items.forEach(function (file) {
        file.delete();
      });
    });

    alert("Item Deleted");
  };

  if (showAddItem) return <AddItem showAddItem={setshowAddItem} />;
  else {
    return (
      <div>
        <AppNavbar />
        <Sidebar />

        <div className="content">
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => setshowAddItem(true)}
          >
            Add Item
          </Button>

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
                items.map((item, index) => {
                  return (
                    <Grid item md={3}>
                      <Card className="text-center item-card" key={item.name}>
                        <Typography
                          style={{ textAlign: "left", color: "grey" }}
                        >
                          Add new Image
                        </Typography>
                        <div style={{ padding: "10px" }}>
                          <input
                            type="file"
                            name="itemImage"
                            onChange={(e) => Fileupload(e, item.name, index)}
                          />
                          <p id="uploading" style={{ display: "none" }}>
                            Uploading, Please wait! &nbsp;
                            <CircularProgress size="1rem" color="primary" />
                          </p>
                        </div>

                        <TextField
                          name="name"
                          label="Name"
                          defaultValue={item.name}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <br />
                        <TextField
                          name="description"
                          label="Description"
                          defaultValue={item.description}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <br />
                        <br />
                        <TextareaAutosize
                          className="textarea"
                          name="details"
                          rowsMin={2}
                          placeholder="Item Details * "
                          defaultValue={item.details}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <TextField
                          label="Price"
                          name="price"
                          fullWidth
                          defaultValue={item.price}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <br />
                        <br />
                        <Grid container spacing={3}>
                          <Grid item md={6}>
                            <Btn
                              variant="outline-warning"
                              onClick={() => update(item.name, index)}
                            >
                              Update
                            </Btn>
                          </Grid>
                          <Grid item md={6}>
                            <Btn
                              variant="outline-danger"
                              onClick={() => deleteItem(item.name)}
                            >
                              Delete
                            </Btn>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </div>
      </div>
    );
  }
}

export default Items;
