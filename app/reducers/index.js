import { combineReducers } from 'redux';
import products from './products';
import currentProduct from './currentProduct'
import cart from './cart'
import currentUser from './auth';
import orders from './orders';
import hasCart from './hasCart';

const rootReducer = combineReducers({
	products,
	currentProduct,
	cart,
	hasCart,
	currentUser,
	orders
})

export default rootReducer;

export * from './products';
export * from './currentProduct';
export * from './cart';
export * from './orders';
export * from './auth';
export * from './hasCart'
