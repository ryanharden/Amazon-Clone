import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductsThunk } from "../../../../store/products";
import UserProductItem from "../UserProductItem/UserProductItem";

const AllUserProducts = () => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.Products.userProducts);

    const currentUser = useSelector(state => state.session.user);

    let userProductsArr;
    let userProductItems;
    if (Object.values(userProducts).length) {
        userProductsArr = Object.values(userProducts);
        userProductItems = userProductsArr.map(product => {
            return <UserProductItem key={product.id} product={product} />
        });
    }

    useEffect(() => {
        dispatch(getUserProductsThunk(currentUser.id))
    }, [dispatch, currentUser.id])

    if (!Object.values(currentUser).length) return null;

    return (
        <div className="all-user-products-header">
            <div className="all-user-products-container">
                {userProductItems}
            </div>
        </div>
    )
};

export default AllUserProducts;
