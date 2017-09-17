import axios from 'axios';

// ACTION TYPES
const GET_REVIEWS = 'GET_REVIEWS';

// ACTION CREATORS
export function getReviews(reviews) {
  const action = { type: GET_REVIEWS, reviews };
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

// reducer
const reducer = function (state = {}, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    default:
      return state
  }
};

export default reducer;
