import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getReviewsThunk } from '../../../store/reviews';
import OpenModalButton from '../../OpenModalButton';
import ReviewForm from '../ReviewForm/ReviewForm';
import ReviewModal from '../ReviewModal/ReviewModal';
import ReviewItem from '../ReviewItem/ReviewItem';
import AllReviewImages from '../AllReviewImages/AllReviewImages';
import "./ProductReviews.css";
import ReviewData from '../ReviewData/ReviewData';

const ProductReviews = ({ product }) => {
    const dispatch = useDispatch();
    const { productId } = useParams();

    const user = useSelector(state => state.session.user);
    // console.log("user.id: ", user.id);

  
    const productReviews = useSelector(state => state.Reviews.allReviews);
    // const productReviews = product?.reviews;

    // if (!Object.values(productReviews).length) {
    //     const productReviewsArr = Object.values(productReviews);
    // }

    const productReviewsArr = Object.values(productReviews)
    // console.log("productReviewsArr: ", productReviewsArr);

    const reviewImages = [];

    productReviewsArr.forEach((review) => {
        if (review.images && review.images.length > 0) {
            review.images.forEach((image) => {
                reviewImages.push(image.url);
            });
        }
    });

    const ratingCounts = {};

    productReviewsArr.forEach(review => {
        const rating = review.rating;
        ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });

    useEffect(() => {
        dispatch(getReviewsThunk(product?.id))
    }, [dispatch, product?.id])

    const first4Reviews = productReviewsArr.slice(0, 4);

    const reviewItems = productReviewsArr.map((review) => {
        return <ReviewItem key={review.id} product={product} review={review} user={user ? user : ""} />
    });

    const hasReviewImages = first4Reviews.some(review => review.images && review.images.length > 0);

    if (!productReviewsArr.length)
        return (
            <div className='no-reviews-container'>
                <div className='review-data-inside'>
                    <ReviewData reviews={productReviewsArr} ratingCounts={ratingCounts} />
                </div>
                <div className='no-reviews-right'>
                    <div className='no-reviews-header'>
                        There are no reviews yet!
                    </div>
                    <div className='review-this-product-container'>
                        <div className="review-this-product">
                            Review this product
                        </div>
                        <div className='share-thoughts'>
                            Share your thoughts with other customers
                        </div>
                        {user && product?.seller?.id == user?.id ?
                            <Link to={`/users/${user?.id}/products`} className='write-a-review-link'>
                                You own this product
                            </Link>
                            :
                            <Link to={`/products/${product.id}/writereview`} className='write-a-review-link'>
                                Write a customer review
                            </Link>
                        }
                    </div>
                </div>
            </div>
        )
    return (
        <div className='product-data-reviews-container'>
            <div className='review-data-wrapper'>
                <div className='review-data-inside'>
                    <ReviewData reviews={productReviewsArr} ratingCounts={ratingCounts} />
                </div>
                <div className='review-this-product-container-under'>
                    <div className="review-this-product-under">
                        Review this product
                    </div>
                    <div className='share-thoughts'>
                        Share your thoughts with other customers
                    </div>
                    {user && product?.seller?.id == user?.id ?
                        <Link to={`/users/${user?.id}/products`} className='write-a-review-link'>
                            You own this product
                        </Link>
                        :
                        <Link to={`/products/${product.id}/writereview`} className='write-a-review-link'>
                            Write a customer review
                        </Link>
                    }
                </div>
            </div>
            <div className='product-reviews-container'>
                <div className='product-reviews-top'>
                    <div className='review-images-header'>
                        Reviews with images
                    </div>
                    <div className='review-images-container'>
                        {/* {first4Reviews.map((review) => {
                            if (review.images && review.images.length > 0) {
                                return <OpenModalButton
                                    key={review.id}
                                    className="review-image-modal"
                                    modalComponent={<ReviewModal review={review} image={review.images[0].url} />}
                                    buttonText={<img className='review-image-image' src={review.images[0].url} />}
                                />;
                            } else if (review === first4Reviews[first4Reviews.length-1] && review.images.length === 0) {
                                return <div key={review.id}>No reviews with images yet!</div>;
                            } else {
                                return null;
                            }
                        })} */}
                        {first4Reviews.map((review, index) => {
                            if (review.images && review.images.length > 0) {
                                return <OpenModalButton
                                    key={review.id}
                                    className="review-image-modal"
                                    modalComponent={<ReviewModal review={review} image={review.images[0].url} />}
                                    buttonText={<img className='review-image-image' src={review.images[0].url} />}
                                />;
                            } else if (index === first4Reviews.length - 1 && !hasReviewImages) {
                                return <div key={review.id}>No reviews with images yet!</div>;
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    {reviewImages.length > 0 && <div className='rest-of-images'>
                        <OpenModalButton
                            className="see-all-images-modal"
                            modalComponent={<AllReviewImages images={reviewImages} />}
                            buttonText="See all customer images"
                        />
                    </div>}
                </div>
                <div className='product-reviews-bottom'>
                    <div className='reviews-bottom-header'>
                        Top reviews from the United States
                    </div>
                    <div className='all-review-items-container'>
                        {reviewItems}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductReviews;
