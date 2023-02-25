import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductThunk } from "../../../store/products";
import "./CartConfirmation.css";
import { getCartItemsThunk } from "../../../store/cartitem";

const CartConfirmation = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');
    const quantity = searchParams.get('quantity');

    const product = useSelector(state => state.Products.singleProduct)
    const cartItems = useSelector(state => state.CartItems);
    const cartItemsArr = Object.values(cartItems);

    const getTotal = (Arr) => {
        let total = 0;
        if (Arr.length) {
            Arr.forEach(item => {
                total += item.price * quantity
            })
            return total;
        }
    }

    const proceed = async () => {
        history.push('/checkout')
    }

    useEffect(() => {
        dispatch(getProductThunk(productId))
        dispatch(getCartItemsThunk())
    }, [dispatch, productId, cartItems]);

    return (
        <div className="cart-confirm-container">
            <div className="cart-confirm-left">
                <div className="cart-confirm-image">
                    <Link className="cart-confirm-link" to={`/products/${productId}`}>
                        <img src={product?.product_images[0]?.product_image_url} alt={product.name} />
                    </Link>
                </div>
                <div className="cart-confirm-added-name">
                    <div className="added-to-cart-check">
                        <div className="checkmark"/>
                        <div className="added-to-cart">
                            Added to Cart
                        </div>
                    </div>
                    <div className="cart-confirm-name">
                        <Link className="cart-confirm-link" to={`/products/${productId}`}>
                            {product?.name}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="cart-confirm-right">
                <div className="confirm-right-header">
                    Cart Subtotal: ${parseFloat(getTotal(cartItemsArr)).toFixed(2)}
                </div>
                <Link to={'/checkout'} className="cart-confirm-link">
                    Proceed to checkout ({cartItemsArr.length} item{cartItemsArr.length > 1 && "s"})
                </Link>
                <Link to={'/cart'} className="cart-confirm-link">
                    Go to Cart
                </Link>
            </div>
        </div>
    )
}
export default CartConfirmation;
