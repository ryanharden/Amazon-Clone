import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useSelector, useDispatch } from "react-redux";
import { getProductThunk } from "../../../store/products";
import { getReviewsThunk } from "../../../store/reviews";


const EditReview = () => {
    const dispatch = useDispatch();
    const {productId, reviewId} = useParams();

    const reviews = useSelector(state => state.Reviews.allReviews)
    const reviewsArr = Object.values(reviews);
    // console.log("reviews: ", reviews);

    useEffect(() => {
        dispatch(getReviewsThunk(productId));
    }, [dispatch, productId]);

    const singleReview = reviewsArr.find(review => review.id === parseInt(reviewId));

    // console.log("singleReview: ", singleReview);


    // if(!(Object.values(product)).length) return null

    const review = {
        id: reviewId,
        rating: singleReview?.rating,
        headline: singleReview?.headline,
        body: singleReview?.body,
        images: singleReview?.images,
    }

    if (!singleReview) {
        return null;
    }

    return (
        <ReviewForm review={review} formType="edit"/>
    )
}

export default EditReview;
