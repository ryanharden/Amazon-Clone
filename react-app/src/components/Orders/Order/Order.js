// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import ordersReducer from "../../../store/orders";
import OrderItem from "../OrderItem/OrderItem";
import { deleteOrderThunk } from "../../../store/orders";
import "./Order.css";
import { useDispatch } from "react-redux";

const Order = ({ order, currentUser, orderItemsWithProduct }) => {
    const dispatch = useDispatch();
    const createdAt = (new Date(order.created_at)).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });
    const total = order.order_items.reduce((total, order_item) => total += order_item.price * order_item.quantity, 0)

    // const allOrderItems = orderItemsWithProduct?.map(product => {
    //     return <OrderItem key={product?.id} product={product} />
    // })
    const orderItems = orderItemsWithProduct.filter(item => item?.order_id === order.id);
    const allOrderItems = orderItems.map(item => {
        return <OrderItem key={item.id} order={order} item={item} product={item.product} currentUser={currentUser} />;
    });

    const handleDelete = async (orderId) => {
        await dispatch(deleteOrderThunk(orderId));
    };

    if (!allOrderItems) return null;

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
                        <div className="order-total-text">
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
                            {currentUser.first_name} {currentUser.last_name}
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
                {allOrderItems}
            </div>
            <div onClick={()=> handleDelete(order.id)} className="remove-order-container">
                Remove order
            </div>
        </div>
    )
}
export default Order;
