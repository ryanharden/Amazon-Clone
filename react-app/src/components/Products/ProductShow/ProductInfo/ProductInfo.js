import "./ProductInfo.css";
import { useState } from "react";
import prime from "../../../../assets/prime-icon.png";

const ProductInfo = ({ product }) => {
    const [click, setClick] = useState(false);
    const handleChange = () => {
        setClick(true);
    }

    return (
        <div className="product-info-container">
            <div className="product-name">
                {product.name}
            </div>
            <div onClick={handleChange} className="product-sold-by">
            {click ? "Feature Coming Soon" : `Visit the ${product.seller.first_name} ${product.seller.last_name} store`}
            </div>
            {/* <div className="product-rating">
                <Stars rating={product.avg_rating} />
                <div className="num-ratings" onClick={goToReviews}>
                    {product.num_ratings} rating{product.num_ratings > 1 && "s"}
                </div>
            </div> */}
            <div className="product-price">
                Price: <div className="dollars">${product.price}</div> <span className="price-count">({product.price} / count)</span>
            </div>
            <div className="product-info-prime">
            </div>
            <div className="free-returns">
                Free Returns
            </div>
            <div className="promo">
                <div className="get-a">
                    Get a $100 Gift Card: <span className="pay">Pay</span> <span className="zero">$0.00</span> upon approval for the Rainforest Prime Rewards Visa Card. No annual fee.
                </div>
            </div>
            <div className="about-item">
                <div className="about-item-header">
                    About this item
                </div>
                <div className="product-description">
                    <ul className="ul-description">{product.description.split("\n").map((bullet, i) => {return <li key={i}>{bullet}</li>})}</ul>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo;
