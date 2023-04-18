import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductThunk } from "../../../store/products";
import "./CartConfirmation.css";
import { getCartItemsThunk } from "../../../store/cartitem";

const CartConfirmation = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams()[0];
    const productId = searchParams.get('productId');
    const quantity = searchParams.get('quantity');

    const product = useSelector(state => state.Products.singleProduct)
    const cartItems = useSelector(state => state.CartItems);
    const cartItemsArr = Object.values(cartItems);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numCartItems, setNumCartItems] = useState(0);
    const products = useSelector(state => state.Products.allProducts);

    useEffect(() => {
        let total = 0;
        cartItemsArr.forEach(item => {
            const product = products[item.product_id];
            if (product) {
                total += product.price * item.quantity;
            }
        });
        setTotalPrice(total);
        setNumCartItems(cartItemsArr.reduce((acc, curr) => acc + curr.quantity, 0));
    }, [cartItems, products])


    useEffect(() => {
        dispatch(getProductThunk(productId))
        dispatch(getCartItemsThunk())
    }, [dispatch, productId]);

    return (
        <div className="cart-confirm-container">
            <div className="cart-confirm-left">
                <div className="cart-confirm-image">
                    <Link className="cart-confirm-link" to={`/products/${productId}`}>
                        {product?.images?.length > 0 &&
                            <img className="cart-confirm-image" src={product.images[0].url} alt={product.name} />
                        }
                    </Link>
                </div>
                <div className="cart-confirm-added-name">
                    <div className="added-to-cart-check">
                        <div className="checkmark" />
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
                    Cart Subtotal: ${parseFloat(totalPrice).toFixed(2)}
                </div>
                <Link to={'/checkout'} className="cart-confirm-link-proceed">
                    Proceed to checkout ({numCartItems} item{numCartItems > 1 && "s"})
                </Link>
                <Link to={'/cart'} className="cart-confirm-link-go-to-cart">
                    Go to Cart
                </Link>
            </div>
        </div>
    )
}
export default CartConfirmation;
