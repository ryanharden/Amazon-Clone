import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../../store/products';
import { getOrdersThunk } from '../../store/orders';
// import { getCartItemsThunk} from '../../../store/cartitem';
import chevright from "../../assets/chevron-right.png";
import "./PlacedOrder.css";

const PlacedOrder = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.Products.allProducts);
    const allProductsArr = Object.values(products);
    const currentUser = useSelector(state => state.session.user);
    const order = useSelector(state => state.Orders)[0];

    const order_images = [];
    order?.order_items?.forEach(item => order_images.push(allProductsArr[item.product_id]?.images[0].url))
    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getOrdersThunk());
    }, [dispatch])

    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    deliveryDate = deliveryDate.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });

    const basicsArr = allProductsArr.filter(product => product.category === 'Rainforest Basics').slice(0, 4);
    const electronicsArr = allProductsArr.filter(product => product.category === 'Electronics').slice(0, 4);
    const beautArr = allProductsArr.filter(product => product.category === 'Beauty & Personal Care').slice(0, 4);
    const appliancesArr = allProductsArr.filter(product => product.category === 'Appliances').slice(0, 4);

    if (!allProductsArr.length) return null;
    return (
        <>
            <div className='order-placed-wrapper'>
                <div className='order-placed-confirm-container'>
                    <div className='order-placed-check'>
                        <div className='checkmark' />
                        <div className='order-placed-thanks'>
                            Order placed, thanks!
                        </div>
                    </div>
                    <div className='confirmation-email'>
                        Confirmation will be sent to your email.
                    </div>
                    <div className='placed-order-shipping-to'>
                        Shipping to <span className='shipping-to-who'>{currentUser.first_name} {currentUser.last_name}</span>
                    </div>
                    <div className='delivery-date-order-images'>
                        <div className='placed-order-delivery-date'>
                            {deliveryDate}
                        </div>
                        <div className='placed-order-images'>
                            {order_images.map((image, i) => <img key={i} className='placed-order-image' src={image} />)}
                        </div>
                    </div>
                    <Link to={'/orders/current'} className='review-edit-orders'>
                        Review or edit your recent orders <img className='chevright-order' src={chevright}/>
                    </Link>
                </div>
                <div className='empty-cart-container'>
                    <div className='empty-cart-header'>
                        Thank you for shopping with us!
                    </div>
                    <Link to={"/"} className="empty-cart-link">Continue Shopping</Link>
                    <div className='recommended-for-you'>Recommended For You</div>
                    <div className="empty-cart-cards-container">
                        <div className="card-container">
                            <div className="card-title">Rainforest Basics</div>
                            <div className="card-image-container">
                                {basicsArr.map(product => (
                                    <div className="card-image" key={product?.id}>
                                        <Link className="card-image-link" to={`/products/${product.id}`}>
                                            <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                        </Link>
                                        <div className="card-image-info">
                                            <div>{product?.name.substring(0, 20)}...</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-container">
                            <div className="card-title">Electronics</div>
                            <div className="card-image-container">
                                {electronicsArr.map(product => (
                                    <div className="card-image" key={product.id}>
                                        <Link to={`/products/${product.id}`}>
                                            <img className="card-actual-image" src={product.images[0]?.url} alt={product.name} />
                                        </Link>
                                        <div className="card-image-info">
                                            <div>{product.name.substring(0, 20)}...</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-container">
                            <div className="card-title">Beauty & Personal Care</div>
                            <div className="card-image-container">
                                {beautArr.map(product => (
                                    <div className="card-image" key={product?.id}>
                                        <Link to={`/products/${product?.id}`}>
                                            <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                        </Link>
                                        <div className="card-image-info">
                                            <div>{product?.name.substring(0, 20)}...</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-container">
                            <div className="card-title">Appliances</div>
                            <div className="card-image-container">
                                {appliancesArr.map(product => (
                                    <div className="card-image" key={product?.id}>
                                        <Link to={`/products/${product?.id}`}>
                                            <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                        </Link>
                                        <div className="card-image-info">
                                            <div>{product?.name.substring(0, 20)}...</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PlacedOrder;
