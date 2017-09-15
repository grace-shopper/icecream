import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {fetchProducts, getProduct, createNewCart, updateCart} from '../reducers';

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	inventory: []
    }
    this.createInventoryArr = this.createInventoryArr.bind(this);
  }
  createInventoryArr(product) {
  	let inventory = [];
		for(let i=1; i<=product.inventory; i++) {
			inventory.push(i);
		}
		return inventory;
  }

  componentDidMount() {
		const productId = this.props.match.params.productId;

		this.props.updateChosenProduct(productId)
			.then(()=>{
				const inventory = this.createInventoryArr(this.props.currentProduct);
				this.setState({inventory})
			});
  };

	// need to update link to go to a particular users id
  render() {
		console.log('props in render', this.props)
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
  					<form>
  						<label><b>Quantity:</b></label>
  						<select className="form-control">
  							{
  								this.state.inventory.map(num => {
  									return (
  										<option key={num} value={num}>{num}</option>
  									)
  								})
  							}
							</select>
							<NavLink to={`/cart`}>
							<button
									onClick={(e)=>this.props.addToCart(e,this.props.currentProduct, this.props.cart)}
									className="btn btn-default">
	  						Add to Cart
							</button>
							</NavLink>
	  				</form>
  				</div>
  			</div>
  		</div>
  		</div>
  	)
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
    updateChosenProduct: function(product) {
      return dispatch(getProduct(product))
		},
		addToCart: function(e, product, cart) {
			//console.log('product in frontend', product)
			e.preventDefault()
			if (Object.keys(cart).length === 0) dispatch(createNewCart(product, 1))
			else dispatch(updateCart(product, 1))
		}
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default SingleProductContainer;
