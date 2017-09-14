import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import store from '../store';
import {fetchProducts} from '../reducers';
import AllProducts from './AllProducts.jsx';
import SingleProduct from './SingleProduct.jsx';
import 	Login from './Login.jsx';
import 	Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';
import Cart from './Cart.jsx';
import OrderHistory from './OrderHistory.jsx';
import Searchbar from './Searchbar';

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
            <Route path="/login" component={Login} />
					  <Route path="/signup" component={Signup} />
						<Route path="/cart" component={Cart}/>
						<Route exact path="/" component={Searchbar}/>
						<Route exact path="/products" component={Searchbar}/>
						<Route path="/products/:productId" component={SingleProduct}/>
						<Route path="/orders/:userId" component={OrderHistory}/>
						<Route exact path="/products/:productId" component={SingleProduct}/>
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
