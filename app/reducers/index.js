import { combineReducers } from 'redux';
import products from './products';
import currentProduct from './currentProduct'
import cart from './cart'

const rootReducer = combineReducers({
	products,
	currentProduct,
	cart
})

export default rootReducer;

export * from './products';
export * from './currentProduct';
export * from './cart';
