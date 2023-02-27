import "./ProductInfo.css";
import prime from "../../../../assets/prime-icon.png";

const ProductInfo = ({ product }) => {
    return (
        <div className="product-info-container">
            <div className="product-name">
                {product.name}
            </div>
            <div className="product-sold-by">
                Visit the {product.seller.firstName} {product.seller.lastName} store
            </div>
            {/* <div className="product-rating">
                <Stars rating={product.avg_rating} />
                <div className="num-ratings" onClick={goToReviews}>
                    {product.num_ratings} rating{product.num_ratings > 1 && "s"}
                </div>
            </div> */}
            <div className="product-price">
                Price: ${product.price} ({product.price} / count)
            </div>
            <div className="prime">
                <img src={prime} className="prime-icon" alt="prime"/>
            </div>
            <div className="free-returns">
                Free Returns
            </div>
            <div className="promo">
                <div className="get-a">
                    Get a $100 Gift Card: Pay <span className="zero">$0.00</span> upon approval for the Rainforest Prime Rewards Visa Card. No annual fee.
                </div>
            </div>
            <div className="about-item">
                <div className="about-item-header">
                    About this item
                </div>
                <div className="product-description">
                    <ul>{product.description.split("\n").map((bullet, i) => {return <li key={i}>{bullet}</li>})}</ul>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo;
