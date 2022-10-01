import { csrfFetch } from "./csrf";

export const LOAD_MY_ORDERS = 'my/loadMyOrders';
export const LOAD_MY_SOLD = 'my/loadMySold';
export const LOAD_MY_REVIEWS = 'my/loadMyReviews';
export const LOAD_MY_FAVS = 'my/loadMyFavs';
export const CREATE_ORDER = 'my/createOrder';



const loadMyOrders = (data) => ({
    type: LOAD_MY_ORDERS,
    data
})

const loadMySold = (data) => ({
    type: LOAD_MY_SOLD,
    data
});

const loadMyReviews = (data) => ({
    type: LOAD_MY_REVIEWS,
    data
});

const loadMyFavs = (data) => ({
    type: LOAD_MY_FAVS,
    data
})

const createOrder = (data) => ({
    type: CREATE_ORDER,
    data
});



export const getMyOrders = () => async dispatch => {
    const res = await csrfFetch(`/api/my/orders`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadMyOrders(data));
    }
}

export const getMySold = () => async (dispatch) => {
    const res = await csrfFetch(`/api/my/sold`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadMySold(data));
    }
};

export const getMyReviews = () => async (dispatch) => {
    const res = await csrfFetch(`/api/my/reviews`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadMyReviews(data));
    }
};

export const getMyFavs = () => async dispatch => {
    const res = await csrfFetch(`/api/my/favorites`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadMyFavs(data));
    }
}

export const addOrder = (productId) => async (dispatch) => {

    const res = await csrfFetch('/api/my/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId
        })
    });

    if (res.ok) {
        const order = await res.json();
        dispatch(createOrder(order));

        return order;
    }
}



const myReducer = (state = {Orders: {}, Sold: {}, Reviews: {}, Favorites: {}}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_MY_ORDERS:
            newState = {...state};
            action.data.forEach(order => newState.Orders[order.id]= order)
            return newState
        case LOAD_MY_SOLD:
            newState = {...state};
            action.data.forEach(sold => newState.Sold[sold.id]= sold)
            return newState
        case LOAD_MY_REVIEWS:
            newState = {...state};
            action.data.forEach(review => newState.Reviews[review.id]= review)
            return newState
        case LOAD_MY_FAVS:
            newState = {...state};
            newState.Favorites = {};
            action.data.forEach(favorite => newState.Favorites[favorite.id]= favorite)
            return newState
        case CREATE_ORDER:
            newState = {...state};
            newState.Orders[action.data.id] = action.data
            return newState
        default:
            return state;
    }
}

export default myReducer
