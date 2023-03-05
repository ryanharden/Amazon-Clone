import "./ProductBuy.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OpenModalButton from "../../../OpenModalButton";
import LoginFormPage from "../../../LoginFormPage";


import QuantityShow from "../QuantityShow/QuantityShow";
import BuyFormModal from "../BuyFormModal/BuyFormModal";
import { addCartItemThunk } from "../../../../store/cartitem";

const ProductBuy = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.session.user);
    // console.log(currentUser.id, product.seller.id)
    const [quantity, setQuantity] = useState(1);

    const addToCart = async () => {
        if (!currentUser) {
            navigate("/login")
        } else {
            await dispatch(addCartItemThunk(product.id, quantity))
            navigate(`/cart-confirmation?productId=${product.id}&quantity=${quantity}`);
        }
    };

    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    deliveryDate = deliveryDate.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });

    return (
        <div className="buy-card-container">
            <div className="buy-card-top">
                <div className="buy-card-price">
                    <div className="dollars">${product.price}</div> ({product.price} / count)
                </div>
                <div className="buy-card-prime">
                </div>
                <div className="free-returns">
                    Free Returns
                </div>
                <div className="buy-card-deliverydate">
                    <div className="free-deliv">FREE delivery </div>
                    <div className="deliverydate">
                        {deliveryDate}.
                    </div>
                    <div className="order-within">
                        Order within
                    </div>
                    <div className="within">15 hrs 10 mins</div>
                </div>
                <div className="stock-buy-card">
                    In Stock.
                </div>
                {currentUser?.id === product.seller.id && <div className="you-own">You own this product. <Link className="you-own-link" to={`/users/${currentUser.id}/products`}>Click here</Link> to edit it.</div>}
                {currentUser?.id !== product.seller.id &&
                    <div className="buy-card-quantity">
                        <QuantityShow quantity={quantity} setQuantity={setQuantity} />
                    </div>
                }
            </div>
            {currentUser?.id !== product.seller.id &&
                <div className="buy-card-buttons">
                    <div className="add-to-cart-button" onClick={addToCart}>
                        Add to Cart
                    </div>
                    <div className="buy-now-button-container">
                        <OpenModalButton
                            className="buy-now"
                            modalComponent={ currentUser ? <BuyFormModal /> : <LoginFormPage />}
                            buttonText="Buy Now"
                        />
                    </div>
                </div>
            }
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
                    <div className="ships-from">
                        Ships from
                    </div>
                    <div className="sold-by-buy">
                        Sold by
                    </div>
                    <div className="gift-opt-buy">
                        Gift options
                    </div>
                </div>
                <div className="right-column">
                    <div className="ship-from">
                        Rainforest Retail
                    </div>
                    <div className="card-seller">
                        {product.seller?.first_name} {product.seller?.last_name}
                    </div>
                    <div className="card-gift-opt">
                        Add at checkout
                    </div>
                </div>
            </div>
            <div className="return-policy">
                Return policy: <span className="eligible">Eligible for Refund or Replacement</span>
            </div>
        </div>
    )
}
export default ProductBuy;
