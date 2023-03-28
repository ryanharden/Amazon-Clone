import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, editReviewThunk, deleteReviewThunk, postReviewImages, deleteReviewImageThunk } from "../../../store/reviews";
import "./ProductForm.css";
import emptyImage from "../../../assets/emtpy-image.jpeg";
import error from "../../../assets/dialog-error.248x256.png";
import spinner from "../../../assets/Iphone-spinner-2.gif";



const validFileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

const ReviewForm = ({ formType, product }) => {
    const emptyStar = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzgiIGhlaWdodD0iMzUiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMTkgMGwtNS44NyAxMS41MkwwIDEzLjM3bDkuNSA4Ljk3TDcuMjYgMzUgMTkgMjkuMDIgMzAuNzUgMzVsLTIuMjQtMTIuNjYgOS41LTguOTctMTMuMTMtMS44NXoiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjQTI2QTAwIiBzdHJva2Utb3BhY2l0eT0iLjc1IiBkPSJNMTkgMS4xbC01LjU0IDEwLjg4TDEuMSAxMy43Mmw4Ljk0IDguNDRMNy45MiAzNC4xIDE5IDI4LjQ2bDExLjA4IDUuNjQtMi4xMS0xMS45NCA4Ljk0LTguNDQtMTIuMzYtMS43NEwxOSAxLjF6Ii8+PC9nPjwvc3ZnPg==";
    const star = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzgiIGhlaWdodD0iMzUiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjUwJSIgeDI9IjUwJSIgeTE9IjI3LjY1JSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkNFMDAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkE3MDAiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGlkPSJiIiBkPSJNMTkgMGwtNS44NyAxMS41MkwwIDEzLjM3bDkuNSA4Ljk3TDcuMjYgMzUgMTkgMjkuMDIgMzAuNzUgMzVsLTIuMjQtMTIuNjYgOS41LTguOTctMTMuMTMtMS44NXoiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjQTI2QTAwIiBzdHJva2Utb3BhY2l0eT0iLjc1IiBkPSJNMTkgMS4xbC01LjU0IDEwLjg4TDEuMSAxMy43Mmw4Ljk0IDguNDRMNy45MiAzNC4xIDE5IDI4LjQ2bDExLjA4IDUuNjQtMi4xMS0xMS45NCA4Ljk0LTguNDQtMTIuMzYtMS43NEwxOSAxLjF6Ii8+PC9nPjwvc3ZnPg=="
    const product = useSelector(state => state.Products.singleProduct)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)

    const [rating, setRating] = useState(0);
    const [headline, setHeadline] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [prevImages, setPrevImages] = useState([]);
    const [errors, setErrors] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRating(review?.rating || 0);
        setHeadline(review?.headline || "");
        setBody(review?.body || "");
        setImage(product?.images || null);
        setImages(product?.images || []);
        setPrevImages([]);
        setErrors([]);
    }, [review]);

    // Handle form submission for editing an existing product
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (document.getElementsByClassName("preview-images-image").length === 0) {
            setErrors(["Product must have at least one image"]);
            return;
        }

        const editedProduct = {
            id: product.id,
            name,
            description,
            category,
            price,
            inventory,
        };

        const validationErrors = validateForm(editedProduct);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }


        // console.log("editedProduct: ", editedProduct)
        const newNewProduct = await dispatch(editProductThunk(editedProduct));
        // console.log("newNewProduct: ", newNewProduct)
        if (images.length > 0 && newNewProduct) {
            try {
                if (images.length && newNewProduct) {
                    const formData = new FormData();
                    images.forEach((image) => {
                        formData.append("images", image);
                    })
                    await dispatch(postProductImages(newNewProduct.id, formData))
                }
            }
            catch (res) {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            };
        }
        navigate(`/users/${user.id}/products`)
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
        if (images.length + files.length > 6) {
            setErrors(["A product can have a max of 6 images"]);
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

    // Handle form submission for creating a new product
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            category,
            price,
            inventory,
            images
        };
        // console.log("newProduct: ", newProduct)

        const validationErrors = validateForm(newProduct);
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
                const newProductId = await dispatch(createProductThunk(newProduct))
                if (images.length && newProductId) {
                    // console.log("im here: ", images);
                    const formData = new FormData();
                    images.forEach((image) => {
                        formData.append("images", image);
                    })
                    await dispatch(postProductImages(newProductId, formData))
                }
            }
            catch (res) {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            };
            navigate(`/users/${user.id}/products`)
            setLoading(true);
        }
    }

    let previewImages;
    if (prevImages.length) {
        previewImages = (
            <div className={'preview-images-container'}>
                {prevImages.map((image, i) => {
                    return (
                        <div key={i} className='preview-image-container' >
                            <button
                                className={'preview-image-btn'}
                                onClick={(e) => handleImageRemove(e, i)}
                            >x</button>
                            <img
                                className={'preview-images-image'}
                                // src={image.url ? `${image.url}?${Date.now()}` : URL.createObjectURL(image)}
                                src={image.url ? image.url : URL.createObjectURL(image)}
                                alt={'preview'}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    let productImages;
    if (product && product.images.length) {
        productImages = (
            <div className="preview-images-container">
                {images.map((image, i) => {
                    return (
                        <div key={i} className="preview-image-container">
                            <button
                                className="preview-image-btn"
                                onClick={(e) => handleImageRemoveEdit(e, i)}
                            >x</button>
                            <img
                                className="preview-images-image"
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
        const newProductImages = [...product.images];
        // console.log(newImages);
        const deletedImage = newImages.splice(i, 1)[0];
        let deletedImageId;
        if (deletedImage.id) {
            deletedImageId = deletedImage.id;
        } else {
            const deletedImageUrl = deletedImage.url;
            const matchingProductImage = newProductImages.find((img) => img.url === deletedImageUrl);
            deletedImageId = matchingProductImage?.id;
        }
        newProductImages.splice(i, 1);
        setImages(newImages);
        dispatch(deleteImageThunk(deletedImageId));
        if (newImages.length === 1) {
            setImage(newImages[0])
        }

        const previewImageContainers = document.getElementsByClassName('preview-image-container');
        if (previewImageContainers.length === newProductImages.length) {
            setPrevImage(newProductImages[0]);
        }
        const updatedPreviewImages = Array.from(previewImageContainers);
        updatedPreviewImages.splice(i, 1);
        updatedPreviewImages.forEach((container, idx) => {
            const img = container.querySelector('.preview-images-image');
            if (img.src === deletedImage?.url) {
                setPrevImage(updatedPreviewImages[idx]?.querySelector('.preview-images-image') || updatedPreviewImages[idx - 1]?.querySelector('.preview-images-image') || null);
                newImages.splice(idx, 0, deletedImage);
            }
            container.querySelector('.preview-image-btn').setAttribute('onclick', `handleImageRemoveEdit(event, ${idx})`);
        });
        setPrevImages(newProductImages?.map(image => ({ url: image.url })));
    };

    // Validate the form fields and return an array of error messages
    const validateForm = (form) => {
        const errors = [];

        if (!form.name) {
            errors.push("Name is required");
        } else if (form.name.length > 300) {
            errors.push("Name must be less than 255 characters");
        } else if (form.name.length < 3) {
            errors.push("Name must be at least 3 characters")
        }

        if (!form.description) {
            errors.push("Description is required");
        } else if (form.description.length > 5000) {
            errors.push("Description must be less than 5000 characters");
        } else if (form.description.length < 3) {
            errors.push("Description must be at least 3 characters")
        }

        if (!form.category) {
            errors.push("Category is required");
        }

        if (form.price === "" || parseFloat(form.price) === 0 || parseFloat(form.price) > 99999.99) {
            errors.push("Price must be a number greater than 0 and less than 99999.99");
        } else if (isNaN(form.price)) {
            errors.push("Price must be a number")
        }

        if (form.inventory === "" || parseInt(form.inventory) < 1) {
            errors.push("Inventory must be a number greater than 0");
        }

        return errors;
    };

    return (
        <div className="product-create-edit-container">
            <div className="forms-wrapper">
                <h2>{formType === "create" ? "List a Product" : "Edit Product"}</h2>
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
                <form className="form" onSubmit={formType === "create" ? handleCreateSubmit : handleEditSubmit} encType="multipart/form-data">
                    <div className="product-image-input">
                        <label className="product-image-label" htmlFor="images">Select Product Images</label>
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
                    {formType === "edit" ? productImages : previewImages}
                    {/* {previewImages} */}
                    <div className="product-form-input">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="product-form-input">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="product-form-input">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>--Select a Category--</option>
                            {categories.map((ele, indx) => (
                                <option key={indx} value={ele}>
                                    {ele}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="product-form-input">
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="product-form-input">
                        <label htmlFor="inventory">Inventory</label>
                        <input
                            id="inventory"
                            type="number"
                            min="0"
                            value={inventory}
                            onChange={(e) => setInventory(e.target.value)}
                        />
                    </div>
                    <div className="product-form-button-container">
                        <button onClick={() => setLoading(true)}className="form-submit" type="submit">{formType === "create" ? "Create" : "Save"}</button>
                        {loading && (<div className="loading-spinner"><img src={spinner} className="spinner"/><div className="loading">Loading...</div></div>)}
                        <button className="form-cancel" type="button" onClick={() => {
                            if (!images.length && !product.images.length && formType === "edit") {
                                setErrors(["Cannot Cancel without having at least one image"]);
                            } else {
                                navigate(`/users/${user.id}/products`);
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
