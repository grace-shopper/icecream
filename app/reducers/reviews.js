import axios from 'axios';

// ACTION TYPES
const GET_REVIEWS = 'GET_REVIEWS';
const DELETE_REVIEW = 'DELETE_REVIEW';
const ADD_REVIEW = 'ADD_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';

// ACTION CREATORS
export function getReviews(reviews) {
  const action = { type: GET_REVIEWS, reviews };
  return action;
}

export function deleteReview(review) {
  const action = { type: DELETE_PRODUCT, review };
  return action;
}

export function addReview(review) {
  const action = { type: ADD_PRODUCT, review };
  return action;
}

export function updateReview(review) {
  const action = { type: UPDATE_PRODUCT, review };
  return action;
}

// THUNK CREATORS
export function getReview(id) {
  return function thunk(dispatch) {
    return axios.get(`/api/reviews/${id}`)
      .then(res => res.data)
      .then(review => {
        dispatch(chooseProduct(review));
      });
  }
}
