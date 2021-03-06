import React, { useEffect, useState } from "react";
import VenueShowReviews from "./VenueShowReviews.js";
import ReviewForm from "./ReviewForm.js";
import ReviewSubmittedTile from "./ReviewSubmittedTile.js";
import MapComponent from "./MapComponent.js";
import Star from "./Star";

const VenueShow = (props) => {
  const [venue, setVenue] = useState({ reviews: [] });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [successfulEdit, setSuccessfulEdit] = useState(false);
  const [loadReady, setLoadReady] = useState(false);
  const venueId = props.match.params.id;
  

  const fetchVenue = async () => {
    try {
      const response = await fetch(`/api/v1/venues/${venueId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const venueData = await response.json();
      setVenue(venueData.venue);
      setLoadReady(true);
    } catch (error) {
      console.error(`There was an error in fetch: ${error}`);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, [isReviewSubmitted, successfulEdit]);

  const handleEdit = () => {
    setSuccessfulEdit(true);
  };

  let reviews = venue.reviews.map((review) => {
    return (
      <VenueShowReviews
        key={review.id}
        review={review}
        venueId={venueId}
        handleEdit={handleEdit}
      />
    );
  });

  const handleClick = (event) => {
    event.preventDefault();
    setShowReviewForm(true);
  };

  const handleContinue = (event) => {
    event.preventDefault();
    setIsReviewSubmitted(false);
  };

  // Toggles the view of logic below
  const reviewSubmitted = () => {
    setIsReviewSubmitted(true);
    setShowReviewForm(false);
  };

  const determineAverage = () => {
    let total = 0;
    venue.reviews.forEach((review) => {
     total += review.rating
    })
    return Math.floor(total/venue.reviews.length)
  }

  let stars = [];
  let googleMap;
  let reviewSubmittedResponse;
  let reviewForm;
  let reviewButton;
  
  // Determines display of reviews or form or submitted page
  if (showReviewForm) {
    reviewForm = <ReviewForm id={venueId} reviewSubmitted={reviewSubmitted} />;
    reviewButton = "";
  } else if (isReviewSubmitted) {
    reviewSubmittedResponse = (
      <ReviewSubmittedTile handleContinue={handleContinue} />
    );
  } else {
    reviewButton = (
      <div>
        <button type="button" className="button" onClick={handleClick}>
          Add Review
        </button>
        <h3 className="fancy-call-out">Reviews:</h3>
        <div>{reviews}</div>
      </div>
    );
  }

  if(loadReady) {
    googleMap = <MapComponent 
      address={venue.address}
      city={venue.city}
      state={venue.state}
      zipCode={venue.zipCode}
      name={venue.name} 
      />
    let numberOfStars = determineAverage()
    for(let i = 0; i < numberOfStars; i++) {
      stars.push(<Star key={i}/>)
    }
  }

  return (
    <div className="tile show">
      <div>
        <h2>{venue.name}</h2>
      </div>
      <div>
        <img src={venue.imgUrl} />
      </div>
      <div>{stars}</div>
      <div className="soft-wrap">
        <p>{venue.description} <span className="deemphasize"> (Capacity: {venue.capacity})</span></p>
      </div>
      <div className="contact-container">
        <div className="contact">
          <h3>Contact Info</h3>
          <div>
            <span>{venue.address}, </span>
            <span>{venue.city}, </span>
            <span>{venue.state} </span>
            <span>{venue.zipCode}</span>
          </div>
          <div>
            <span>{venue.phoneNumber}</span>
          </div>
        </div>
        <map className="contact">
          {googleMap}
        </map>
      </div>
      {reviewButton}
      {reviewSubmittedResponse}
      {reviewForm}
    </div>
  );
};
export default VenueShow;
