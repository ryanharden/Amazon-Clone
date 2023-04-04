import React from 'react';
import StarsForm from '../StarsForm/StarsForm';
import "./ReviewData.css";

const ReviewData = ({ reviews }) => {
    const totalReviews = reviews.length;
    const fiveStarReviews = reviews.filter((review) => review.rating === 5);
    const fourStarReviews = reviews.filter((review) => review.rating === 4);
    const threeStarReviews = reviews.filter((review) => review.rating === 3);
    const twoStarReviews = reviews.filter((review) => review.rating === 2);
    const oneStarReviews = reviews.filter((review) => review.rating === 1);

    const fiveStarPercentage = Math.round(fiveStarReviews.length ? (fiveStarReviews.length / totalReviews) * 100 : 0);
    const fourStarPercentage = Math.round(fourStarReviews.length ? (fourStarReviews.length / totalReviews) * 100 : 0);
    const threeStarPercentage = Math.round(threeStarReviews.length ? (threeStarReviews.length / totalReviews) * 100 : 0);
    const twoStarPercentage = Math.round(twoStarReviews.length ? (twoStarReviews.length / totalReviews) * 100 : 0);
    const oneStarPercentage = Math.round(oneStarReviews.length ? (oneStarReviews.length / totalReviews) * 100 : 0);

    let avgRating = 0;

    if (reviews.length > 0) {
        reviews.forEach(review => {
            avgRating += review.rating;
        })
        avgRating = avgRating / totalReviews
    }

    const getBorderStyle = (starPercentage) => {
        if (starPercentage === 100) {
            return "4px";
        } else {
            return "4px 0 0 4px";
        }
    }

    return (
        <div className='review-data-container'>
            <div className='review-data-header'>
                Customer reviews
            </div>
            <div className='average-rating-stars'>
                <StarsForm rating={avgRating} />
                <div className='average-num'>
                    {avgRating.toFixed(1)} out of 5
                </div>
            </div>
            <div className='total-ratings'>
                {totalReviews} global rating{totalReviews !== 1 ? "s" : ""}
            </div>
            <div className="rating-bar">
                <div className="star-rating">
                    <div className="data-stars">5 star</div>
                    <div className="bar-container">
                        <div className="bar" style={{ width: `${fiveStarPercentage}%`, borderRadius: getBorderStyle(fiveStarPercentage) }}></div>
                    </div>
                    <div className="percentage">{`${fiveStarPercentage}%`}</div>
                </div>

                <div className="star-rating">
                    <div className="data-stars">4 star</div>
                    <div className="bar-container">
                        <div className="bar" style={{ width: `${fourStarPercentage}%`, borderRadius: getBorderStyle(fiveStarPercentage) }}></div>
                    </div>
                    <div className="percentage">{`${fourStarPercentage}%`}</div>
                </div>

                <div className="star-rating">
                    <div className="data-stars">3 star</div>
                    <div className="bar-container">
                        <div className="bar" style={{ width: `${threeStarPercentage}%`, borderRadius: getBorderStyle(fiveStarPercentage) }}></div>
                    </div>
                    <div className="percentage">{`${threeStarPercentage}%`}</div>
                </div>

                <div className="star-rating">
                    <div className="data-stars">2 star</div>
                    <div className="bar-container">
                        <div className="bar" style={{ width: `${twoStarPercentage}%`, borderRadius: getBorderStyle(fiveStarPercentage) }}></div>
                    </div>
                    <div className="percentage">{`${twoStarPercentage}%`}</div>
                </div>

                <div className="star-rating">
                    <div className="data-stars">1 star</div>
                    <div className="bar-container">
                        <div className="bar" style={{ width: `${oneStarPercentage}%`, borderRadius: getBorderStyle(fiveStarPercentage) }}></div>
                    </div>
                    <div className="percentage">{`${oneStarPercentage}%`}</div>
                </div>
            </div>
        </div>
    );
};

export default ReviewData;
