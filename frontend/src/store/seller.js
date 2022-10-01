import { csrfFetch } from "./csrf";

export const LOAD_SELLER_DETAILS = 'sellers/loadSellerDetails';
export const LOAD_SELLERS = 'sellers/loadSellers';



const loadSellerDetails = (data) => ({
    type: LOAD_SELLER_DETAILS,
    data
})



export const getUserDetails = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadSellerDetails(data));
    }
}



const sellersReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SELLER_DETAILS:
            newState = {};
            newState[action.data.id] = action.data
            return newState
        default:
            return state;
    }
}

export default sellersReducer
