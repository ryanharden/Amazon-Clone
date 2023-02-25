import {Link} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartItemThunk } from "../../../store/cartitem";
import Quantity from "./Quantity/Quantity";

const CartItem = ({ product, quantity }) => {
    const dispatch = useDispatch();
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteItem = () => {
        dispatch(deleteCartItemThunk(product.id));
        setIsDeleted(true);
    }

    if (!product) return;

    if (isDeleted) return <>
        <div className="item-deleted">
            <Link className="item-delete-link" to={`/products/${product.id}`}>
                {product.name}
            </Link>
            was removed from Shopping Cart.
        </div>
    </>;

    return (
        <>
            <div className="cart-item-container">
                <div className="cart-item-left-container">
                    <Link to={`/products/${product.id}`}>
                        <img src={product.product_images[0].product_image_url} className="cart-item-image"></img>
                    </Link>
                </div>
                <div className="cart-item-middle-container">
                    <div className="cart-item-name">
                        {product.name}
                    </div>
                    <div className="by-seller">
                        by {product.seller}
                    </div>
                    <div className="stock">
                        In Stock
                    </div>
                    <div className="gift-opt">
                        Gift options not available.
                    </div>
                    <div className="qty-delete">
                        <div className="qty">
                            <Quantity productId={product.id} quantity={quantity}/>
                        </div>
                        <div onClick={deleteItem} className="cart-item-delete">
                            Delete
                        </div>
                    </div>
                </div>
                <div className="cart-item-right-container">
                    <div className="cart-item-price">
                        {parseFloat(product.price * quantity).toFixed(2)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CartItem;
