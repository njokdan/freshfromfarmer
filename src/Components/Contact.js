import React, { useState } from "react";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AppNavbar from "./Navbar";
import Footer from "./Footer";
import logo from "../images/milk.png";
import db from "../Firebase";

function Contact(props) {

  const [state, setState ]= useState({});

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = () => {
    db.firestore().collection("review").add(state).then(() => {
      alert("Thankyou for your Review");
      window.location.reload();
    })
  }

  return (
    <div>
      <AppNavbar />
      <div className="main">
        <form>
          <div className="content">
            <section className="section">
              <div className="container">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Review Form</h4>
                        <hr />
                        <div className="form-group">
                          <label className="mb-1">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter full Name"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-1">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-1">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone number"
                            name="phone"
                            value={state.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-1">Message</label>
                          <textarea
                            rows="3"
                            className="form-control"
                            placeholder="Type your review..."
                            name="message"
                            value={state.message}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                        <div className="form-group py-3">
                          <button
                            type="button"
                            className="btn btn-primary shadow w-100"
                            onClick={handleSubmit}
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6 border-start">
                        <div class="vw-100">
                          <img class="img-responsive" src={logo} alt="logo" />
                        </div>
                        <h5 className="main-heading">Contact Us</h5>
                        <div class="mx-blank">
                          <CallIcon /> 1234567890 <br />
                          <EmailIcon />{" "}
                          <a href="mailto: freshfromfarmer@gmail.com">
                            freshfromfarmer@gmail.com
                          </a>{" "}
                          <br />
                          <LocationOnIcon /> No.1, abc street, chennai
                          <div className="underline"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
