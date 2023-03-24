import { Link } from "react-router-dom";
import "./OrdersButton.css";

const OrdersButton = () => {
    return (
        <Link to="/orders/current" className="orders-button-container">
            <div className="returns-orders-container">
                <div className="returns">
                    Returns
                </div>
                <div className="orders">
                    & Orders
                </div>
            </div>
        </Link>
    )
}
export default OrdersButton;
