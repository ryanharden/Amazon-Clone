import { Link } from "react-router-dom";
import Quantity from "../../Cart/CartItem/Quantity/Quantity";
import "./CheckoutItem.css";
import prime from "../../../assets/prime-icon.png";

const CheckoutItem = ({ product, quantity }) => {
    if (!product || !product.images) return null;

    return (
        <div className="checkout-item-container">
            <div className="checkout-item-left">
                <Link to={`/products/${product.id}`} className="checkout-link">
                    <img src={product?.images[0]?.url} className="checkout-image" alt={product.name} />
                </Link>
            </div>
            <div className="checkout-item-right">
                <div className="checkout-item-name">
                    <Link className="checkout-link" to={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                </div>
                <div className="checkout-item-price-prime">
                    <div className="checkout-price">
                        ${product.price}
                    </div>
                    <div className="checkout-prime">
                        <img src={prime} className="checkout-prime-icon" alt="prime" />
                    </div>
                </div>
                <Quantity product_id={product.id} quantity={quantity}/>
                <div className="checkout-sold-by">
                    Sold by: {product.seller.first_name} {product.seller.last_name}
                </div>
            </div>
        </div>
    )
};

export default CheckoutItem;
