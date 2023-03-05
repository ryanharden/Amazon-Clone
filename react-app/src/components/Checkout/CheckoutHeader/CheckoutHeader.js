import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getProductThunk } from "../../../store/products";
import "./CheckoutHeader.css";
import { getCartItemsThunk } from "../../../store/cartitem";

const CheckoutHeader = ({ numItems }) => {
    // const [numCartItems, setNumCartItems] = useState(0);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.CartItems);
    console.log("cartItems:", cartItems)
    const cartItemsArr = Object.values(cartItems);

    useEffect(() => {
        dispatch(getCartItemsThunk())
    }, [dispatch])
    // const [numCartItems, setNumCartItems] = useState(0);
    // const products = useSelector(state => state.Products.allProducts);

    // useEffect(() => {
    //     cartItemsArr.forEach(item => {
    //         dispatch(getProductThunk(item.product_id))
    //     })
    // }, [dispatch, cartItems])

    // useEffect(() => {
    //     setNumCartItems(cartItemsArr.reduce((acc, curr) => acc + curr.quantity, 0));
    // }, [cartItems, products])
    // console.log("numItems: ", numItems);
    return (
        <div className="checkout-header-container">
            <div className="checkout-header">
                <Link to={"/"} className="checkout-link">Rainforest Retail</Link>
                <div className="checkout-header-items">
                    <div className="checkout-title">
                        Checkout
                    </div>
                    <Link to={"/cart"} className="checkout-numitems">({cartItemsArr.length} item{cartItemsArr.length > 1 && "s"})</Link>
                </div>
                <i className="fa-solid fa-lock"></i>
            </div>
        </div>
    )
};
export default CheckoutHeader;
