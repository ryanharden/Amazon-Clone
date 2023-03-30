import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCartItemThunk } from "../../../store/cartitem";
import "./OrderItem.css";

const OrderItem = ({ order, item, product, currentUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    deliveryDate = deliveryDate.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });

    const buyAgain = async () => {
        if (!currentUser) {
            navigate("/login")
        } else {
            await dispatch(addCartItemThunk(product.id, 1))
            navigate(`/cart-confirmation?productId=${product.id}&quantity=${1}`);
        }
    };


    if (!product) return null;


    return (
        <div className="order-item-container">
            <div className="order-item-left">
                <div className="order-item-header">
                    <div className="order-item-arriving">
                        Arriving {deliveryDate}
                    </div>
                    <div className="not-shipped">
                        Not yet shipped
                    </div>
                </div>
                <div className="order-item-product">
                    <div className="order-item-image-container">
                        <Link to={`/products/${product.id}`}>
                            <img src={product.images[0].url} className="order-item-image" alt={product.name}></img>
                        </Link>
                    </div>
                    <div className="order-item-name-buttons">
                        <Link className="order-item-name-quantity" to={`/products/${product.id}`}>
                            <div className="order-item-name">
                                {product.name}
                            </div>
                            <div className="item-quantity">
                                <div className="order-item-quantity">x{item.quantity}</div>
                            </div>
                        </Link>
                        <div className="buy-view-buttons">
                            <div className="buy-it-again">
                                <div className="buy-it-again-icon"></div>
                                <div onClick={buyAgain} className="buy-it-again-text">Buy it again</div>
                            </div>
                            <Link className="view-item-link" to={`/products/${product.id}`}>
                                View your item
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-item-right">
                <Link to={`/products/${product.id}/writereview`} className='order-write-a-review-link'>
                    Write a product review
                </Link>
            </div>
        </div>
    )
}
export default OrderItem;
