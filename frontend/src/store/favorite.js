import { csrfFetch } from "./csrf";

export const LOAD_PROD_FAVS = 'favorites/loadProdFavs';
export const CREATE_FAV = 'favorites/createFav';
export const DELETE_FAV = 'favorites/deleteFav';



const loadProdFavs = (data) => ({
    type: LOAD_PROD_FAVS,
    data
})

const createFav = (data) => ({
    type: CREATE_FAV,
    data
})

const deleteFav = (data) => ({
    type: DELETE_FAV,
    data
})



export const getProdFavs = (productId) => async dispatch => {
    const res = await csrfFetch(`/api/products/${productId}/favorites`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadProdFavs(data));
    }
}

export const addFav = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const favorite = await res.json();
        dispatch(createFav(favorite));

        return favorite;
    }
}

export const removeFav = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}/favorites`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const deletedFavorite = await res.json();
        dispatch(deleteFav(deletedFavorite));
    }
}



const favoritesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PROD_FAVS:
            newState = {};
            action.data.Favorites.forEach(fav => {
                newState[fav.id] = fav;
            });
            return newState
        case CREATE_FAV:
            newState = {...state};
            newState[action.data.id] = action.data
            return newState;
        case DELETE_FAV:
            newState = { ...state };
            delete newState[action.data.deletedFav.id];
            return newState;
        default:
            return state;
    }
}

export default favoritesReducer
