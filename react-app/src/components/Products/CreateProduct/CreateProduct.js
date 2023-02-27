import React from "react";
import ProductForm from "../ProductForm/ProductForm";

const CreateProduct = () => {
    const product = {
        seller_id: "",
        name: "",
        description: "",
        category: "",
        price: 0,
        inventory: 1,
        images: []
    }

    return (
        <>
        <ProductForm product={product} formType="create"/>
        </>
    )
}

export default CreateProduct;
