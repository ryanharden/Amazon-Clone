import { useModal } from "../../../context/Modal";
import "./AllReviewImages.css";

// import Stars from "../../../Stars/Stars";

const AllReviewImages = ({ images }) => {
    const { closeModal } = useModal();

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
