import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { getProductThunk } from '../../../store/products';
import { getCartItemsThunk } from '../../../store/cartitem';

const CartShow = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const product = useSelector(state => state.Products.singleProduct);
    const sessionUser = useSelector(state => state.session.user);
    const cartItems = useSelector(state => state.CartItem);
    const cartItemsArr = Object.values(cartItems);

    useEffect(() => {
        dispatch(getCartItemsThunk());
    }, [dispatch])

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

    const proceed = async () => {
        history.push('/checkout')
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
                <div className='proceed-to-checkout' onClick={proceed}>
                    Proceed to checkout
                </div>
            </div>
        </div>
    )
}

export default CartShow;
