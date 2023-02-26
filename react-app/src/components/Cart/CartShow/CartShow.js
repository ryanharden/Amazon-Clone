import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { getProductThunk } from '../../../store/products';
import { getCartItemsThunk } from '../../../store/cartitem';

const CartShow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector(state => state.Products.singleProduct);
    const sessionUser = useSelector(state => state.session.user);
    const cartItems = useSelector(state => state.CartItem);
    const cartItemsArr = Object.values(cartItems);

    useEffect(() => {
        dispatch(getCartItemsThunk());
    }, [dispatch, cartItems])

    // const numCartItems = sum(cartItemsArr)

    const getTotal = (Arr) => {
        let total = 0;
        if (Arr.length) {
            Arr.forEach(item => {
                total += item.price * item.quantity
            })
            return total;
        }
    }

    if (!cartItems && !cartItemsArr.length)
        return (
            <div className='empty-cart-container'>
                <div className='empty-cart-header'>
                    Your Rainforest Retail cart is empty.
                </div>
                <Link to={"/"} className="empty-cart-link">Continue Shopping</Link>
            </div>
        )

    let items;
    if (cartItems && cartItemsArr.length) {
        items = cartItemsArr.map(cartitem => {
            return <CartItem key={cartitem.id} cartitem={cartitem} />
        })
    }

    return (
        <div className="cart-container">
            <div className='left-cart-container'>
                <div className='left-cart-header'>
                    <div className="shopping-cart">
                        Shopping Cart
                    </div>
                    <div className='cart-price'>
                        Price
                    </div>
                </div>
                <div className='cart-items-wrapper'>
                    {items}
                </div>
                <div className='cart-footer'>
                    Subtotal ({cartItemsArr.length} item{cartItemsArr.length > 1 && "s"}): ${parseFloat(getTotal(cartItemsArr)).toFixed(2)}
                </div>
            </div>
            <div className='right-cart-container'>
                <div className='right-cart-header'>
                    Subtotal ({cartItemsArr.length} item{cartItemsArr.length > 1 && "s"}): ${parseFloat(getTotal(cartItemsArr)).toFixed(2)}
                </div>
                <Link to={"/checkout"} className="cart-show-link">
                    Proceed to checkout
                </Link>
            </div>
        </div>
    )
}

export default CartShow;
