import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import db from "../Firebase";

function Review() {
  const [reviews, setReviews] = useState();

  const fetchReviews = async () => {
    var data = await db.firestore().collection("review").get();

    let arr = [];

    data.docs.forEach((item) => {
      arr.push(item.data());
    });

    setReviews(arr);
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <div>
      <h2 className="text-center">Our Customer's Reviews</h2>
      <br></br>
      {/*  Carousal  */}
      <Carousel fade className="text-center">
        {reviews &&
          Object.keys(reviews).map((review) => (
            <Carousel.Item>
              <h3>{reviews[review].name}</h3>
              <h4 style={{ fontWeight: "400" }}>{reviews[review].message}</h4>
            </Carousel.Item>
          ))}
      </Carousel>
      <br />
      <br />
    </div>
  );
}

export default Review;
