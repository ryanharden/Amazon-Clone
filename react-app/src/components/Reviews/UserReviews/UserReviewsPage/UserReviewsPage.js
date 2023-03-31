import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReviewItem from '../../ReviewItem/ReviewItem';
import { getReviewsThunk, getUserReviewsThunk } from '../../../../store/reviews';
import { getProductsThunk } from '../../../../store/products';
import chevright from "../../../../assets/chevron-right.png";
import "./UserReviewsPage.css";

const UserReviewsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const products = useSelector(state => state.Products.allProducts);
    const allProductsArr = Object.values(products);
    const userReviews = useSelector(state => state.Reviews.userReviews);
    const userReviewsArr = Object.values(userReviews);

    console.log("userReviewsArr: ", userReviewsArr);

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getUserReviewsThunk())
    }, [dispatch])

    const basicsArr = allProductsArr.filter(product => product.category === 'Rainforest Basics').slice(0, 4);
    const electronicsArr = allProductsArr.filter(product => product.category === 'Electronics').slice(0, 4);
    const beautArr = allProductsArr.filter(product => product.category === 'Beauty & Personal Care').slice(0, 4);
    const appliancesArr = allProductsArr.filter(product => product.category === 'Appliances').slice(0, 4);

    const reviewItems = userReviewsArr.map((review) => {
        const product = allProductsArr.find(product => product.id === review.product_id);
        return (
            <div className='user-review-item-container'>
                <div className='user-review-product-info'>
                    <Link to={`/products/${product?.id}`} className='user-review-item-p-name'>
                        <img src={product?.images[0].url} className="user-review-item-image" />
                    </Link>
                    <Link to={`/products/${product?.id}`} className='user-review-item-p-name'>
                        {product?.name}
                    </Link>
                </div>
                <div className='user-review-page-item-container'>
                    <ReviewItem key={review.id} product={product} review={review} user={user} />
                </div>
            </div>
        )
    });

    if (!userReviewsArr.length)
        return (
            <div className='empty-cart-container'>
                <div className='empty-cart-header'>
                    You have no reviews.
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
    return (
        <div className="order-page-wrapper">
            <div className="order-page-container">
                <div className="order-page-nav">
                    <div className="order-page-your-account">Your Account</div>
                    <img src={chevright} className="order-arrow" />
                    <div className="your-orders-nav">Your Reviews</div>
                </div>
                <div className="orders-page-header">
                    Your Reviews
                </div>
                <div className="order-items-wrapper">
                    {reviewItems}
                </div>
            </div>
        </div>
    )
}
export default UserReviewsPage;
