import React from "react";
import ReviewForm from "../ReviewForm/ReviewForm";

const CreateReview = () => {
    const review = {
        rating: 0,
        headline: "",
        body: "",
        images: []
    }

    return (
        <>
            <ReviewForm review={review} formType="create"/>
        </>
    )
}

export default CreateReview;
