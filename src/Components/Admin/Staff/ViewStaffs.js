import React, { useEffect, useState } from "react";
import { Button as Btn } from "react-bootstrap";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  TextField,
} from "@material-ui/core";

import AppNavbar from "../../Navbar";
import Sidebar from "../Sidebar";
import db from "../../../Firebase";
import AddStaff from "./AddStaff";

function ViewStaffs(props) {
  const [showAddStaff, setshowAddStaff] = useState(false);
  const [staffs, setStaffs] = useState();

  const fetchStaffs = async () => {
    const response = db.firestore().collection("staffs");
    const data = await response.get();

    let arr = [];

    data.docs.forEach((item) => {
      arr.push(item.data());
    });

    setStaffs(arr);
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleChange = (e, index) => {
    let statestaffs = [...staffs];
    let item = { ...statestaffs[index] };
    const { name, value } = e.target;
    item[name] = value;
    statestaffs[index] = item;
    setStaffs(statestaffs);
  };

  const update = (name, index) => {
    db.firestore()
      .collection("staffs")
      .doc(name)
      .set(staffs[index])
      .then(() => {
        alert("Updated");
        window.location.reload();
      });
  };

  const deleteItem = (name) => {
    if (
      window.confirm(
        "Are you sure to delete TableCellis staff? All TableCelle orders in TableCellis staff will be deleted permanently"
      )
    )
      db.firestore()
        .collection("staffs")
        .doc(name)
        .delete()
        .then(() => {
          alert("Staff Deleted");
          window.location.reload();
        });
  };

  if (showAddStaff) return <AddStaff showAddStaff={setshowAddStaff} />;
  else {
    return (
      <div>
        <AppNavbar />
        <Sidebar />

        <div className="content">
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => setshowAddStaff(true)}
          >
            Add Staff
          </Button>

          <h2 className="text-center">Our Products</h2>
          {staffs === undefined && (
            <div className="text-center" style={{ padding: "70px" }}>
              <CircularProgress size="4rem" color="primary" />
            </div>
          )}
          {staffs !== undefined && staffs.lengTableCell === 0 && (
            <div className="text-center" style={{ padding: "70px" }}>
              <h4>No Data</h4>
            </div>
          )}

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Another Number</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {staffs !== undefined &&
                staffs.lengTableCell !== 0 &&
                staffs.map((staff, index) => {
                  return (
                    <TableRow key={staff.name}>
                      <TableCell>
                        <TextField
                          name="name"
                          defaultValue={staff.name}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell> {staff.phone} </TableCell>
                      <TableCell>
                        <TextField
                          name="location"
                          defaultValue={staff.location}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="address"
                          defaultValue={staff.address}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="another_phone"
                          defaultValue={staff.another_phone}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <Btn
                          variant="outline-warning"
                          onClick={() => update(staff.phone, index)}
                        >
                          Update
                        </Btn>
                      </TableCell>
                      <TableCell>
                        <Btn
                          variant="outline-danger"
                          onClick={() => deleteItem(staff.phone)}
                        >
                          Delete
                        </Btn>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default ViewStaffs;
