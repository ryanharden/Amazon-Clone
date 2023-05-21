import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductsThunk } from "../../../../store/products";
import UserProductItem from "../UserProductItem/UserProductItem";
import "./AllUserProducts.css";

const AllUserProducts = () => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.Products.userProducts);

    const currentUser = useSelector(state => state.session.user);

    let userProductsArr;
    let userProductItems;
    if (Object.values(userProducts).length) {
        userProductsArr = Object.values(userProducts);
        userProductItems = userProductsArr.map(product => {
            // console.log("product: ", product)
            return <UserProductItem key={product.id} product={product} />
        });
    }

    useEffect(() => {
        dispatch(getUserProductsThunk(currentUser?.id))
    }, [dispatch, currentUser?.id])

    if (!currentUser) return null;
    if (!Object.values(currentUser).length) return null;

    return (
        <div className="all-user-products-header">
            <div className="all-user-products-container">
                {userProductItems ? userProductItems : (
                    <div className="no-products-container">
                        <div className="no-products-header">
                            You don't have any products listed yet!
                        </div>
                        <div className="instructions-arrow">
                            <div className="instructions">
                                Click below for a quick and easy listing process
                            </div>
                            <div className="down-arrow"><i className="fa-solid fa-turn-down"></i></div>
                        </div>
                        <Link to={"/createproduct"} className="create-product-big-link">
                            <div className='create-product-big'>
                                List a Product
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
};


export default AllUserProducts;
