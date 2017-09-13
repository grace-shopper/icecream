import store from '../store'; 
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 
import SingleProduct from './SingleProduct.jsx'; 

export default class Root extends Component {
	constructor() {
		super() 
	}

	componentDidMount() {
		//get all products by dispatching to reducer and updating store
		//get the '{me}'
	}

	render() {
		console.log("sup!"); 
		console.log(); 
		return (
			<div className="container-fluid"> 
				<Switch>
					<Route exact path="/products/:productId" component={SingleProduct}/> 
				</Switch>
			</div> 
		)
	}
}