import axios from 'axios';

// ACTION TYPES
const CHOOSE_PRODUCT = 'CHOOSE_PRODUCT';

// ACTION CREATORS
export function chooseProduct(product) {
  const action = { type: CHOOSE_PRODUCT, product };
  return action;
}

export function getProduct(id) {
  return function thunk(dispatch) {
    return axios.get(`/api/products/${id}`)
      .then(res => res.data)
      .then(product => {
        dispatch(chooseProduct(product));
      });
  }
}

const reducer = function (state = {}, action) {
  switch (action.type) {

    case CHOOSE_PRODUCT:
      return action.product

    default:
      return state
  }
};

export default reducer;
