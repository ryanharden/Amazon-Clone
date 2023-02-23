import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductsThunk } from "../../../../store/products";
import { deleteProductThunk } from "../../../../store/products";
import "./UserProductItem.css";
import moment from "moment";

const UserProductItem = ({ product }) => {
    // const currentUser = useSelector(state => state.session.user);
    // const {userId} = useParams();
    const dispatch = useDispatch();
    const deleteProduct = () => {
        dispatch(deleteProductThunk(product.id))
    };

    return (
        <div className="user-product-item-container">
            <div className="user-product-image-container">
                <Link className="image-link" to={`/products/${product.id}`}>
                    <img
                        src={product.product_image_url}
                        alt={product.name}
                        className="user-product-image"
                    />
                </Link>
            </div>
            <div className="user-product-name-container">
                <div className="name-header">
                    Product Name
                </div>
                <div className="product-name">
                    {product.name.slice(0, 50)}...
                </div>
            </div>
            <div className="user-product-category-container">
                <div className="category-header">
                    Category
                </div>
                <div className="product-category">
                    {product.category}
                </div>
            </div>
            <div className="user-product-price-container">
                <div className="price-header">
                    Price
                </div>
                <div className="product-price">
                    {product.price.toFixed(2)}
                </div>
            </div>
            <div className="user-product-inventory-container">
                <div className="inventory-header">
                    Inventory
                </div>
                <div className="product-inventory">
                    {product.inventory}
                </div>
            </div>
            <div className="user-product-created-container">
                <div className="created-header">
                    Date Listed
                </div>
                <div className="product-created">
                    {moment(product?.created_at).fromNow()}
                </div>
            </div>
            <Link to={`/editproduct/${product.id}`}>
                <div className="edit-product-container">
                    Edit
                </div>
            </Link>
            <div className="delete-product-container">
                <div className="delete-product" onClick={deleteProduct}>
                    Delete
                </div>
            </div>
        </div>
    )
}

export default UserProductItem;
