import { Link } from "react-router-dom";
import "./ProductItem.css";

let deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + 2);
deliveryDate = deliveryDate.toLocaleDateString('en-us', { weekday: "short", month: "short", day: "numeric" });
const ProductItem = ({ product }) => {
    return (
        <div className="product-item-container">
            <div className="product-item-top">
                <Link to={`/products/${product.id}`} className="product-item-link">
                    <div className="product-item-image-container">
                        <img className="product-item-image" src={product.images[0]?.url} alt={product.name} />
                    </div>
                </Link>
            </div>
            <div className="product-item-bottom">
                <Link to={`/products/${product.id}`} className="product-item-link">
                    <div className="product-item-card-name">
                        {product?.name.substring(0, 90)}...
                    </div>
                </Link>
                <div className="product-item-card-count">
                    1 Count (Pack of 1)
                </div>
                <div className="product-item-card-price">
                    ${product?.price} ({product?.price}/count)
                </div>
                <div className="product-item-prime">
                </div>
                <div className="product-item-delivery-container">
                    <div className="item-free-delivery">
                        FREE delivery
                    </div>
                    <div className="item-delivery-day">
                        {deliveryDate}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductItem;
