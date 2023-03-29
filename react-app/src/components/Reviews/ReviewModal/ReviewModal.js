import { useModal } from "../../../context/Modal";
import "./ReviewModal.css";

import Stars from "../Stars/Stars";

const ReviewModal = ({ review, image }) => {
    const { closeModal } = useModal();
    let reviewDate = new Date(review.created_at);
    reviewDate = reviewDate.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="review-modal-container">
            <div className="review-modal-top">
                <div className="review-close" onClick={(e) => closeModal()}>
                </div>
            </div>
            <div className="review-modal-bottom">
                <div className="review-modal-left">
                    <img className="review-modal-image" src={image} />
                </div>
                <div className="review-modal-right">
                    <div className="review-modal-person-prof">
                        <img className="review-modal-prof-pic" src="https://d1irxr40exwge2.cloudfront.net/profile.jpg" />
                        <div className="review-modal-prof-name">
                            {review.user.first_name} {review.user.last_name}
                        </div>
                    </div>
                    <div className="modal-stars-headline">
                        <div className="review-modal-stars">
                            <Stars rating={review.rating} />
                        </div>
                        <div className="review-modal-headline">
                            {review.headline}
                        </div>
                    </div>
                    <div className="modal-reviewed-in">
                        Reviewed in the United States 🇺🇸 on {reviewDate}
                    </div>
                    <div className="review-modal-body">
                        {review.body}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReviewModal;
