import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */


const CREATE        = 'CREATE_USER';



/* ------------   ACTION CREATORS     ------------------ */


export const create = user => ({ type: CREATE, user });



/* ------------       REDUCER     ------------------ */

export default function reducer (users = [], action) {
  switch (action.type) {

   
    case CREATE:
      return [action.user, ...users];

    
    default:
      return users;
  }
}


/* ------------       DISPATCHERS     ------------------ */



export const addUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
};

