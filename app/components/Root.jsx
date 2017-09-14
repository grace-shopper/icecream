import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import store from '../store';
import {fetchProducts} from '../reducers';
import AllProducts from './AllProducts.js';
import SingleProduct from './SingleProduct.jsx';
import Navbar from './Navbar.jsx';

//import {me} from '../store'

export default class Root extends Component {
	constructor() {
		super()
	}

	componentDidMount() {
		//get all products by dispatching to reducer and updating store
		store.dispatch(fetchProducts());

		//get the '{me}'
		//this.props.loadInitialData();
	}

	render() {
		const {isLoggedIn} = this.props

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

// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData () {
//       dispatch(me())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Root)

