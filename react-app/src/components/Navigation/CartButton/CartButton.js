import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import setUser from "../../../store/session";
import "./CartButton.css";
import { getCartItemsThunk } from "../../../store/cartitem";

const CartButton = () => {
    const cartItems = useSelector(state => state.CartItems);
    const cartItemsArr = Object.values(cartItems);
    const user = useSelector(state => state.session.user);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            // If there is a user, dispatch the getCartItemsThunk to get the cart items for the current user
            dispatch(getCartItemsThunk());
        }
    }, [dispatch, user]);

    useEffect(() => {
        // Update the cart quantity when the cartItems state changes
        setQuantity(findQuantity(Object.values(cartItems)));
    }, [cartItems]);

    const findQuantity = (arr) => {
        let totalQuantity = 0;
        arr.forEach(item => {
            totalQuantity += item.quantity
        })
        return totalQuantity
    };

    // const quantity = findQuantity(cartItemsArr);
    const qClassName = "cart-quantity" + (quantity < 10 ? "" : " ten");
    return (
        <Link to="/cart" className="cart-button-container">
            <div className={qClassName}>{user ? quantity : 0}</div>
            <div className="cart-cart-image">
                <div className="cart-image" />
                <div className="cart-title">Cart</div>
            </div>
        </Link>
    )
}
export default CartButton;
