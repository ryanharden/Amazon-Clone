import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./OrdersButton.css";

const OrdersButton = () => {
    const currentUser = useSelector(state => state.session.user);
    return (
        <Link to={currentUser ? "/orders/current" : "/login"} className="orders-button-container">
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
