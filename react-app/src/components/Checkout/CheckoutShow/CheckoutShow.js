import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import "./CheckoutShow.css";
import CheckoutHeader from '../CheckoutHeader/CheckoutHeader';
import CheckoutItem from '../CheckoutItem/CheckoutItem';
import OrderCard from '../OrderCard/OrderCard';
import { getProductThunk } from '../../../store/products';
import primeCard from "../../../assets/amazon-prime-card.png";

const CheckoutShow = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.Cartitems);
    const currentUser = useSelector(state => state.session.user);
    const cartItemsArr = Object.values(cartItems);

    useEffect(() => {
        cartItemsArr.forEach(item => {
            dispatch(getProductThunk(item.product_id))
        })
    }, [dispatch, cartItems])

    const getTotal = (Arr) => {
        let total = 0;
        if (Arr.length) {
            Arr.forEach(item => {
                total += item.price * item.quantity
            })
            return total;
        }
    }
    const subtotal = parseFloat(getTotal(cartItemsArr)).toFixed(2);

    const numItems = cartItems.length

    let items;
    if (cartItems && cartItemsArr.length) {
        items = cartItemsArr.map(cartitem => {
            return <CheckoutItem key={cartitem.id} product={cartitem} quantity={cartitem.quantity} />
        })
    }

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
                                    1234 Noneya Street
                                </div>
                                <div className='checkout-city-state-zip'>
                                    Your mom, Ca 92019
                                </div>
                            </div>
                            <div className='change'>
                                Change
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
                                    <div className='card-title'>
                                        Rainforest Retail Prime Rewards Visa Signature Card <span className='ending-in'>ending in 4819</span>
                                    </div>
                                    <div className='earns'>
                                        Earns 5% cash back
                                    </div>
                                </div>
                                <div className='billing-shipping-add'>
                                    Billing address: Same as shipping address.
                                </div>
                            </div>
                            <div className='change'>
                                Change
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
                                {items}
                            </div>
                        </div>
                        <div className='bottom-place-order'>
                            <div className='bottom-place-order-button'>
                                Place your order
                            </div>
                            <div className='checkout-order-total'>
                                <div className='order-total-title'>
                                    Order total: ${parseFloat(getTotal(cartItemsArr)).toFixed(2)}
                                </div>
                                <div className='by-conditions'>
                                    By placing your order, you agree to Rainforest Retail's privacy notice and conditions of use.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='checkout-right-container'>
                    <OrderCard numItems={numItems} subtotal={subtotal} />
                </div>
            </div>
        </>
    )
}
export default CheckoutShow;
