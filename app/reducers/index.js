import { combineReducers } from 'redux';
import products from './products';
import currentProduct from './currentProduct'
import cart from './cart'
import currentUser from './auth';
import orders from './orders';
import categories from './category';

const rootReducer = combineReducers({
	products,
	currentProduct,
	cart,
	currentUser,
	orders,
	categories
})

export default rootReducer;

export * from './products';
export * from './currentProduct';
export * from './cart';
export * from './orders';
export * from './auth';
export * from './users'; 
export * from './category'; 
