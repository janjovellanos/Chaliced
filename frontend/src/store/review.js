import { csrfFetch } from "./csrf";

export const LOAD_USER_REVIEWS = 'reviews/loadUserReviews';
export const CREATE_REVIEW = 'reviews/createReview';
export const EDIT_REVIEW = 'reviews/editReview';
export const DELETE_REVIEW = 'reviews/deleteReview';
// export const LOAD_AVAIL_PRODUCTS = 'products/loadAvailProducts';
// export const LOAD_ONE_PRODUCT = 'products/loadOneProduct';
// export const CREATE_PRODUCT = 'products/createProduct';
// export const UPDATE_PRODUCT = 'products/updateProduct';

const loadUserReviews = (data) => ({
    type: LOAD_USER_REVIEWS,
    data
})

const createReview = (data) => ({
    type: CREATE_REVIEW,
    data
})

const editReview = (data) => ({
    type: EDIT_REVIEW,
    data
})

const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
});
// const loadOneProduct = (product) => ({
//     type: LOAD_ONE_PRODUCT,
//     product
// });

// const createProduct = (product) => ({
//     type: CREATE_PRODUCT,
//     product
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

export const addReview = (data) => async dispatch => {
    const { stars, body, productId } = data;

    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stars,
            body,
            productId
        })
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(createReview(review));

        return review;
    }
}

export const updateReview = (data) => async dispatch => {
    const { stars, body, id } = data;

    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stars,
            body,
        })
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(editReview(review));

        return review;
    }
}

export const removeReview = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteReview(id));
    }
};

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

const reviewsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_REVIEWS:
            newState = { ...state };
            action.data.forEach(review => {
                newState[review.id] = review;
            });
            return newState
        case CREATE_REVIEW:
            newState = { ...state };
            return newState;
        case EDIT_REVIEW:
            console.log(action);
            return {
                ...state,
                [action.data.id]: action.data
            }
            case DELETE_REVIEW:
                newState = { ...state };
                delete newState[action.id];
                return newState;
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
        default:
            return state;
    }
}

export default reviewsReducer
