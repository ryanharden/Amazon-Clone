import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { getProductThunk } from '../../../store/products';

const CartShow = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.CartItem);
    const product = useSelector(state => state.Products.singleProduct);

    const productIds = Object.keys(cartItems);

    useEffect(() => {
        productIds.forEach(productId => dispatch(getProductThunk(productId)))
    }, [dispatch, cartItems])

    if (!productIds.length)
        return (
            <div className='empty-cart-container'>
                <div className='empty-cart-header'>
                    Your Rainforest Retail cart is empty.
                </div>
                <Link to={"/"} className="empty-cart-link">Continue Shopping</Link>
            </div>
        )
    // cartItems = [{productID, quantity}, {productId, quantity}]
    // {1, 5}
    const quantityArr = Object.values(cartItems)
    const numCartItems = sum(quantityArr)
    // const subTotal =
}
