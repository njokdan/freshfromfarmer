import React from "react";
import {Button, Card, Carousel} from 'react-bootstrap'
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
    return (
        <div>
            {/* Nav bar */}
            <Navbar />
            {/*  Carousal  */}
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://wallpapercave.com/wp/wp2034279.jpg"
                        alt="First slide"
                        height={"400px"}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.wallpapersafari.com/86/70/iEKYAP.jpg"
                        alt="Second slide"
                        height={"400px"}
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://wallpapercave.com/wp/wp2034280.jpg"
                        alt="Third slide"
                        height={"400px"}
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <br /><br />
            {/*  products  */}

            <div className={"text-center"}>
                <h2>Our products</h2>
            </div>

            <br />
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-3 card"}>
                        <Card>
                            <Card.Img variant="top" height="200px" src="https://img.wallpapersafari.com/tablet/2048/2732/12/59/nq587D.jpg"/>
                            <Card.Body className="text-center">
                                <Card.Title>Milk</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className={"col-md-3 card"}>
                        <Card>
                            <Card.Img variant="top" height="200px" src="https://img.wallpapersafari.com/tablet/2048/2732/12/59/nq587D.jpg"/>
                            <Card.Body className="text-center">
                                <Card.Title>Ghee</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className={"col-md-3 card"}>
                        <Card>
                            <Card.Img variant="top" height="200px" src="https://img.wallpapersafari.com/tablet/2048/2732/12/59/nq587D.jpg"/>
                            <Card.Body className="text-center">
                                <Card.Title>Paneer</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className={"col-md-3 card"}>
                        <Card>
                            <Card.Img variant="top" height="200px" src="https://img.wallpapersafari.com/tablet/2048/2732/12/59/nq587D.jpg"/>
                            <Card.Body className="text-center">
                                <Card.Title>Butter</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>

            <br /> <br />

        {/*  Footer  */}
            <Footer />
        </div>
    );
}

export default App;
