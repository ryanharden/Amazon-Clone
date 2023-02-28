import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { getProductsThunk } from '../../../store/products';
import { getCartItemsThunk } from '../../../store/cartitem';

const CartShow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    const product = useSelector(state => state.Products.singleProduct);
    const sessionUser = useSelector(state => state.session.user);
    const cartItems = useSelector(state => state.CartItems);
    const cartItemsArr = Object.values(cartItems);
    const products = useSelector(state => state.Products.allProducts);

    console.log(cartItemsArr);

    // useEffect(() => {
    //     dispatch(getCartItemsThunk());
    // }, [dispatch])
    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCartItemsThunk());
    }, [dispatch])

    // const numCartItems = sum(cartItemsArr)

    // const getTotal = (Arr) => {
    //     let total = 0;
    //     if (Arr.length) {
    //         Arr.forEach(item => {
    //             total += item.price * item.quantity
    //         })
    //         return total;
    //     }
    // }
    useEffect(() => {
        let total = 0;
        cartItemsArr.forEach(item => {
            const product = products[item.product_id];
            if (product) {
                total += product.price * item.quantity;
            }
        });
        setTotalPrice(total);
    }, [cartItemsArr, products])

    if (!cartItems && !cartItemsArr.length)
        return (
            <div className='empty-cart-container'>
                <div className='empty-cart-header'>
                    Your Rainforest Retail cart is empty.
                </div>
                <Link to={"/"} className="empty-cart-link">Continue Shopping</Link>
            </div>
        )

    // let items;
    // if (cartItems && cartItemsArr.length) {
    //     items = cartItemsArr.map(cartitem => {
    //         const product = dispatch(getProductThunk(cartitem.product_id))
    //         return <CartItem key={cartitem.id} product={product} quantity={cartitem.quantity} />
    //     })
    // }
    const cartItemsWithProduct = cartItemsArr.map(cartitem => {
        const product = products[cartitem.product_id];
        if (!product) return null;
        return <CartItem key={cartitem.id} product={product} quantity={cartitem.quantity} />
    })

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
                    {/* {items} */}
                    {cartItemsWithProduct}
                </div>
                <div className='cart-footer'>
                    Subtotal ({cartItemsArr.length} item{cartItemsArr.length > 1 && "s"}): ${parseFloat(totalPrice).toFixed(2)}
                </div>
            </div>
            <div className='right-cart-container'>
                <div className='right-cart-header'>
                    Subtotal ({cartItemsArr.length} item{cartItemsArr.length > 1 && "s"}): ${parseFloat(totalPrice).toFixed(2)}
                </div>
                <Link to={"/checkout"} className="cart-show-link">
                    Proceed to checkout
                </Link>
            </div>
        </div>
    )
}

export default CartShow;
