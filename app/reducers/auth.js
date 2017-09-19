import axios from 'axios';
import { create } from './users';
import {clearCart, setCart, setCartByUserId} from './cart'

/* ------------------    ACTIONS    --------------------- */

const SET = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';

/* --------------    ACTION CREATORS    ----------------- */

const set = user => ({ type: SET, user });
const remove = () => ({ type: REMOVE });

/* ------------------    REDUCER    --------------------- */

export default function reducer(currentUser = {}, action) {
  switch (action.type) {

    case SET:
      return action.user;

    case REMOVE:
      return {};

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
      dispatch(setCartByUserId(user.id));
      return user;
    })
    .catch(err => console.log(err));
};


export const signup = credentials => dispatch => {
  return axios.post('/api/auth/signup', credentials)
  .then(res => res.data)
  .then(user => {
    dispatch(create(user));
    dispatch(set(user));
    dispatch(setCartByUserId(user.id));
    return user;
  })
  .catch(err => console.log(err));
};

export const me = () => dispatch => {
  return axios.get('/api/auth/me')
  .then(res => res.data)
  .then(user => {
    if (!user) {
      user = {};
      dispatch(set(user));
    }
    else {
      dispatch(set(user));
      dispatch(setCartByUserId(user.id));
    }
  })
  .catch(err => console.log(err));
};

export const signupAndGoToHome = (credentials, history) => dispatch => {
  dispatch(signup(credentials))
    .then(user => history.push(`/products`))
    .catch(err => console.error('Problem signing up:', err));
};

export const logout = () => dispatch => {
  dispatch(remove());
  dispatch(clearCart());
  axios.post('/api/auth/logout')
    .catch(err => console.error('logout unsuccessful', err));
};
