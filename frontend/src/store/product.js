import { csrfFetch } from "./csrf";

export const LOAD_PRODUCTS = 'products/loadProducts';
export const LOAD_AVAIL_PRODUCTS = 'products/loadAvailProducts';
export const LOAD_USER_PRODUCTS = 'users/loadUserProducts';
export const LOAD_ONE_PRODUCT = 'products/loadOneProduct';
export const CREATE_PRODUCT = 'products/createProduct';
export const CREATE_PRODUCT_IMAGE = 'products/createProductImage';
export const UPDATE_PRODUCT = 'products/updateProduct';
export const DELETE_PRODUCT = 'products/deleteProduct';
export const LOAD_CATEGORY = 'products/loadCategory';



const loadProducts = (data) => ({
    type: LOAD_PRODUCTS,
    data
})

const loadAvailProducts = (data) => ({
    type: LOAD_AVAIL_PRODUCTS,
    data
})

const loadUserProducts = (data) => ({
    type: LOAD_USER_PRODUCTS,
    data
})

const loadOneProduct = (product) => ({
    type: LOAD_ONE_PRODUCT,
    product
});

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
});

const createProductImage = (productId, image) => ({
    type: CREATE_PRODUCT_IMAGE,
    payload: {productId, image}
});

const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    id
});

const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    product
})

const loadCategory = (data) => ({
    type: LOAD_CATEGORY,
    data
})



export const getProducts = () => async dispatch => {
    const res = await csrfFetch('/api/products');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadProducts(data));
    }
}

export const getAvailProducts = () => async dispatch => {
    const res = await csrfFetch('/api/products');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadAvailProducts(data));
    }
}

export const getUserProducts = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/products`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserProducts(data));
    }
}

export const getProduct = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadOneProduct(data));
    }
};

export const addProduct = (data) => async (dispatch) => {
    const { name, description, size, price, categoryId } = data;

    const res = await csrfFetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            size,
            price,
            categoryId
        })
    });

    if (res.ok) {
        const product = await res.json();
        dispatch(createProduct(product));

        return product;
    }
};

export const addProductImage = (productId, url) => async (dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url,
            productId
        })
    });

    if (res.ok) {
        const image = await res.json();
        dispatch(createProductImage(productId, image));

        return image;
    }
};

export const editProduct = (product, productId) => async (dispatch) => {
    const { name, description, size, price, categoryId } = product;

    const res = await csrfFetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            size,
            price,
            categoryId
        })
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updateProduct(data))
    }
}

export const removeProduct = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteProduct(productId));
    }
};

export const getCategory = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/products/category/${id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadCategory(data));
    }
}



const productsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PRODUCTS:
            newState = { ...state };
            action.data.forEach(product => {
                newState[product.id] = product;
            });
            return newState
        case LOAD_AVAIL_PRODUCTS:
            newState = {};
            action.data.forEach(product => {
                if (!product.sold) {
                    newState[product.id] = product
                }
            });
            return newState;
        case LOAD_USER_PRODUCTS:
            newState = {};
            action.data.forEach(product => {
                if (!product.sold) {
                    newState[product.id] = product
                }
            });
            return newState;
        case LOAD_ONE_PRODUCT:
            return {
                ...state,
                [action.product.id]: action.product
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                [action.product.id]: action.product
            }
        case CREATE_PRODUCT_IMAGE:
            const productImageState = { ...state }
            if (productImageState[action.payload.productId].Images) {
                productImageState[action.payload.productId].Images.push(action.payload.image)
            } else {
                productImageState[action.payload.productId].Images = [action.payload.image]
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                [action.product.id]: action.product
            };
        case DELETE_PRODUCT:
            newState = { ...state };
            delete newState[action.id];
            return newState;
        case LOAD_CATEGORY:
            newState = { ...state};
            action.data.forEach(product => {
                newState[product.id] = product;
            });
            return newState
        default:
            return state;
    }
}

export default productsReducer
