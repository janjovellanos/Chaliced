import { csrfFetch } from "./csrf";

export const LOAD_PROD_FAVS = 'favorites/loadProdFavs';
// export const LOAD_AVAIL_PRODUCTS = 'products/loadAvailProducts';
// export const LOAD_ONE_PRODUCT = 'products/loadOneProduct';
// export const CREATE_PRODUCT = 'products/createProduct';
// export const UPDATE_PRODUCT = 'products/updateProduct';
// export const DELETE_PRODUCT = 'products/deleteProduct';

const loadProdFavs = (data) => ({
    type: LOAD_PROD_FAVS,
    data
})

// const loadAvailProducts = (data) => ({
//     type: LOAD_AVAIL_PRODUCTS,
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

export const getProdFavs = (productId) => async dispatch => {
    const res = await csrfFetch(`/api/products/${productId}/favorites`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadProdFavs(data));
    }
}

// export const getAvailProducts = () => async dispatch => {
//     const res = await csrfFetch('/api/products');
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(loadAvailProducts(data));
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

const favoritesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PROD_FAVS:
            newState = { ...state };
            // console.log(action);
            action.data.Favorites.forEach(fav => {
                newState[fav.id] = fav;
            });
            return newState
        // case LOAD_AVAIL_PRODUCTS:
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

export default favoritesReducer
