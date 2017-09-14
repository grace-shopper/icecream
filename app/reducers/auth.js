import axios from 'axios';
import { create  } from './users';

/* ------------------    ACTIONS    --------------------- */

const SET    = 'SET_CURRENT_USER';

/* --------------    ACTION CREATORS    ----------------- */

const set     = user => ({ type: SET, user });

/* ------------------    REDUCER    --------------------- */

export default function reducer (currentUser = null, action) {
  switch (action.type) {

    case SET:
      return action.user;

    default:
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */



export const login = credentials => dispatch => {
  return axios.put('/api/auth/login', credentials)
  .then(res => res.data)
  .then(user => {
    dispatch(set(user));
    return user;
  });
};



export const signup = credentials => dispatch => {
  return axios.post('/api/auth/signup', credentials)
  .then(res => res.data)
  .then(user => {
    dispatch(create(user)); 
    dispatch(set(user)); 
    return user;
  });
};

