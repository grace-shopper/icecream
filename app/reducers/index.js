import { combineReducers } from 'redux';
import products from './products';
import currentProduct from './currentProduct'

const rootReducer = combineReducers({
	products,
	currentProduct
})

export default rootReducer;

export * from './products';
export * from './currentProduct';
