import { combineReducers } from 'redux';
import products from './products';
import currentProduct from './currentProduct'
import cart from './cart'
import currentUser2 from './currentUser'
import currentUser from './auth';
import orders from './orders'

const rootReducer = combineReducers({
	products,
	currentProduct,
	cart,
	currentUser2,
  currentUser,
	orders
})

export default rootReducer;

export * from './products';
export * from './currentProduct';
export * from './cart';
export * from './currentUser';
export * from './orders';
export * from './auth'; 