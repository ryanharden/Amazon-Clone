import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../../context/Modal";

const BuyFormModal = () => {
    // const dispatch = useDispatch();
    // const history = useHistory();
    const { closeModal } = useModal();
    // const { productId } = useParams();
    const product = useSelector(state => state.Products.singleProduct);
    const currentUser = useSelector(state => state.session.user);
    // const handleSubmit = async (e) => {

    // }

    return (
        <div className="buy-form-modal-container">
            <div className="buy-form-header">
                <div className="buy-now">
                    Buy now: {product.name}
                </div>
                <div className="close" onClick={(e) => closeModal()}>
                    x
                </div>
            </div>
            <div className="buy-form-product">
                <div className="buy-form-product-image">
                    <img src={product.product_images[0]?.product_image_url} alt={product.name} />
                </div>
                <div className="buy-info">
                    <div className="arriving">
                        Arriving: Within the next 3 Days
                    </div>
                    <div className="free">
                        Free Rainforest Prime Delivery
                    </div>
                    <div className="sold-by">
                        Sold by {product.seller.first_name} {product.seller.last_name}
                    </div>
                </div>
            </div>
            <div className="ship-to-container">
                <div className="ship-to">
                    Ship to
                </div>
                <div className="buyer-address">
                    <div className="buyer">
                        {currentUser.first_name} {currentUser.last_name}
                    </div>
                    <div className="address">
                        1234 Noneya Business Dr, Your Mom, Ca, 92091, United States
                    </div>
                </div>
            </div>
            <div className="total-container">
                <div className="total-header">
                    Total
                </div>
                <div className="total-price">
                    ${parseFloat(product.price * quantity).toFixed(2)}
                </div>
                <div className="tax">
                    (includes tax)
                </div>
            </div>
            <div className="agreement">
                By placing your order, you agree to Rainforest retails privacy notice and conditions of use.
            </div>
            <div className="place-order">
                <div className="place-order-button" onClick={handleSubmit}>
                    Place yor order
                </div>
            </div>
        </div>
    )
}
export default BuyFormModal;
