import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { getProductsThunk } from '../../../store/products';
import { getCartItemsThunk, deleteCartItemThunk } from '../../../store/cartitem';

const CartShow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [numCartItems, setNumCartItems] = useState(0);

    // const product = useSelector(state => state.Products.singleProduct);
    // const sessionUser = useSelector(state => state.session.user);
    const cartItems = useSelector(state => state.CartItems);
    const cartItemsArr = Object.values(cartItems);
    const products = useSelector(state => state.Products.allProducts);

    console.log("cartItemsArr: ", cartItemsArr);

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCartItemsThunk());
    }, [dispatch])

    useEffect(() => {
        let total = 0;
        cartItemsArr.forEach(item => {
            const product = products[item.product_id];
            console.log("total-product", product);
            if (product) {
                total += product.price * item.quantity;
                console.log("total: ", total);
            }
        });
        setTotalPrice(total);
        setNumCartItems(cartItemsArr.reduce((acc, curr) => acc + curr.quantity, 0));
    }, [cartItems, products]);

    console.log("cartItems(show):", cartItems);

    if (!cartItemsArr.length)
        return (
            <div className='empty-cart-container'>
                <div className='empty-cart-header'>
                    Your Rainforest Retail cart is empty.
                </div>
                <Link to={"/"} className="empty-cart-link">Continue Shopping</Link>
            </div>
        )

    const handleDelete = async (cartItemId) => {
        const deletedItem = await dispatch(deleteCartItemThunk(cartItemId));
        if (deletedItem) {
            setNumCartItems(numCartItems - deletedItem.quantity);
            setTotalPrice(totalPrice - deletedItem.product.price * deletedItem.quantity);
        }
    };

    const cartItemsWithProduct = cartItemsArr.map(cartitem => {
        const product = products[cartitem.product_id];
        if (!product) return null;
        return <CartItem key={cartitem.id} cartitem={cartitem} product={product} quantity={cartitem.quantity} handleDelete={handleDelete} />
    })
    console.log("cartItemswithProduct: ", cartItemsWithProduct)

    return (
        <div className="cart-container">
            <div className='left-cart-container'>
                <div className='left-cart-header'>
                    <div className="shopping-cart">
                        Shopping Cart
                    </div>
                    <div className='cart-price'>
                        Price
                    </div>
                </div>
                <div className='cart-items-wrapper'>
                    {/* {items} */}
                    {cartItemsWithProduct}
                </div>
                <div className='cart-footer'>
                    Subtotal ({numCartItems} item{numCartItems > 1 && "s"}): ${parseFloat(totalPrice).toFixed(2)}
                </div>
            </div>
            <div className='right-cart-container'>
                <div className='right-cart-header'>
                    Subtotal ({numCartItems} item{numCartItems > 1 && "s"}): ${parseFloat(totalPrice).toFixed(2)}
                </div>
                <Link to={"/checkout"} className="cart-show-link">
                    Proceed to checkout
                </Link>
            </div>
        </div>
    )
}

export default CartShow;
