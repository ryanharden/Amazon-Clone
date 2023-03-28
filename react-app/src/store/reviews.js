// Constant Action Types

const GET_REVIEWS = "REVIEWs/GET_REVIEWS";
const GET_SEARCH_REVIEWS = "REVIEWs/GET_SEARCH_REVIEWS";
// const GET_USER_REVIEWS = "REVIEWs/GET_USER_REVIEWS";
// const GET_REVIEW = "REVIEWs/GET_REVIEW";
const CREATE_REVIEW = "REVIEWs/CREATE_REVIEW";
const EDIT_REVIEW = "REVIEWs/EDIT_REVIEW";
const DELETE_REVIEW = "REVIEWs/DELETE_REVIEW";
const DELETE_IMAGE = "REVIEWs/DELETE_IMAGE";

// Action Creators

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

const deleteImage = (imageId) => ({
    type: DELETE_IMAGE,
    imageId
});

// Thunk Action Creators

// Get All Reviews
export const getReviewsThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(getReviews(reviews))
        return reviews
    }
}

// Create Review
export const createReviewThunk = (productId, body) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(createReview(review))
        return review.id;
    }
}

// Edit Review
export const editReviewThunk = (reviewId, body) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(editReview(review));
        return review
    }
}

// Delete Review
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const deletedReview = await res.json();
        dispatch(deleteReview(reviewId));
        return deleteReview
    }
}

// Post Review Images
export const postReviewImages = (reviewId, formData) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/images`, {
        method: "POST",
        body: formData,
    });
    if (res.ok) {
        const images = await res.json();
        return images
    } else {
        // console.log("res: ", res);
        return res.errors;
    }


    // console.log("product: ", product)
}

// Delete Review Image
export const deleteReviewImageThunk = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(deleteImage(imageId))
    }
}

const initialState = {
    allReviews: {}
}

export default function reviewReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Get Reviews
        case GET_REVIEWS:
            newState = { ...state }
            newState.allReviews = { ...action.reviews }
            return newState

        // Create Review
        case CREATE_REVIEW:
            newState = { ...state }
            newState.allReviews = { ...state.allReviews, [action.review.id]: action.review }
            return newState;

        // Edit Review
        case EDIT_REVIEW:
            newState = { ...state }
            newState.allReviews = { ...state.allReviews, [action.review.id]: action.review }
            return newState;

        // Delete Review
        case DELETE_REVIEW:
            newState = { ...state }
            delete newState.allReviews[action.reviewId]
            return newState

        // Default
        default:
            return state;
    }

}
