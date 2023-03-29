import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, editReviewThunk, deleteReviewThunk, postReviewImages, deleteReviewImageThunk } from "../../../store/reviews";
import "./ReviewForm.css";
import error from "../../../assets/dialog-error.248x256.png";
import spinner from "../../../assets/Iphone-spinner-2.gif";
import { getProductThunk } from "../../../store/products";



const validFileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

const ReviewForm = ({ formType, review }) => {
    const emptyStar = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzgiIGhlaWdodD0iMzUiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMTkgMGwtNS44NyAxMS41MkwwIDEzLjM3bDkuNSA4Ljk3TDcuMjYgMzUgMTkgMjkuMDIgMzAuNzUgMzVsLTIuMjQtMTIuNjYgOS41LTguOTctMTMuMTMtMS44NXoiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjQTI2QTAwIiBzdHJva2Utb3BhY2l0eT0iLjc1IiBkPSJNMTkgMS4xbC01LjU0IDEwLjg4TDEuMSAxMy43Mmw4Ljk0IDguNDRMNy45MiAzNC4xIDE5IDI4LjQ2bDExLjA4IDUuNjQtMi4xMS0xMS45NCA4Ljk0LTguNDQtMTIuMzYtMS43NEwxOSAxLjF6Ii8+PC9nPjwvc3ZnPg==";
    const star = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzgiIGhlaWdodD0iMzUiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjUwJSIgeDI9IjUwJSIgeTE9IjI3LjY1JSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkNFMDAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkE3MDAiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGlkPSJiIiBkPSJNMTkgMGwtNS44NyAxMS41MkwwIDEzLjM3bDkuNSA4Ljk3TDcuMjYgMzUgMTkgMjkuMDIgMzAuNzUgMzVsLTIuMjQtMTIuNjYgOS41LTguOTctMTMuMTMtMS44NXoiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjQTI2QTAwIiBzdHJva2Utb3BhY2l0eT0iLjc1IiBkPSJNMTkgMS4xbC01LjU0IDEwLjg4TDEuMSAxMy43Mmw4Ljk0IDguNDRMNy45MiAzNC4xIDE5IDI4LjQ2bDExLjA4IDUuNjQtMi4xMS0xMS45NCA4Ljk0LTguNDQtMTIuMzYtMS43NEwxOSAxLjF6Ii8+PC9nPjwvc3ZnPg=="
    const product = useSelector(state => state.Products.singleProduct)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const user = useSelector(state => state.session.user)

    const [rating, setRating] = useState(0);
    // const [product, setProduct] = useState({});
    const [headline, setHeadline] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [prevImages, setPrevImages] = useState([]);
    const [prevImage, setPrevImage] = useState(null);
    const [errors, setErrors] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getProductThunk(productId))
    }, [dispatch, productId])

    // console.log("product: ", product);

    useEffect(() => {
        setRating(review?.rating || 0);
        setHeadline(review?.headline || "");
        setBody(review?.body || "");
        setImage(review?.images || null);
        setImages(review?.images || []);
        setPrevImages([]);
        setPrevImage(null);
        setErrors([]);
    }, [review]);

    const deleteReview = () => {
        dispatch(deleteReviewThunk(review.id))
        navigate(`/products/${productId}`)
    }

    // Handle form submission for editing an existing product
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (document.getElementsByClassName("review-preview-images-image").length === 0) {
            setErrors(["Product must have at least one image"]);
            return;
        }

        const editedReview = {
            id: review?.id,
            // user_id: user.id,
            product_id: productId,
            rating,
            body,
            headline,
        };

        const validationErrors = validateForm(editedReview);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        const newNewReview = await dispatch(editReviewThunk(editedReview));
        if (images.length > 0 && newNewReview) {
            try {
                if (images.length && newNewReview) {
                    const formData = new FormData();
                    images.forEach((image) => {
                        formData.append("images", image);
                    })
                    await dispatch(postReviewImages(newNewReview.id, formData))
                }
            }
            catch (res) {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            };
        }
        navigate(`/products/${productId}`)
        setLoading(true);
    };

    const handleImages = async (e) => {
        const files = e.target.files;
        // const fileTypes = Array.from(files).forEach(file => console.log("file-type: ", file.type))
        const invalidFiles = Array.from(files).filter(file => !validFileTypes.includes(file.type));
        if (invalidFiles.length > 0) {
            setErrors(["Invalid file type, please try again"]);
            return;
        }
        // console.log("files: ", files);
        if (images.length + files.length > 4) {
            setErrors(["A review can have a max of 4 images"]);
            return;
        }
        const imageFiles = Array.from(files);
        // console.log("imageFiles: ", imageFiles)
        if (imageFiles.length > 0) {
            setPrevImages([...prevImages, ...imageFiles]);
            setImages([...images, ...imageFiles]);
            // console.log("prevImages: ", prevImages)
        }
    }

    // Handle form submission for creating a new Review
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            // user_id: user.id,
            product_id: productId,
            rating,
            headline,
            body,
            images
        };

        const validationErrors = validateForm(newReview);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        if (!images.length) { // check if at least one image is uploaded
            setErrors(["Must upload at least one image along with product"]);
        }

        // console.log("images: ", images);
        if (images.length) {
            try {
                // setLoading(true);
                const newReviewId = await dispatch(createReviewThunk(productId, newReview))
                if (images.length && newReviewId) {
                    console.log("im here: ", images);
                    const formData = new FormData();
                    images.forEach((image) => {
                        formData.append("images", image);
                    })
                    await dispatch(postReviewImages(newReviewId, formData))
                }
            }
            catch (res) {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            };
            navigate(`/products/${productId}`)
            setLoading(true);
        }
    }

    let previewImages;
    if (prevImages.length) {
        previewImages = (
            // <div className={'review-preview-images-container'}>
            prevImages.map((image, i) => {
                return (
                    <React.Fragment key={i}>
                        <div className="review-preview-image-btn-container">
                            <div
                                className="review-preview-image-btn"
                                onClick={(e) => handleImageRemove(e, i)}
                            />
                        </div>
                        <img
                            className={'review-preview-images-image'}
                            // src={image.url ? `${image.url}?${Date.now()}` : URL.createObjectURL(image)}
                            src={image.url ? image.url : URL.createObjectURL(image)}
                            alt={'preview'}
                        />
                    </React.Fragment>
                )
            })
            // </div>
        )
    }

    let reviewImages;
    if (review && review.images.length) {
        reviewImages = (
            <div className="review-preview-images-container">
                {images.map((image, i) => {
                    return (
                        <div key={i} className="review-preview-image-container">
                            <div className="review-preview-image-btn-container">
                                <div
                                    className="review-preview-image-btn"
                                    onClick={(e) => handleImageRemoveEdit(e, i)}
                                />
                            </div>
                            <img
                                className="review-preview-images-image"
                                src={image.url ? image.url : URL.createObjectURL(image)}
                                alt="preview"
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    const handleImageRemove = (e, i) => {
        e.preventDefault();
        const newImages = [...images];
        const newPrevImages = [...prevImages];
        // console.log(newImages);
        newImages.splice(i, 1);
        setImages(newImages);

        newPrevImages.splice(i, 1);
        setPrevImages(newPrevImages);
        if (newImages.length === 1) {
            setImage(newImages[0])
        }
    }

    const handleImageRemoveEdit = (e, i) => {
        e.preventDefault();
        const newImages = [...images];
        const newReviewImages = [...review.images];
        // console.log(newImages);
        const deletedImage = newImages.splice(i, 1)[0];
        let deletedImageId;
        if (deletedImage.id) {
            deletedImageId = deletedImage.id;
        } else {
            const deletedImageUrl = deletedImage.url;
            const matchingReviewImage = newReviewImages.find((img) => img.url === deletedImageUrl);
            deletedImageId = matchingReviewImage?.id;
        }
        newReviewImages.splice(i, 1);
        setImages(newImages);
        dispatch(deleteReviewImageThunk(deletedImageId));
        if (newImages.length === 1) {
            setImage(newImages[0])
        }

        const previewImageContainers = document.getElementsByClassName('review-preview-image-container');
        if (previewImageContainers.length === newReviewImages.length) {
            setPrevImage(newReviewImages[0]);
        }
        const updatedPreviewImages = Array.from(previewImageContainers);
        updatedPreviewImages.splice(i, 1);
        updatedPreviewImages.forEach((container, idx) => {
            const img = container.querySelector('.review-preview-images-image');
            if (img.src === deletedImage?.url) {
                setPrevImage(updatedPreviewImages[idx]?.querySelector('.review-preview-images-image') || updatedPreviewImages[idx - 1]?.querySelector('.review-preview-images-image') || null);
                newImages.splice(idx, 0, deletedImage);
            }
            container.querySelector('.preview-image-btn').setAttribute('onclick', `handleImageRemoveEdit(event, ${idx})`);
        });
        setPrevImages(newReviewImages?.map(image => ({ url: image.url })));
    };

    // Validate the form fields and return an array of error messages
    const validateForm = (form) => {
        const errors = [];

        if (!form.rating) {
            errors.push("A rating is required");
        } else if (form.rating > 5) {
            errors.push("Rating must be less than 5");
        } else if (form.rating < 1) {
            errors.push("Rating must be greater than 1")
        }

        if (!form.headline) {
            errors.push("A headline is required");
        } else if (form.headline.length > 50) {
            errors.push("Headline must be less than 50 characters");
        } else if (form.headline.length < 3) {
            errors.push("Headline must be at least 3 characters")
        }

        if (!form.body) {
            errors.push("A review body is required");
        } else if (form.body.length > 5000) {
            errors.push("Body msut be less than 5000 characters");
        } else if (form.body.length < 3) {
            errors.push("Body must be at least 3 characters")
        }

        return errors;
    };

    return (
        <div className="review-form-container">
            <div className="review-forms-wrapper">
                <div className="error-icon-container">
                    {errors.length ? <img src={error} className="error-icon" /> : ""}
                </div>
                {errors.length > 0 && (
                    <ul className="product-errors">
                        {errors.map((error, idx) => (
                            <li className="li-error" key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
                <div className="review-form-header">
                    <div className="review-form-title">
                        {review && formType === "edit" ? "Edit Review" : "Create Review"}
                    </div>
                    {formType === "edit" && (
                        <div onClick={deleteReview} className="review-form-delete">
                            Delete Review
                        </div>
                    )}
                </div>
                <form className="review-form" onSubmit={review && formType === "edit" ? handleEditSubmit : handleCreateSubmit} encType="multipart/form-data">
                    <div className="review-form-product-image-name">
                        <img className="review-form-product-image" src={product?.images?.[0]?.url} />
                        {/* {console.log("productImage: ", product?.images?.[0]?.url)} */}
                        <div className="review-form-product-name">
                            {product?.name}
                        </div>
                    </div>
                    <div className="review-form-input">
                        <label className="review-form-label" htmlFor="rating">Overall rating</label>
                        <div className="review-form-stars-container">
                            <img onClick={() => {
                                setRating(1);
                            }} alt="select to rate item one star" src={rating >= 1 ? star : emptyStar} />
                            <img onClick={() => {
                                setRating(2);
                            }} alt="select to rate item two star" src={rating >= 2 ? star : emptyStar} />
                            <img onClick={() => {
                                setRating(3);
                            }} alt="select to rate item three star" src={rating >= 3 ? star : emptyStar} />
                            <img onClick={() => {
                                setRating(4);
                            }} alt="select to rate item four star" src={rating >= 4 ? star : emptyStar} />
                            <img onClick={() => {
                                setRating(5);
                            }} alt="select to rate item five star" src={rating >= 5 ? star : emptyStar} />
                        </div>
                    </div>
                    <div className="review-form-input-headline">
                        <label className="review-form-label" htmlFor="headline">Add a headline</label>
                        <input
                            id="headline"
                            type="text"
                            placeholder="What's most important to know?"
                            className="review-input"
                            autoComplete="off"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                        />
                    </div>
                    <div className="review-image-input">
                        <div className="add-photo">
                            Add photo
                        </div>
                        <div className="shoppers-find">
                            Shoppers find images and videos more helpful than text alone.
                        </div>
                        <div className="total-images-container">
                            <label className="review-images-add" htmlFor="images"><img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjZweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjYgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJzaHJpbmtJbWFnZUNUQS04MCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImV4cGwtY29weS0yMjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00Ny4wMDAwMDAsIC0zMjMuMDAwMDAwKSIgZmlsbD0iI0FBQjdCOCIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9ImFzaW5NZXRhIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImFkZE1lZGlhIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMTAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcuMDAwMDAwLCAxNy4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA1Ny4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTaGFwZSIgcG9pbnRzPSI0NC4zIDQxLjcgNDQuMyAzMCA0MS43IDMwIDQxLjcgNDEuNyAzMCA0MS43IDMwIDQ0LjMgNDEuNyA0NC4zIDQxLjcgNTYgNDQuMyA1NiA0NC4zIDQ0LjMgNTYgNDQuMyA1NiA0MS43Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" /></label>
                            {formType === "edit" ? reviewImages : previewImages}
                        </div>
                        <input
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            id="images"
                            onChange={handleImages}
                            className="file-input"
                        />
                    </div>
                    <div className="review-form-input">
                        <label className="review-form-label" htmlFor="body">Add a written review</label>
                        <textarea
                            id="body"
                            className="textarea-field"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="What did you like or dislike? What did you use this product for?"
                        />
                    </div>
                    <div className="product-form-button-container">
                        <button onClick={() => setLoading(true)} className="form-submit" type="submit">{review && formType === "edit" ? "Save" : "Submit"}</button>
                        {loading && (<div className="loading-spinner"><img src={spinner} className="spinner" /><div className="loading">Loading...</div></div>)}
                        <button className="form-cancel" type="button" onClick={() => {
                            if (review && formType === "edit") {
                                navigate(`/products/${productId}`);
                            }
                        }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;
