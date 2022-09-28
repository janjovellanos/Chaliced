import { csrfFetch } from "./csrf";

export const LOAD_USER_REVIEWS = 'reviews/loadUserReviews';
export const CREATE_REVIEW = 'reviews/createReview';
export const EDIT_REVIEW = 'reviews/editReview';
export const DELETE_REVIEW = 'reviews/deleteReview';



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
        default:
            return state;
    }
}

export default reviewsReducer
