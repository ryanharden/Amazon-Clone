import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../../store/products';
// import { getCartItemsThunk} from '../../../store/cartitem';
import "./PlacedOrder.css";

const PlacedOrder = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.Products.allProducts);
    const allProductsArr = Object.values(products);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch])

    const basicsArr = allProductsArr.filter(product => product.category === 'Rainforest Basics').slice(0, 4);
    const electronicsArr = allProductsArr.filter(product => product.category === 'Electronics').slice(0, 4);
    const beautArr = allProductsArr.filter(product => product.category === 'Beauty & Personal Care').slice(0, 4);
    const appliancesArr = allProductsArr.filter(product => product.category === 'Appliances').slice(0, 4);

    if (allProductsArr.length)
        return (
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
        )
}
export default PlacedOrder;
