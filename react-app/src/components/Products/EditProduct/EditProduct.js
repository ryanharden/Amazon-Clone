import React, { useEffect }from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../ProductForm/ProductForm";
import { useSelector, useDispatch } from "react-redux";
import { getProductThunk} from "../../../store/products";


const EditProduct = () =>{

    const {productId} = useParams();

    const product = useSelector(state => state.Products.singleProduct)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProductThunk(productId));
    }, [dispatch, productId]);



    if(!(Object.values(product)).length) return null

    const currentProduct={
        id: product.id,
        seller_id: product.seller_id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        inventory: product.inventory,
        images: product.images,
    }

    return (
        <ProductForm product={currentProduct} formType="edit"/>
    )
}

export default EditProduct;
