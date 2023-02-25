import { Link } from "react-router-dom";
import "./CheckoutHeader.css";

const CheckoutHeader = ({ numItems }) => {
    return (
        <div className="checkout-header-container">
            <div className="checkout-header">
                <Link to={"/"} className="checkout-link">Rainforest Retail</Link>
                <div className="checkout-items">
                    Checkout <span className="checkout-numitems">(<Link to={"/cart"} className="checkout-link">{numItems}</Link></span>
                </div>
                <i className="fa-solid fa-lock"></i>
            </div>
        </div>
    )
};
export default CheckoutHeader;

