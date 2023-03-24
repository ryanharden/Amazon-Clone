// Constant Action Types

const GET_ORDERS = 'orders/GET_ORDERS';
const EMPTY_ORDERS = 'orders/EMPTY_ORDERS';
// const CREATE_ORDER = 'orders/CREATE_ORDER';

// Action Creators

const getOrders = (orders) => ({
    type: GET_ORDERS,
    orders
})

export const emptyOrders = () => ({
    type: EMPTY_ORDERS
})

// const createOrder = (order) =>  ({
//     type: CREATE_ORDER,
//     order
// })

// Thunk Action Creators

// Get Orders

export const getOrdersThunk = () => async (dispatch) => {
    const res = await fetch('/api/orders/current');
    if (res.ok) {
        const orders = await res.json();
        dispatch(getOrders(orders))
        return orders
    }
}

// Create Order

export const createOrderThunk = (body) => async (dispatch) => {
    console.log('createOrderThunk called');
    const res = await fetch('/api/orders', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    if (res.ok) {
        const newOrder = await res.json();
        await dispatch(getOrdersThunk())
        return newOrder.id;
    }
}


const initialState = []
// Orders Reducer

export default function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders;

        case EMPTY_ORDERS:
            return [];

        default:
            return state;
    }
}
