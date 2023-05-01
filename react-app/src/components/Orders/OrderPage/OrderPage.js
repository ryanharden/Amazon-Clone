import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getOrdersThunk } from "../../../store/orders";
import { getProductsThunk } from "../../../store/products";
import Order from "../Order/Order";
import OrderItem from "../OrderItem/OrderItem";
import chevright from "../../../assets/chevron-right.png";
import "./OrderPage.css";


const OrderPage = () => {
    const dispatch = useDispatch();

    const orders = useSelector(state => state.Orders);

    const ordersArr = Object.values(orders);
    const products = useSelector(state => state.Products.allProducts);
    // console.log("products: ", products);
    const allProductsArr = Object.values(products);
    // console.log("allProductsArr: ", allProductsArr);
    const currentUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getOrdersThunk());
    }, [dispatch])

    const basicsArr = allProductsArr.filter(product => product.category === 'Rainforest Basics').slice(0, 4);
    const electronicsArr = allProductsArr.filter(product => product.category === 'Electronics').slice(0, 4);
    const beautArr = allProductsArr.filter(product => product.category === 'Beauty & Personal Care').slice(0, 4);
    const appliancesArr = allProductsArr.filter(product => product.category === 'Appliances').slice(0, 4);

    const orderItemsArr = ordersArr.map(order => {
        return order.order_items
    })


    const orderItemsWithProduct = ordersArr.map(order => {
        return order.order_items.map(item => {
            const product = products[item.product_id];
            if (!product) return null;
            return { ...item, product }; // add item and product to array element
        });
    }).flat();
    // console.log("orderItemsWithProduct: ", orderItemsWithProduct)

    const allOrders = ordersArr.map(order => <Order key={order.id} order={order} currentUser={currentUser} orderItemsWithProduct={orderItemsWithProduct} />)
    // console.log("allOrders: ", allOrders);

    if (!orders.length)
        return (
            <div className='empty-cart-container'>
                <div className='empty-cart-header'>
                    You have no orders placed.
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
                    <div className="card-container-beauty">
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
                    <div className="card-container-appliances">
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
        )
    return (
        <div className="order-page-wrapper">
            <div className="order-page-container">
                <div className="order-page-nav">
                    <div className="order-page-your-account">Your Account</div>
                    <img src={chevright} className="order-arrow" />
                    <div className="your-orders-nav">Your Orders</div>
                </div>
                <div className="orders-page-header">
                    Your Orders
                </div>
                <div className="order-items-wrapper">
                    {allOrders}
                </div>
            </div>
        </div>
    )
}

export default OrderPage;
