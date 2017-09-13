import axios from 'axios';


/* ------------------    ACTIONS    --------------------- */

const SET    = 'SET_CURRENT_USER';
//const REMOVE = 'REMOVE_CURRENT_USER';

/* --------------    ACTION CREATORS    ----------------- */

const set     = user => ({ type: SET, user });
//const remove  = () => ({ type: REMOVE });

/* ------------------    REDUCER    --------------------- */

export default function reducer (currentUser = null, action) {
  switch (action.type) {

    case SET:
      return action.user;

    // case REMOVE:
    //   return null;

    default:
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */


const resToData = res => res.data;

// a "simple" dispatcher which uses API, changes state, and returns a promise.
export const login = credentials => dispatch => {
  return axios.put('/api/auth/me', credentials)
  .then(resToData)
  .then(user => {
    dispatch(set(user));
    return user;
  });
};



// export const signup = credentials => dispatch => {
//   return axios.post('/api/auth/me', credentials)
//   .then(resToData)
//   .then(user => {
//     dispatch(createUser(user)); // so new user appears in our master list
//     dispatch(set(user)); // set current user
//     return user;
//   });
// };

// export const signupAndGoToUser = credentials => dispatch => {
//   dispatch(signup(credentials))
//   .then(user => browserHistory.push(`/users/${user.id}`))
//   .catch(err => console.error('Problem signing up:', err));
// };

// export const retrieveLoggedInUser = () => dispatch => {
//   axios.get('/api/auth/me')
//   .then(res => dispatch(set(res.data)))
//   .catch(err => console.error('Problem fetching current user', err));
// };

// optimistic
// export const logout = () => dispatch => {
//   dispatch(remove());
//   axios.delete('/api/auth/me')
//   .catch(err => console.error('logout unsuccessful', err));
// };