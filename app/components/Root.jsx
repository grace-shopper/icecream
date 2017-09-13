// OB/CJP: unused dependencies
import store from '../store';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AllProducts from './AllProducts.js';
import SingleProduct from './SingleProduct.jsx';

export default class Root extends Component {
	// OB/CJP: unnecessary constructor (does this by default)
	constructor() {
		super()
	}

	componentDidMount() {
		//get all products by dispatching to reducer and updating store
		//get the '{me}'
	}

	render() {
		return (
			<div className="container-fluid">
				<Switch>
					<Route exact path="/products" component={AllProducts}/>
					<Route exact path="/products/:productId" component={SingleProduct}/>
				</Switch>
			</div>
		)
	}
}
