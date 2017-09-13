import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'; 

export default class SingleProduct extends Component {
  constructor(props) {
    super(props); 
    this.state = {
    	product: {}, 
    	quantity: 0, 
    	inventory: []
    }
    this.createInventoryArr = this.createInventoryArr.bind(this); 
  }
  createInventoryArr(product) {
  	console.log(product); 
  	let inventory = []; 
		for(let i=1; i<=product.inventory; i++) {
			inventory.push(i); 
		}
		return inventory; 
  }

  componentDidMount() {
  	const productId = this.props.match.params.productId; 
  	axios.get(`/api/products/${productId}`)
  	.then(res => res.data)
  	.then(product => {
  		let inventory = this.createInventoryArr(product); 
  		this.setState({ product, inventory })
  	})
  	.catch(() => {
  		throw new Error("problem getting single product"); 
  	}); 
  }; 

  render() {
  	return (
  		<div> 
  		<div className="row"> 
  			<div className="col-sm-6 col-md-6 col-lg-6"> 
  				<h2 className="text-center">{this.state.product.title} </h2> 
  				<img src={`/images/${this.state.product.imageName}`} />
  			</div> 
  			<div className="col-sm-6 col-md-6 col-lg-6">
  				<div>
  					<b>Description:  </b>
  					{this.state.product.description}
  				</div> 	
  				<div> 
  					<b>Price: </b> 
  					{this.state.product.price}
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
