import { useModal } from "../../../context/Modal";
import "./ReviewModal.css";

// import Stars from "../../../Stars/Stars";

const AllReviewImages = ({ images }) => {
    const { closeModal } = useModal();
    let reviewDate = new Date(review.created_at);
    reviewDate = reviewDate.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="all-review-images-container">
            <div className="review-modal-top">
                <div className="close" onClick={(e) => closeModal()}>
                </div>
            </div>
            <div className="review-modal-bottom">
                <div className="all-review-images-images">
                    {images}
                </div>
            </div>
        </div>
    )
}
export default AllReviewImages;
