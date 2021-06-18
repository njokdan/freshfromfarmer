import React from "react";
import {Button, Card, Carousel} from 'react-bootstrap'


function App() {
    return (
        <div>
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
           
        </div>
    );
}

export default App;
