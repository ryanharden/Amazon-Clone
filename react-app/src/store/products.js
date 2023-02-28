// Constant Action Types

const GET_PRODUCTS = "products/GET_PRODUCTS";
const GET_USER_PRODUCTS = "products/GET_USER_PRODUCTS";
const GET_PRODUCT = "products/GET_PRODUCT";
const CREATE_PRODUCT = "products/CREATE_PRODUCT";
const EDIT_PRODUCT = "products/EDIT_PRODUCT";
const DELETE_PRODUCT = "products/DELETE_PRODUCT";

// Action Creators

const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products
})

const getUserProducts = (products) => ({
    type: GET_USER_PRODUCTS,
    products
})

const getProduct = (product) => ({
    type: GET_PRODUCT,
    product
})

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    product
})

const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    productId
})

// Thunk Action Creators

// Get All Products
export const getProductsThunk = () => async (dispatch) => {
    const res = await fetch('/api/products');
    if (res.ok) {
        const products = await res.json();
        dispatch(getProducts(products));
        return products
    } else {
        return res;
    }
}

// Get User Products
export const getUserProductsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/products`);

    if (res.ok) {
        const products = await res.json();
        dispatch(getUserProducts(products));
        return products
    } else {
        const data = await res.json();
        if (data.errors) {
            return data
        }
    }
}


// Get Product
export const getProductThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`);

    if (res.ok) {
        const product = await res.json();
        // console.log("product-store: ", product);
        dispatch(getProduct(product));
        return product
    } else {
        const data = await res.json();
        if (data.errors) {
            return data
        }
    }
}

// Create a Product
export const createProductThunk = (productData) => async (dispatch) => {
    const res = await fetch('/api/products', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    });

    if (res.ok) {
        const product = await res.json();
        // console.log("product: ", product);
        dispatch(createProduct(product));
        return product.id;
    } else {
        const data = await res.json();
        if (data.errors) {
            return data
        }
    }
}

// Post Product Images
export const postProductImages = (productId, formData) => async dispatch => {
    const res = await fetch(`/api/products/${productId}/images`, {
        method: "POST",
        body: formData,
    });
    if (res.ok) {
        const images = await res.json();
        return images
    } else {
        console.log("res: ", res);
        return res.errors;
    }


    // console.log("product: ", product)
}

// Edit a Product
export const editProductThunk = (product) => async (dispatch) => {
    const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
    // console.log("storeRes: ", res)

    if (res.ok) {
        const product = await res.json();
        dispatch(editProduct(product));
        return product
    } else {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

// Delete a Product
export const deleteProductThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const deletedProduct = await res.json();
        dispatch(deleteProduct(productId));
        return deleteProduct
    } else {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

// Initial State

const initialState = {
    allProducts: {},
    singleProduct: {},
    userProducts: {},
}

// Product Reducer
export default function productReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Get All Products
        case GET_PRODUCTS:
            newState = { ...state }
            newState.allProducts = { ...action.products };
            return newState

        // Get User Products
        case GET_USER_PRODUCTS:
            newState = { ...state }
            newState.userProducts = { ...action.products }
            return newState;

        // Get Product
        case GET_PRODUCT:
            // return { ...state, singleProduct: action.product };
            newState = { ...state };
            newState.singleProduct = {};
            newState.singleProduct = { ...action.product };
            return newState;

        // Create Product
        case CREATE_PRODUCT:
            newState = { ...state }
            newState.allProducts = { ...state.allProducts, [action.product.id]: action.product }
            newState.userProducts = { ...state.userProducts, [action.product.id]: action.product }
            return newState;

        // Edit Product
        case EDIT_PRODUCT:
            return { ...state, singleProduct: action.product }

        // Delete Product
        case DELETE_PRODUCT:
            newState = { ...state }
            newState.allProducts = { ...state.allProducts }
            newState.userProducts = { ...state.userProducts }
            delete newState.userProducts[action.productId]
            delete newState.allProducts[action.productId]
            return newState

        // Default
        default:
            return state;
    }
}
