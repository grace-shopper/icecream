import axios from 'axios';

// ACTION TYPES
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART';
const EDIT_QTY_CART = 'EDIT_QTY_CART';
const CLEAR_CART = 'CLEAR_CART'


// ACTION CREATORS
export function addToCart(product, quantity) {
  const action = { type: ADD_ITEM_TO_CART, item: {product, quantity} };
  return action;
}

export function deleteFromCart(product) {
  const action = { type: DELETE_ITEM_FROM_CART, product };
  return action;
}

export function editQtyCart(product, newQty) {
  const action = { type: EDIT_QTY_CART, item: {product, newQty} };
  return action;
}

export function clearCart() {
  const action = { type: CLEAR_CART };
  return action;
}

// thunk creators - will be different for authenticated and unauthenticated users
// unauthenticated users - need to update sessions object


// authenticated users - need to update database

// reducer
const reducer = function (state = [], action) {
  switch (action.type) {

    case ADD_ITEM_TO_CART:
      return [...state, action.item]

    case DELETE_ITEM_FROM_CART:
      let newCartArray = state.filter(cart => cart.product.id !== action.product.id);
      return newCartArray

    case EDIT_QTY_CART:
      newCartArray = state.filter(cart => cart.product.id !== action.product.id);
      return [...newCartArray, action.item]

    case CLEAR_CART:
      return []

    default:
      return state
  }
};

export default reducer;
