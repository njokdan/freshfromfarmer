import React, { useEffect, useState } from "react";
import {Button, TextField} from "@material-ui/core";
import db from "../Firebase"


export default function Login() {
    var [state, setState] = useState({});
    var [user, setUser] = useState({});

    const get = async () => {
        const doc = await db.firestore().collection("users").doc("9876543210").get();
        setUser(doc.data());
    }

    useEffect(() => {
        console.log(user)
        if(user === {}) {
            alert("Invalid Phone Number");
            return;
        }
        if(user.password === state.password)
            {
                alert("success");
            }
            else{
                alert("Invalid password, please try again!")
            }
    }, [user])

    const handleChange = (e) => {
        setState({ [e.target.name] : e.target.value });
    }

    return (
        <>
            <div>
                <TextField label={"Phone Number"} name="phone" onChange={handleChange}/>
                <br />
                <TextField label={"Password"} name="password" onChange={handleChange} />
                <br />
                <Button variant="contained" color="primary" onClick={get}> Login </Button>
            </div>
        </>
    )
}