import "./ProductBuy.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OpenModalButton from "../../../OpenModalButton";
import prime from "../../../../assets/prime-icon.png";

import QuantityShow from "../QuantityShow/QuantityShow";
import BuyFormModal from "../BuyFormModal/BuyFormModal";
import { addCartItemThunk } from "../../../../store/cartitem";

const ProductBuy = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.session.user);

    const [quantity, setQuantity] = useState(1);

    const addToCart = async () => {
        if (!currentUser) {
            navigate("/signin")
        } else {
            dispatch(addCartItemThunk(product.id, quantity))
            navigate(`/cart-confirmation?productId=${product.id}&quantity=${quantity}`);
        }
    };

    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    deliveryDate = deliveryDate.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });

    return (
        <div className="buy-card-container">
            <div className="buy-card-price">
                ${product.price} ({product.price} / count)
            </div>
            <div className="prime">
                <img src={prime} className="prime-icon" alt="prime" />
            </div>
            <div className="free-returns">
                Free Returns
            </div>
            <div className="buy-card-deliverydate">
                Free delivery <span className="deliverydate">{deliveryDate}.</span> Order within <span className="within">15 hrs 10 mins</span>
            </div>
            <div className="stock">
                In Stock.
            </div>
            <div className="buy-card-quantity">
                <QuantityShow quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div className="add-to-cart-button" onClick={addToCart}>
                Add to Cart
            </div>
            <div className="buy-now-button-container">
                <OpenModalButton
                    className="buy-now"
                    modalComponent={<BuyFormModal />}
                    buttonText="Buy Now"
                />
            </div>
            <div className="secure-container">
                <div className="lock">
                    <i className="fa-solid fa-lock"></i>
                </div>
                <div className="secure-transaction">
                    Secure transaction
                </div>
            </div>
            <div className="ships-from-sold-by-gift">
                <div className="left-column">
                    <div className="ships-form">
                        Ships from
                    </div>
                    <div className="sold-by">
                        Sold by
                    </div>
                    <div className="gift-opt">
                        Gift options
                    </div>
                </div>
                <div className="right-column">
                    <div className="ship-from">
                        Rainforest Retail
                    </div>
                    <div className="card-seller">
                        {product.seller.first_name} {product.seller.last_name}
                    </div>
                    <div className="card-gift-opt">
                        Add at checkout
                    </div>
                </div>
                <div className="return-policy">
                    Return policy: <span className="eligible">Eligible for Refund or Replacement</span>
                </div>
            </div>
        </div>
    )
}
export default ProductBuy;
