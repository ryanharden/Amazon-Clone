import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useSelector, useDispatch } from "react-redux";
import { getProductThunk } from "../../../store/products";
import { getReviewsThunk } from "../../../store/reviews";


const EditReview = () =>{

    const {reviewId, productId} = useParams();

    const reviews = useSelector(state => state.Reviews.allReviews)
    const dispatch = useDispatch();
    // console.log("product: ", product);

    useEffect(() => {
        dispatch(getReviewsThunk(productId));
    }, [dispatch, productId]);

    const singleReview = reviews[reviewId];
    console.log("singleReview: ", singleReview);


    // if(!(Object.values(product)).length) return null

    const review = {
        id: singleReview.id,
        rating: singleReview.rating,
        headline: singleReview.headline,
        body: singleReview.body,
        images: singleReview.images,
    }

    return (
        <ReviewForm review={review} formType="edit"/>
    )
}

export default EditReview;
