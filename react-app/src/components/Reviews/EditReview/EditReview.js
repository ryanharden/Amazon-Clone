import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useSelector, useDispatch } from "react-redux";
import { getProductThunk } from "../../../store/products";


const EditProduct = () =>{

    // const {productId} = useParams();

    // const product = useSelector(state => state.Products.singleProduct)
    // const dispatch = useDispatch();
    // console.log("product: ", product);

    // useEffect(() => {
    //     dispatch(getProductThunk(productId));
    // }, [dispatch, productId]);



    if(!(Object.values(product)).length) return null

    const review = {
        id: review.id,
        rating: review.rating,
        headline: review.headline,
        body: review.body,
        images: review.images,
    }

    return (
        <ProductForm product={currentProduct} formType="edit"/>
    )
}

export default EditProduct;
