import "./ProductShow.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import ProductBuy from "./ProductBuy/ProductBuy";
import ProductImages from "./ProductImages/ProductImages";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductReviews from "../../Reviews/ProductReviews/ProductReviews";
import { getProductThunk } from "../../../store/products";
import { clearReviews } from "../../../store/reviews";

const ProductShow = () => {
    const dispatch = useDispatch();

    const { productId } = useParams();

    const product = useSelector(state => state.Products.singleProduct);

    useEffect(() => {
        dispatch(clearReviews());
        dispatch(getProductThunk(productId))
    }, [dispatch, productId])

    if (!product || !product.images || !product.images.length) return null;

    return (
        <div className="product-show-container">
            <div className="product-show-top">
                <ProductImages product={product} />
                <ProductInfo product={product} />
                <ProductBuy product={product} />
            </div>
            <div className="product-show-bottom">
                <ProductReviews product={product} />
            </div>
        </div>
    )
}

export default ProductShow;
