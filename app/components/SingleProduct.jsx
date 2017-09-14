import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {fetchProducts, getProduct} from '../reducers';

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

		this.props.updateChosenProduct(productId);
		const inventory = this.createInventoryArr(this.props.currentProduct);

  };

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
	  					<button className="btn btn-default">
	  						Add to Cart
	  					</button>
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
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    updateChosenProduct: function(product) {
      dispatch(getProduct(product))
    }
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default SingleProductContainer;
