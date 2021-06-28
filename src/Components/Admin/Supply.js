import {
  Card,
  CircularProgress,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import {
  EditingState,
  IntegratedFiltering,
  IntegratedSorting,
  SearchState,
  SortingState,
} from "@devexpress/dx-react-grid";
import {
  SearchPanel,
  Grid as TableGrid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow,
  Toolbar,
} from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import React, { useEffect, useState } from "react";
import db from "../../Firebase";
import AppNavbar from "../Navbar";
import Sidebar from "./Sidebar";

function Supply(props) {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [Data, setData] = useState();
  const [items, setItems] = useState();
  const [output, setOutput] = useState();
  const [users, setUsers] = useState();
  const [total, setTotal] = useState();
  const [sorting, setSorting] = useState([
    { columnName: "address", direction: "asc" },
  ]);
  var totalAmount = 0;

  var editingStateColumnExtensions = [
    {
      columnName: "viewDetails",
      editingEnabled: false,
    },
  ];
  var columns = [
    {
      title: "Customer Phone",
      name: "phone",
    },
    {
      title: "Customer Name",
      name: "customerName",
    },
    {
      title: "Item",
      name: "item",
    },
    {
      title: "Quantity",
      name: "quantity",
    },
    {
      title: "staff",
      name: "staff",
    },
    {
      title: "Address",
      name: "address",
    },
  ];

  const getRowId = (row) => row.id;

  useEffect(() => {
    if (date && time) {
      showdata();
    }
  }, [date, time]);

  const showdata = async () => {
    document.getElementById("loading").style.display = "block";
    const response = await db.firestore().collection("users").get();
    var users = [];
    var data = {};

    response.forEach((item) => {
      users.push(item.id);
      data[item.id] = item.data();
    });
    setData(data);
    setUsers(users);
    document.getElementById("loading").style.display = "none";
  };

  const fetchItems = async () => {
    const response = db.firestore().collection("items");
    const data = await response.get();

    let arr = [];

    data.docs.forEach((item) => {
      arr.push(item.data());
    });

    setItems(arr);
  };

  const getAmount = (item) => {
    for (let i in items) {
      if (items[i].name === item) {
        return items[i].price;
      }
    }
  };

  const retrieveOrder = async () => {
    if (users && Data) {
      var temp =
        time + new Date(date).toLocaleDateString().replaceAll("/", "-");
      var ref = db.firestore().collection("supply").doc(temp);
      var arr = [];
      for (let i = 0; i < users.length; i++) {
        let data = await ref.collection(users[i]).get();

        data.docs.forEach((item, index) => {
          arr.push({
            ...item.data(),
            id: index,
            address: Data[item.data().phone].address,
          });
        });
      }
      setOutput(arr);
    } else {
      setOutput([]);
    }
  };

  useEffect(() => {
    retrieveOrder();
  }, [Data, users]);

  useEffect(() => {
    findTotal();
    fetchItems();
  }, [output]);

  const findTotal = () => {
    if (output) {
      var temp = {};
      for (let i in output) {
        if (output[i].item in temp) temp[output[i].item] += output[i].quantity;
        else temp[output[i].item] = output[i].quantity;
      }
      setTotal(temp);
    }
  };

  const calcTotal = (price) => {
    totalAmount += price;
    return price;
  };

  return (
    <div>
      <AppNavbar />
      <Sidebar />
      <div className="content">
        <h1 className="text-center">Supply</h1>
        <Grid container spacing={3}>
          <Grid item sm="6">
            <Card style={{ margin: "30px" }}>
              <TextField
                type="date"
                fullWidth
                onChange={(e) => setDate(e.target.value)}
                style={{ padding: "35px" }}
              />
            </Card>
          </Grid>
          <Grid item sm="6">
            <Card style={{ margin: "30px" }}>
              <RadioGroup
                name="time"
                value={time}
                fullWidth
                onChange={(e) => setTime(e.target.value)}
                style={{ display: "inline" }}
              >
                <FormControlLabel
                  value="morning"
                  className="order-inputs"
                  control={<Radio color="primary" />}
                  label="Morning"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="evening"
                  className="order-inputs"
                  control={<Radio color="primary" />}
                  label="Evening"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Card>
          </Grid>
        </Grid>

        <div id="loading" className="text-center" style={{ display: "none" }}>
          <CircularProgress size="5rem" />
        </div>
        {output && output.length !== 0 && (
          <TableGrid rows={output} columns={columns} getRowId={getRowId}>
            <hr />
            <EditingState columnExtensions={editingStateColumnExtensions} />
            <SearchState />
            <SortingState sorting={sorting} onSortingChange={setSorting} />
            <IntegratedFiltering />
            <IntegratedSorting />
            <Table />
            <TableHeaderRow showSortingControls />
            <Toolbar />
            <SearchPanel />
            <TableEditRow />
            <TableEditColumn />
          </TableGrid>
        )}

        <br />
        <br />
        <h2 className="text-center">Today's Sales</h2>
        {total && (
          <MaterialTable>
            <TableHead>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Amount</TableCell>
            </TableHead>
            <TableBody>
              {Object.keys(total).map((item) => (
                <TableRow>
                  <TableCell>{item}</TableCell>
                  <TableCell>{total[item]}</TableCell>
                  <TableCell>
                    {calcTotal(
                      parseInt(getAmount(item)) * parseInt(total[item])
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MaterialTable>
        )}
        <br />
        <h5>Total Sale : {totalAmount} </h5>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Supply;
