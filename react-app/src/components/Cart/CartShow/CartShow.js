import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { getProductsThunk } from '../../../store/products';
import { getCartItemsThunk, deleteCartItemThunk } from '../../../store/cartitem';
import "./CartShow.css";

const CartShow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [numCartItems, setNumCartItems] = useState(0);
    const [isDeleted, setIsDeleted] = useState(false);

    // const product = useSelector(state => state.Products.singleProduct);
    // const sessionUser = useSelector(state => state.session.user);
    const cartItems = useSelector(state => state.CartItems);
    const cartItemsArr = Object.values(cartItems);
    const products = useSelector(state => state.Products.allProducts);
    const allProductsArr = Object.values(products);
    // console.log("cartItemsArr: ", cartItemsArr);

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCartItemsThunk());
    }, [dispatch])

    useEffect(() => {
        let total = 0;
        cartItemsArr.forEach(item => {
            const product = products[item.product_id];
            // console.log("total-product", product);
            if (product) {
                total += product.price * item.quantity;
                // console.log("total: ", total);
            }
        });
        setTotalPrice(total);
        setNumCartItems(cartItemsArr.reduce((acc, curr) => acc + curr.quantity, 0));
    }, [cartItems, products]);

    // console.log("cartItems(show):", cartItems);
    const basicsArr = allProductsArr.filter(product => product.category === 'Rainforest Basics').slice(0, 4);
    const electronicsArr = allProductsArr.filter(product => product.category === 'Electronics').slice(0, 4);
    const beautArr = allProductsArr.filter(product => product.category === 'Beauty & Personal Care').slice(0, 4);
    const appliancesArr = allProductsArr.filter(product => product.category === 'Appliances').slice(0, 4);

    if (!cartItemsArr.length)
        return (
            <div className='empty-cart-container'>
                <div className='empty-cart-header'>
                    Your Rainforest Retail cart is empty.
                </div>
                <Link to={"/"} className="empty-cart-link">Continue Shopping</Link>
                <div className='recommended-for-you'>Recommended For You</div>
                <div className="empty-cart-cards-container">
                    <div className="card-container">
                        <div className="card-title">Rainforest Basics</div>
                        <div className="card-image-container">
                            {basicsArr.map(product => (
                                <div className="card-image" key={product?.id}>
                                    <Link className="card-image-link" to={`/products/${product.id}`}>
                                        <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                    </Link>
                                    <div className="card-image-info">
                                        <div>{product?.name.substring(0, 20)}...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card-title">Electronics</div>
                        <div className="card-image-container">
                            {electronicsArr.map(product => (
                                <div className="card-image" key={product.id}>
                                    <Link to={`/products/${product.id}`}>
                                        <img className="card-actual-image" src={product.images[0]?.url} alt={product.name} />
                                    </Link>
                                    <div className="card-image-info">
                                        <div>{product.name.substring(0, 20)}...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card-title">Beauty & Personal Care</div>
                        <div className="card-image-container">
                            {beautArr.map(product => (
                                <div className="card-image" key={product?.id}>
                                    <Link to={`/products/${product?.id}`}>
                                        <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                    </Link>
                                    <div className="card-image-info">
                                        <div>{product?.name.substring(0, 20)}...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card-title">Appliances</div>
                        <div className="card-image-container">
                            {appliancesArr.map(product => (
                                <div className="card-image" key={product?.id}>
                                    <Link to={`/products/${product?.id}`}>
                                        <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                    </Link>
                                    <div className="card-image-info">
                                        <div>{product?.name.substring(0, 20)}...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )

    const handleDelete = async (cartItemId) => {
        const deletedItem = await dispatch(deleteCartItemThunk(cartItemId));
        if (deletedItem) {
            setNumCartItems(numCartItems - deletedItem.quantity);
            setTotalPrice(totalPrice - deletedItem.product?.price * deletedItem.quantity);
            setIsDeleted(true);
        }
    };

    const cartItemsWithProduct = cartItemsArr.map(cartitem => {
        const product = products[cartitem.product_id];
        if (!product) return null;
        return <CartItem key={cartitem.id} cartitem={cartitem} product={product} quantity={cartitem.quantity} handleDelete={handleDelete} isDeleted={isDeleted}/>
    })
    // console.log("cartItemswithProduct: ", cartItemsWithProduct)

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
                    <div className='cart-footer-subtotal'>
                        Subtotal ({numCartItems} item{numCartItems > 1 && "s"}):
                    </div>
                    <div className="cart-dollars"> ${parseFloat(totalPrice).toFixed(2)}</div>
                </div>
            </div>
            <div className='right-cart-container'>
                <div className='right-cart-subtotal'>
                    <div className='cart-right-subtotal'>
                        Subtotal ({numCartItems} item{numCartItems > 1 && "s"}):
                    </div>
                    <div className="cart-dollars"> ${parseFloat(totalPrice).toFixed(2)}</div>
                </div>
                <Link to={"/checkout"} className="cart-show-link">
                    Proceed to checkout
                </Link>
            </div>
        </div>
    )
}

export default CartShow;
