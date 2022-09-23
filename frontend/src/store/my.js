import { csrfFetch } from "./csrf";

export const LOAD_MY_ORDERS = 'my/loadMyOrders';
export const LOAD_MY_SOLD = 'my/loadMySold';
// export const LOAD_AVAIL_PRODUCTS = 'products/loadAvailProducts';
// export const LOAD_ONE_PRODUCT = 'products/loadOneProduct';
// export const CREATE_PRODUCT = 'products/createProduct';
// export const UPDATE_PRODUCT = 'products/updateProduct';
// export const DELETE_PRODUCT = 'products/deleteProduct';

const loadMyOrders = (data) => ({
    type: LOAD_MY_ORDERS,
    data
})

const loadMySold = (data) => ({
    type: LOAD_MY_SOLD,
    data
});

// const createProduct = (product) => ({
//     type: CREATE_PRODUCT,
//     product
// });

// const deleteProduct = (id) => ({
//     type: DELETE_PRODUCT,
//     id
// });

// const updateProduct = (song) => ({
//     type: UPDATE_PRODUCT,
//     song
// })

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

// export const addProduct = (data) => async (dispatch) => {
//     const { name, description, size, price, categoryId } = data;

//     const res = await csrfFetch('/api/products', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name,
//             description,
//             size,
//             price,
//             categoryId
//         })
//     });

//     if (res.ok) {
//         const product = await res.json();
//         dispatch(createProduct(product));

//         return product;
//     }
// };

// export const editProduct = (product, productId) => async (dispatch) => {
//     const { name, description, size, price, categoryId } = product;


//     const res = await csrfFetch(`/api/product/${productId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name,
//             description,
//             size,
//             price,
//             categoryId
//         })
//     });
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(updateProduct(data))
//     }
// }

// export const removeProduct = (productId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/products/${productId}`, {
//         method: 'DELETE'
//     });

//     if (res.ok) {
//         dispatch(deleteProduct(productId));
//     }
// };

const myReducer = (state = {Orders: {}, Sold: {}}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_MY_ORDERS:
            // console.log('ORDERS', action);
            newState = {...state};
            action.data.forEach(order => newState.Orders[order.id]= order)
            return newState
        case LOAD_MY_SOLD:
            // console.log('SOLD', action);
            newState = {...state};
            action.data.forEach(sold => newState.Sold[sold.id]= sold)
            return newState
        // case CREATE_PRODUCT:
        //     return {
        //         ...state,
        //         [action.song.id]: action.song
        //     }
        // case UPDATE_PRODUCT:
        //     return {
        //         ...state,
        //         [action.song.id]: action.song
        //     };
        // case DELETE_PRODUCT:
        //     newState = { ...state };
        //     delete newState[action.id];
        //     return newState;
        default:
            return state;
    }
}

export default myReducer
