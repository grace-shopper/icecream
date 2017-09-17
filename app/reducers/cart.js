import axios from 'axios';

// ACTION TYPES
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART';
const EDIT_QTY_CART = 'EDIT_QTY_CART';
const CLEAR_CART = 'CLEAR_CART'
const SET_CART = 'SET_CART'


// ACTION CREATORS
export function addItemToCart(product, quantity) {
  const action = { type: ADD_ITEM_TO_CART, item: { product, quantity } };
  return action;
}

export function deleteFromCart(product) {
  const action = { type: DELETE_ITEM_FROM_CART, product };
  return action;
}

export function editQtyCart(product, newQty) {
  const action = { type: EDIT_QTY_CART, item: { product, newQty } };
  return action;
}

export function clearCart() {
  const action = { type: CLEAR_CART };
  return action;
}

export function setCart(cart) {
  const action = { type: SET_CART, cart };
  return action;
}


// thunk creators - will be different for authenticated and unauthenticated users
// unauthenticated users - need to update sessions object

export function getCart() {
  return function thunk(dispatch) {
    return axios.get('/api/cart')
      .then(res => res.data)
      .then(cart => {
        if (!cart) cart = {}
        dispatch(setCart(cart));
      })
      .catch(err => console.log(err));
  }
};

export function createNewCart(product, quantity) {
  return function thunk(dispatch) {
    return axios.post('/api/cart/new', { product, quantity })
      .then(res => res.data)
      .then(cart => {
        dispatch(setCart(cart))
      })
      .catch(err=>console.log(err))
  }
}

export function updateCart(product, quantity) {
  return function thunk(dispatch) {
    return axios.post('/api/cart', { product, quantity })
      .then(res => res.data)
      .then(cart => {
        dispatch(setCart(cart))
      })
      .catch(err=>console.log(err))
  }
}

export function setCartByUserId(userId) {
  return function thunk(dispatch) {
    return axios.get(`/api/cart/${userId}`)
      .then(res => res.data)
      .then(cart => {
        dispatch(setCart(cart))
      })
      .catch(err=>console.log(err))
  }
}

// add total quantity to cart state
// reducer
const reducer = function (state = {}, action) {
  switch (action.type) {

    case SET_CART:
      return action.cart

    case ADD_ITEM_TO_CART:
      const newCart = Object.assign({}, state);
      newCart.products.push(action.item);
      return newCart;

    //case DELETE_ITEM_FROM_CART:
    // let newCartArray = state.products.filter(product => product.id !== action.product.id);

    // return Object.assign({}, state)

    //case EDIT_QTY_CART:
    // newCartArray = state.filter(cart => cart.product.id !== action.product.id);
    // return [...newCartArray, action.item]

    case CLEAR_CART:
      return {}

    default:
      return state
  }
};

export default reducer;
