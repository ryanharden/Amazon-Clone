import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CartButton.css";

const CartButton = () => {
    const cartItems = useSelector(state => state.CartItems);
    const cartItemsArr = Object.values(cartItems);

    const findQuantity = (arr) => {
        let quantity = 0;
        arr.forEach(item => {
            quantity += item.quantity
        })
        return quantity
    };

    const quantity = findQuantity(cartItemsArr);

    return (
        <Link to="/cart" className="cart-button-container">
            <div className="cart-quantity">{quantity}</div>
            <div className="cart-cart-image">
                <div className="cart-image" />
                <div className="cart-title">Cart</div>
            </div>
        </Link>
    )
}
export default CartButton;
