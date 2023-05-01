import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import "./CheckoutShow.css";
import CheckoutHeader from '../CheckoutHeader/CheckoutHeader';
import CheckoutItem from '../CheckoutItem/CheckoutItem';
import OrderCard from '../OrderCard/OrderCard';
import { getProductsThunk, getProductThunk } from '../../../store/products';
import primeCard from "../../../assets/amazon-prime-card.png";
import { getCartItemsThunk, emptyCartThunk } from '../../../store/cartitem';
import { useNavigate } from 'react-router-dom';
import { createOrderThunk } from '../../../store/orders';

const CheckoutShow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.CartItems);
    const currentUser = useSelector(state => state.session.user);
    const cartItemsArr = Object.values(cartItems);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numCartItems, setNumCartItems] = useState(0);
    const products = useSelector(state => state.Products.allProducts);
    const [loading, setLoading] = useState(false);
    const [click, setClick] = useState(false);

    const handleChange = () => {
        setClick(true);
    }

    const handleOrder = async () => {
        await dispatch(createOrderThunk({cart: cartItems}));
        dispatch(emptyCartThunk())
        navigate('/placedorder')
    }

    useEffect(() => {
        dispatch(getCartItemsThunk());
        dispatch(getProductsThunk())
    }, [dispatch]);

    useEffect(() => {
        if (cartItemsArr.length > 0) {
            const productsInCart = cartItemsArr.forEach(item => {
                dispatch(getProductThunk(item.product_id))
            })
        }
    }, [dispatch, cartItemsArr])

    useEffect(() => {
        let total = 0;
        cartItemsArr?.forEach(item => {
            const product = products[item.product_id];

            if (product) {
                total += product.price * item.quantity;
                // console.log("total: ", total);
            }
        });
        setTotalPrice(total);
        setNumCartItems(cartItemsArr.reduce((acc, curr) => acc + curr.quantity, 0));
    }, [cartItems, products])

    const numItems = Object.values(cartItems).length

    const cartItemsWithProduct =
        cartItemsArr.map(cartitem => {
            const product = products[cartitem.product_id];
            if (!product) return null;
            return <CheckoutItem key={cartitem.id} product={product} quantity={cartitem.quantity} cartItem={cartitem} />
        });
    // console.log("cartItemsWithProduct: ", cartItemsWithProduct)

    // console.log("cartItemsArr: ", cartItemsArr)

    if (!cartItemsWithProduct.length) return null;

    return (
        <>
            <CheckoutHeader numItems={numItems} />
            <div className='checkout-show-container'>
                <div className='checkout-left-container'>
                    <div className='shipping-address-container'>
                        <div className='left-shipping'>
                            <div className='step'>
                                1
                            </div>
                            <div className='shipping-title'>
                                Shipping address
                            </div>
                        </div>
                        <div className='right-shipping'>
                            <div className='name-address'>
                                <div className='user-name'>
                                    {currentUser.first_name} {currentUser.last_name}
                                </div>
                                <div className='checkout-address'>
                                    3548 Bodega Bay Dr.
                                </div>
                                <div className='checkout-city-state-zip'>
                                    Jenner, Ca, 92091
                                </div>
                            </div>
                            <div onClick={handleChange} className='change'>
                                {click ? "Feature Coming Soon" : "Change"}
                            </div>
                        </div>
                    </div>
                    <div className='payment-method-container'>
                        <div className='left-payment'>
                            <div className='step'>
                                2
                            </div>
                            <div className='shipping-title'>
                                Payment method
                            </div>
                        </div>
                        <div className='right-payment'>
                            <div className='card-info'>
                                <div className='card-stuff'>
                                    <div className='prime-card'>
                                        <img src={primeCard} alt="prime-card" className='prime-card-image' />
                                    </div>
                                    <div className='card-earns'>
                                        <div className='checkout-card-title'>
                                            Rainforest Retail Prime Rewards Visa Signature Card <span className='ending-in'> ending in 4819</span>
                                        </div>
                                        <div className='earns'>
                                            Earns 5% cash back
                                        </div>
                                    </div>
                                </div>
                                <div className='billing-shipping-add'>
                                    Billing address: Same as shipping address.
                                </div>
                            </div>
                            <div onClick={handleChange} className='change'>
                                {click ? "Feature Coming Soon" : "Change"}
                            </div>
                        </div>
                    </div>
                    <div className='review-items-container'>
                        <div className='review-items-header'>
                            <div className='step'>
                                3
                            </div>
                            <div className='review-items-title'>
                                Review items and shipping
                            </div>
                        </div>
                        {cartItemsArr.length >= 1 &&
                            <div className='checkout-items-container'>
                                <div className='checkout-items-header'>
                                    <div className='delivery-time'>
                                        Delivery: Overnight 7 AM - 9 AM
                                    </div>
                                    <div className='checkout-items-shipped'>
                                        Items shipped from Rainforest Retail
                                    </div>
                                </div>
                                <div className='checkout-items'>
                                    {cartItemsWithProduct}
                                </div>
                            </div>
                        }
                        <div className='bottom-place-order'>
                            <div onClick={handleOrder} className='bottom-place-order-button'>
                                Place your order
                            </div>
                            <div className='checkout-order-total'>
                                <div className='order-total-title'>
                                    Order total: ${parseFloat(totalPrice).toFixed(2)}
                                </div>
                                <div className='by-conditions'>
                                    By placing your order, you agree to Rainforest Retail's privacy notice and conditions of use.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='checkout-right-container'>
                    <OrderCard numItems={numItems} subtotal={totalPrice} handleOrder={handleOrder} />
                </div>
            </div>
        </>
    )
}
export default CheckoutShow;
