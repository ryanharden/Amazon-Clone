import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ordersReducer from "../../../store/orders";
import "./Order.css";

const Order = ({ order, order_item, product, currentUser, orderItemsWithProduct }) => {

    const createdAt = (new Date(order.created_at)).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });
    const total = order.order_items.reduce((total, order_item) => total += order_item.price * order_item.quantity, 0)
    if (!product) return null;

    return (
        <div className="order-container">
            <div className="order-header">
                <div className="order-left-header">
                    <div className="order-placed-container">
                        <div className="order-placed">
                            ORDER PLACED
                        </div>
                        <div className="order-placed-date">
                            {createdAt}
                        </div>
                    </div>
                    <div className="order-total-container">
                        <div className="order-total">
                            TOTAL
                        </div>
                        <div className="order-total-price">
                            ${parseFloat(total).toFixed(2)}
                        </div>
                    </div>
                    <div className="order-ship-to-container">
                        <div className="order-ship-to">
                            SHIP TO
                        </div>
                        <div className="order-user">
                            {currentUser}
                        </div>
                    </div>
                </div>
                <div className="order-right-header">
                    {/* <div className="view-order-details">
                        View order details
                    </div> */}
                    <div className="order-num">
                        ORDER # {order.id}
                    </div>
                </div>
            </div>
            <div className="order-items-wrapper">
                {orderItemsWithProduct}
            </div>
        </div>
    )
}
export default Order;
