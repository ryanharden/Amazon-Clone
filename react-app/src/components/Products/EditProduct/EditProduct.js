import React, { useEffect }from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../ProductForm/ProductForm";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk} from "../../../store/products";


const EditProduct = () =>{

    const {productId} = useParams();

    const product = useSelector(state => state.Products[productId])
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);



    if(!product) return null

    const newProduct={
        id: product.id,
        seller_id: product.seller_id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        inventory: product.inventory,
        // imageUrl: product.imageUrl,
    }

    return (
        <ProductForm product={newProduct} formType="edit"/>
    )
}

export default EditProduct;
