// Constant Action Types

const GET_CARTITEMS = "cartitems/GET_CARTITEMS";
const ADD_CARTITEM = "cartitems/ADD_CARTITEM";
const EDIT_CARTITEM = "cartitems/EDIT_CARTITEM";
const DELETE_CARTITEM = "cartitems/DELETE_CARTITEMS";
const EMPTY_CART = "cartitems/EMPTY_CART";

// Action Creators

const getCartItems = (cartItems) => ({
    type: GET_CARTITEMS,
    cartItems
})

const addCartItem = (cartItem) => ({
    type: ADD_CARTITEM,
    cartItem
})

const editCartItem = (cartItem) => ({
    type: EDIT_CARTITEM,
    cartItem
})

const deleteCartItem = (cartItemId) => ({
    type: DELETE_CARTITEM,
    cartItemId
})

const emptyCart = () => ({
    type: EMPTY_CART
})


// Thunk Action Creators

export const getCartItemsThunk = () => async (dispatch) => {
    const res = await fetch("/api/cartitems");
    if (res.ok) {
        const cartItems = await res.json();
        dispatch(getCartItems(cartItems));
        return cartItems
        // {item.id: item.to_dict() for item in cart_items}
    } else {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
};

export const addCartItemThunk = (productId, quantity) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/cartitems`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
    })

    if (res.ok) {
        const newCartItem = await res.json();
        dispatch(addCartItem(newCartItem))
        return newCartItem
    } else {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

export const editCartItemThunk = (cartItemId, quantity) => async (dispatch) => {
    const res = await fetch(`/api/cartitems/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
    });

    if (res.ok) {
        const cartItem = await res.json();
        dispatch(editCartItem(cartItem));
        return cartItem
    } else {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

export const deleteCartItemThunk = (cartItemId) => async (dispatch) => {
    const res = await fetch(`/api/cartitems/${cartItemId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const cartItem = await res.json();
        // console.log("cartItem-store: ", cartItem);
        dispatch(deleteCartItem(cartItem.id));
        return cartItem
    } else {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

export const emptyCartThunk = () => async (dispatch) => {
    const res = await fetch("/api/cartitems", {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(emptyCart())
    }
}

// Initial State

const initialState = {}

export default function cartItemReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Get Cart Items
        case GET_CARTITEMS:
            // newState = { ...state }
            // newState.cartItems = action.cartItems
            // return newState;
            return { ...action.cartItems }


        // Add Cart Item & Edit Cart Item
        case ADD_CARTITEM:
            return { ...state, [action.cartItem.product_id]: action.cartItem }

        case EDIT_CARTITEM:
            const editedCartItem = { ...state[action.cartItem.product_id], ...action.cartItem };
            return { ...state, [action.cartItem.id]: editedCartItem };

        // Delete Cart Item
        case DELETE_CARTITEM:
            newState = { ...state }
            delete newState[action.cartItemId];
            return newState;


        // case DELETE_USERITEM:
        //     newState = { ...state }
        //     newState = {}
        //     return newState

        // Empty Cart
        case EMPTY_CART:
            return initialState;

        // Default
        default:
            return state;
    }
}
