import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

    // Define initial state values for the form fields
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [category, setCategory] = useState(product?.category || "");
    const [price, setPrice] = useState(product?.price || "");
    const [inventory, setInventory] = useState(product?.inventory || "");
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
        };

        const validationErrors = validateForm(newProduct);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        dispatch(createProductThunk(newProduct))
            .then(() => history.push(`users/${user.id}/products`))
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
        };

        const validationErrors = validateForm(editedProduct);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        dispatch(editProductThunk(editedProduct))
            .then(() => history.push(`users/${user.id}/products`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    };

    // Handle form submission for uploading product images
    const handleImageSubmit = (e) => {
        // TODO: Implement image upload logic
    };

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
        }

        if (form.inventory === "" || parseInt(form.inventory) < 1) {
            errors.push("Inventory must be a number greater than 0");
        }

        return errors;
    };

    return (
        <form onSubmit={formType === "create" ? handleCreateSubmit : handleEditSubmit}>
            <h2>{formType === "create" ? "List a Product" : "Edit Product"}</h2>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            )}
            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

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

            <label htmlFor="price">Price</label>
            <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="inventory">Inventory</label>
            <input
                id="inventory"
                type="number"
                min="0"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
            />

            {formType === "edit" && (
                <div>
                    <h3>Images</h3>
                    {/* TODO: Render images */}
                    <form onSubmit={handleImageSubmit}>
                        {/* TODO: Implement image upload */}
                    </form>
                </div>
            )}

            <div className="product-form-button-container">
                <button type="submit">{formType === "create" ? "Create" : "Save"}</button>
                <button type="button" onClick={() => history.push(`users/${user.id}/products`)}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default ProductForm;
