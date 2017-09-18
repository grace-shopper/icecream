import axios from 'axios';

// ACTION TYPES
const GET_ORDERS = 'GET_ORDERS';

// ACTION CREATORS
export function getOrders(orders) {
  const action = { type: GET_ORDERS, orders };
  return action;
}

// THUNK CREATORS
export function fetchOrders(userId) {
  return function thunk(dispatch) {
    return axios.get(`/api/orders/${userId}`)
      .then(res => res.data)
      .then(orders => {
        dispatch(getOrders(orders));
      })
  }
}

export function fetchAllOrders() {
  return function thunk(dispatch) {
    return axios.get(`/api/orders`)
      .then(res => res.data)
      .then(orders => {
        dispatch(getOrders(orders)); 
      })
  }
}

const reducer = function (state = [], action) {
  switch (action.type) {

    case GET_ORDERS:
      return action.orders

    default:
      return state
  }
};

export default reducer;
