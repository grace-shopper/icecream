import axios from 'axios';

// ACTION TYPES
const GET_CATEGORIES = 'GET_CATEGORIES';


// ACTION CREATORS
export function getCategories(categories) {
  const action = { type: GET_CATEGORIES, categories };
  return action;
}



// THUNK CREATORS
export function fetchCategories() {
    
  return function thunk(dispatch) {
    
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        const action = getCategories(categories);
        dispatch(action);
      })
  }
}



const reducer = function (category = [], action) {
  switch (action.type) {

    case GET_CATEGORIES:
      return action.categories

    
    default:
      return category
  }
};

export default reducer;
