import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk, editProductThunk } from "../../../store/products";


const categories = [
    "Automotive",
    "Appliances",
    "Baby",
    "Beauty & Personal Care",
    "Books",
    "Cell Phones",
    "Clothing, Shoes",
    "Computers",
    "Electronics",
    "Garden & Outdoor",
    "Grocery",
    "Health & Household",
    "Home & Kitchen",
    "Luggage & Travel Gear",
    "Musical Instruments",
    "Office Products",
    "Pet Supplies",
    "Sports & Outdoors",
    "Tools & Home Improvement",
    "Toys",
]

const ProductForm = ({ formType, product }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const {productId} = useParams();

    // Define initial state values for the form fields
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [category, setCategory] = useState(product?.category || "");
    const [price, setPrice] = useState(product?.price || "");
    const [inventory, setInventory] = useState(product?.inventory || "");
    const [image, setImage] = useState(product?.product_images || null);
    const [images, setImages] = useState(product?.product_images || []);
    const [imageLoading, setImageLoading] = useState(false);
    // const imageRef = useRef(null)

    // Handle form submission for creating a new product
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            category,
            price,
            inventory,
            product_images: images,
            image
        };

        const validationErrors = validateForm(newProduct);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        dispatch(createProductThunk(newProduct))
            .then(() => history.push(`/users/${user.id}/products`))
            .catch(async (res) => {
                console.log('res:', res);
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

    }
    // Handle form submission for editing an existing product
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const editedProduct = {
            id: product.id,
            name,
            description,
            category,
            price,
            inventory,
            product_images: images,
            image
        };

        const validationErrors = validateForm(editedProduct);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("editedProduct: ", editedProduct)
        dispatch(editProductThunk(editedProduct))
            .then(() => history.push(`/users/${user.id}/products`))
            .catch(async (res) => {
                console.log("res: ", res);
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    };

    const handleImages = (e) => {
        const files = e.target.files;
        if (files.length === 1) setImage(e.target.files[0]);
        else setImage(null);
        setImages([...images, ...files]);
    }

    let previewImages;

    if (images.length) {
        previewImages = (
            <div className={'preview-images-container'}>
                {images.map((image, i) => {
                    return (
                        <div key={i} className={'preview-image-container'}>
                            <button
                                className={'preview-image-btn'}
                                onClick={(e) => handleImageRemove(e, i)}
                            >x</button>
                            <img
                                className={'preview-images-image'}
                                src={URL.createObjectURL(image)}
                                alt={'preview'}
                            />
                        </div>
                    )
                })}
            </div>
        )
    } else {
        previewImages = (
            <>
            </>
        )
    }

    // Handle form submission for uploading product images
    const handleImageSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log("images :", images);
        Array.from(images).forEach((image) => {
            formData.append("image", image);
        })
        console.log("images :", images);
        // console.log("images 0 name :", images[0].name)

        // images.forEach((image, index) => {
        //     formData.append(`image_${index}`, image);
        // });
        // formData.append("image[]", images ? images : image);
        console.log("formData: ", formData)
        setImageLoading(true);
        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            // setImageLoading(false);
            // setImage(data)
        }
    };

    const handleImageRemove = (e, i) => {
        e.preventDefault();
        const newImages = [...images];
        newImages.splice(i, 1);
        setImages(newImages);
        if (newImages.length === 1) {
            setImage(newImages[0])
        }
    }

    // Validate the form fields and return an array of error messages
    const validateForm = (form) => {
        const errors = [];

        if (!form.name) {
            errors.push("Name is required");
        } else if (form.name.length > 255) {
            errors.push("Name must be less than 255 characters");
        }

        if (!form.description) {
            errors.push("Description is required");
        } else if (form.description.length > 5000) {
            errors.push("Description must be less than 5000 characters");
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
            <h2>{formType === "create" ? "List a Product" : "Edit Product"}</h2>
            <form onSubmit={handleImageSubmit} className="pic-upload" encType="multipart/form-data">
                <div className="form-input">
                    <label htmlFor="images[]">Upload Your Product Images</label>
                    <input
                        type="file"
                        name="images[]"
                        multiple
                        accept="image/*"
                        onChange={handleImages}
                    />
                </div>
                {previewImages}
                <button type="submit" className="submit-images-button">Upload Image(s)</button>

            </form>
            <form onSubmit={formType === "create" ? handleCreateSubmit : handleEditSubmit}>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
                <div className="form-input">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">--Select a Category--</option>
                        {categories.map((ele, indx) => (
                            <option key={indx} value={ele}>
                                {ele}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-input">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-input">
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
                    <button type="submit">{formType === "create" ? "Create" : "Save"}</button>
                    <button type="button" onClick={() => history.push(`users/${user.id}/products`)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm;
