import axios from 'axios';

// ACTION TYPES
const CHOOSE_USER = 'CHOOSE_USER';

// ACTION CREATORS
export function chooseUser(user) {
  const action = { type: CHOOSE_USER, user };
  return action;
}

export function getUser(userId) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${userId}`)
      .then(res => res.data)
      .then(user => {
        dispatch(chooseUser(user));
      });
  }
}

const reducer = function (state = {}, action) {
  switch (action.type) {

    case CHOOSE_USER:
      return action.user

    default:
      return state
  }
};

export default reducer;
