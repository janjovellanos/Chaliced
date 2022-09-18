import { csrfFetch } from "./csrf";

export const LOAD_USER_REVIEWS = 'users/loadUserReviews';
// export const LOAD_USER_PRODUCTS = 'users/loadUserProducts';
// export const LOAD_AVAIL_PRODUCTS = 'products/loadAvailProducts';
// export const LOAD_ONE_PRODUCT = 'products/loadOneProduct';
// export const CREATE_PRODUCT = 'products/createProduct';
// export const UPDATE_PRODUCT = 'products/updateProduct';
// export const DELETE_PRODUCT = 'products/deleteProduct';

const loadUserReviews = (data) => ({
    type: LOAD_USER_REVIEWS,
    data
})

// const loadUserProducts = (data) => ({
//     type: LOAD_USER_PRODUCTS,
//     data
// })

// const loadOneProduct = (product) => ({
//     type: LOAD_ONE_PRODUCT,
//     product
// });

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

export const getUserReviews = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/reviews`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserReviews(data));
    }
}

// export const getUserProducts = (userId) => async dispatch => {
//     const res = await csrfFetch(`/api/users/${userId}/products`);
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(loadUserProducts(data));
//     }
// }

// export const getProduct = (productId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/products/${productId}`);

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(loadOneProduct(data));
//     }
// };

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

const reviewsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_REVIEWS:
            newState = { ...state };
            action.data.forEach(review => {
                newState[review.id] = review;
            });
            return newState
        // case LOAD_USER_PRODUCTS:
        //     newState = {};
        //     console.log(action);
        //     action.data.forEach(product => {
        //         if (!product.sold) {
        //             newState[product.id] = product
        //         }
        //     });
        //     return newState;
        // case LOAD_ONE_PRODUCT:
        //     return {
        //         ...state,
        //         [action.product.id]: action.product
        //     }
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

export default reviewsReducer
