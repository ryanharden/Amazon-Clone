import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartItemThunk } from "../../../store/cartitem";
import Quantity from "./Quantity/Quantity";
import "./CartItem.css";

const CartItem = ({ product, quantity, cartitem, handleDelete, updatedQuantity, isDeleted }) => {
    const dispatch = useDispatch();

    // const deleteItem = async () => {
    //     const deletedItem = await dispatch(deleteCartItemThunk(cartitem.id));
    //     if (deletedItem) {
    //         setIsDeleted(true);
    //     }
    // }

    const deleteItem = async () => {
        await handleDelete(cartitem.id);
    }


    if (!product) return null;

    // if (isDeleted) return <>
    //     <div className="item-deleted">
    //         <Link className="item-delete-link" to={`/products/${product.id}`}>
    //             {product.name}
    //         </Link>
    //         was removed from Shopping Cart.
    //     </div>
    // </>;

    return (
        <>
            <div className="cart-item-container">
                <div className="cart-item-left-container">
                    <Link to={`/products/${product.id}`}>
                        {product.images && product.images.length > 0 &&
                            <img src={product.images[0].url} className="cart-item-image" alt={product.name}></img>
                        }
                    </Link>
                    <div className="cart-item-middle-container">
                        <Link to={`/products/${product.id}`}>
                            <div className="cart-item-name">
                                {product.name}
                            </div>
                        </Link>
                        <div className="by-seller">
                            by {`${product.seller.first_name} ${product.seller.last_name}`}
                        </div>
                        <div className="stock">
                            In Stock
                        </div>
                        <div className="cart-item-prime">
                        </div>
                        <div className="gift-opt">
                            Gift options not available.
                        </div>
                        <div className="qty-delete">
                            <div className="qty">
                                <Quantity productId={product.id} cartitem={cartitem} quantity={quantity} updatedQuantity={updatedQuantity} />
                            </div>
                            <div className="line"></div>
                            <div onClick={deleteItem} className="cart-item-delete">
                                Delete
                            </div>
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
