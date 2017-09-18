import axios from 'axios';

// ACTION TYPES
const GET_REVIEWS = 'GET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';

// ACTION CREATORS
export function getReviews(reviews) {
  const action = { type: GET_REVIEWS, reviews };
  return action;
}

export function addReview(review) {
  const action = { type: ADD_REVIEW, review };
  return action;
}

// THUNK CREATORS
export function fetchReviews(id) {
  return function thunk(dispatch) {
    return axios.get(`/api/reviews/${id}`)
      .then(res => res.data)
      .then(reviews => {
        dispatch(getReviews(reviews));
      });
  }
}

export function postReview(review) {
  return function thunk(dispatch) {
    return axios.post(`/api/reviews`, review)
      .then(res => res.data)
      .then(review => {
        dispatch(addReview(review));
      });
  }
}

// reducer
const reducer = function (state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
};

export default reducer;
