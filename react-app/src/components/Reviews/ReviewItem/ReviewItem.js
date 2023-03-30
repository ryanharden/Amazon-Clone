import "./ReviewItem.css";
import { deleteReviewThunk, getReviewsThunk, deleteReview } from "../../../store/reviews";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Stars from "../Stars/Stars";

const ReviewItem = ({ review, product, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let reviewDate = new Date(review.created_at);
    reviewDate = reviewDate.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });

    const deleteReview = async () => {
        await dispatch(deleteReviewThunk(review.id));
        dispatch(getReviewsThunk(product.id));
    }

    return (
        <div className="review-item-container">
            <div className="review-item-top">
                <div className="review-person-prof">
                    <img className="review-prof-pic" src="https://d1irxr40exwge2.cloudfront.net/profile.jpg" />
                    <div className="review-prof-name">
                        {review?.user?.first_name} {review?.user?.last_name}
                    </div>
                </div>
                {review?.user_id == user.id &&
                    <div className="edit-delete-review-container">
                        <Link to={`/products/${product?.id}/reviews/${review?.id}/editreview`} className="edit-review-button">
                            <i className="fa-solid fa-file-pen"></i>
                        </Link>
                        <div onClick={deleteReview} className="delete-review-button">
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                }
            </div>
            <div className="stars-headline">
                <div className="review-stars">
                    <Stars rating={review?.rating} />
                </div>
                <div className="review-headline">
                    {review?.headline}
                </div>
            </div>
            <div className="reviewed-in">
                Reviewed in the United States 🇺🇸 on {reviewDate}
            </div>
            <div className="verified-purchase">
                Verified Purchase
            </div>
            <div className="review-body">
                {review?.body}
            </div>
            <div className="individual-review-images">
                {review?.images?.length > 0 && review.images.map((image) => <img key={image.id} className="individual-review-image" src={image.url} />)}
            </div>
        </div>
    )
}
export default ReviewItem;
