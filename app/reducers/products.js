import axios from 'axios';

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// ACTION CREATORS
export function getProducts(products) {
  const action = { type: GET_PRODUCTS, products };
  return action;
}

export function deleteProduct(product) {
  const action = { type: DELETE_PRODUCT, product };
  return action;
}

export function addProduct(product) {
  const action = { type: ADD_PRODUCT, product };
  return action;
}

export function updateProduct(product) {
  const action = { type: UPDATE_PRODUCT, product };
  return action;
}

// THUNK CREATORS
export function fetchProducts() {
  return function thunk(dispatch) {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        const action = getProducts(products);
        dispatch(action);
      })
  }
}

export function dropProduct(productId, history) {
  return function thunk(dispatch) {
    return axios.delete(`/api/products/${productId}`)
      .then(() => {
        dispatch(deleteProduct(productId));
        history.push('/products');
      })
  }
}

export function postProduct(product, history) {
  return function thunk(dispatch) {
    return axios.post('/api/products', product)
      .then(res => res.data)
      .then(product => {
        dispatch(addProduct(product));
      });
  }
}


export function reviseProduct(product) {
  return function thunk(dispatch) {
    return axios.put(`/api/products/${product.id}`, product)
      .then(res => res.data)
      .then(product => {
        dispatch(updateProduct(product));
      });
  }
}


const reducer = function (state = [], action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return action.products

    case DELETE_PRODUCT:
      const newProductArray = state.filter(product => product.id !== action.productId);
      return newProductArray

    case ADD_PRODUCT:
      return [...state, action.product]

    case UPDATE_PRODUCT:
      const newProductsArray = state.filter(product => action.product.id !== product.id);
      return [...newCampusesArray, action.product]

    default:
      return state
  }
};

export default reducer;
