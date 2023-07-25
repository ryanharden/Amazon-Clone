import { useModal } from "../../../context/Modal";
import "./AllReviewImages.css";

// import Stars from "../../../Stars/Stars";

const AllReviewImages = ({ images }) => {
    const { closeModal } = useModal();



    const imageEls = images.map((image, i) => (
        <img key={i} src={image} className="all-review-images-image" />
    ));
    // console.log("imageUrls: ", imageUrls)

    return (
        <div className="all-review-images-container">
            <div className="review-modal-top">
                <div onClick={(e) => closeModal()} className='close-modal-x'>
                    <i className="fa-solid fa-xmark fa-lg"></i>
                </div>
            </div>
            <div className="review-modal-bottom">
                <div className="all-review-images-images">
                    {imageEls}
                </div>
            </div>
        </div>
    )
}
export default AllReviewImages;
