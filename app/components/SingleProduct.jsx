import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchProducts, getProduct, createNewCart, updateCart } from '../reducers';

export class SingleProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inventory: [],
			chosenQty: 1
		}
		this.createInventoryArr = this.createInventoryArr.bind(this);
		this.handleChange = this.handleChange.bind(this)
				this.handleSubmit = this.handleSubmit.bind(this)

	}

	createInventoryArr(product) {
		let inventory = [];
		for (let i = 1; i <= product.inventory; i++) {
			inventory.push(i);
		}
		return inventory;
	}

	componentDidMount() {
		const productId = this.props.match.params.productId;

		this.props.updateChosenProduct(productId)
			.then(() => {
				const inventory = this.createInventoryArr(this.props.currentProduct);
				this.setState({ inventory })
			});
	};

	// need to update link to go to a particular users id
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-sm-6 col-md-6 col-lg-6">
						<h2 className="text-center">{this.props.currentProduct.title} </h2>
						<img src={`/images/${this.props.currentProduct.imageName}`} />
					</div>
					<div className="col-sm-6 col-md-6 col-lg-6">
						<div>
							<b>Description:  </b>
							{this.props.currentProduct.description}
						</div>
						<div>
							<b>Price: </b>
							{this.props.currentProduct.price}
						</div>
						<div>
							<form
								onSubmit={this.handleSubmit}
							>
							<div className="form-group">
								<label>
									<b>Quantity:</b>
									<select
										className="form-control"
										name="qty"
										value={this.state.chosenQty}
										onChange={this.handleChange}
									>
										{
											this.state.inventory.map(num => {
												return (
													<option key={num} value={num}>{num}</option>
												)
											})
										}
									</select>
								</label>
								</div>
								<div className = "form-group">
								<button type="submit"
									className="btn btn-success">
									Add to Cart
							</button>
							</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}

	handleChange(event) {
		this.setState({ chosenQty: event.target.value })
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.addToCart(this.state.chosenQty, this.props.currentProduct, this.props.cart)
	}

}

const mapStateToProps = function (state) {
	return {
		currentProduct: state.currentProduct,
		currentUser: state.currentUser,
		cart: state.cart
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return {
		updateChosenProduct: function (product) {
			return dispatch(getProduct(product))
		},
		addToCart: function (qty, product, cart) {
			if (Object.keys(cart).length === 0) dispatch(createNewCart(product, qty))
			else dispatch(updateCart(product, qty))
		}
	}
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default SingleProductContainer;
