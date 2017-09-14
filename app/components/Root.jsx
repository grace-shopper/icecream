import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import store from '../store';
import {fetchProducts} from '../reducers';
import AllProducts from './AllProducts.js';
import SingleProduct from './SingleProduct.jsx';
import Navbar from './Navbar.jsx';

export default class Root extends Component {
	constructor() {
		super()
	}

	componentDidMount() {
		//get all products by dispatching to reducer and updating store
		store.dispatch(fetchProducts());

		//get the '{me}'
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className="container-fluid">
					<Switch>
						<Route exact path="/" component={AllProducts}/>
						<Route exact path="/:productId" component={SingleProduct}/>
					</Switch>
				</div>
			</div>
		)
	}
}
