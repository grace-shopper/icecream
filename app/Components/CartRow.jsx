import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'; 
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { getProduct, editCart, removeItemFromCart } from '../reducers'; 	

export class CartRow extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			msg : '', 
			chosenQty: props.product.order_products.quantity
		}
		this.handleChange = this.handleChange.bind(this); 
		
	}

	componentDidMount() {
		this.props.getProduct(this.props.product.id);
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps === this.props) {
			return; 
		} else {
			if(this.props.product.order_products.quantity > this.props.product.inventory) {
				this.setState({ msg: 'Quantity is not available'}); 
			}
		}
	}

	handleChange(event, value, currentProduct, currentCart) {
		this.setState({chosenQty : value })
		this.props.updateCartQuantiy(currentProduct, value); 
	}

	handleRemove(event, currentProduct) {
		event.preventDefault();
		this.props.removeItemFromCart(currentProduct.id);
	}

	render() {
		const CreateDropDownMenu = (props) => {
      const items = []; 
      for(let i=1; i<=props.item.inventory; i++) {
        items.push(<MenuItem value={i} key={i} primaryText={i} />)
      }
      return (
        <DropDownMenu maxHeight={300} value={this.state.chosenQty} onChange={(e, index, value) => {this.handleChange(e, value, this.props.product, this.props.cart)}}>
          {items}
        </DropDownMenu>
      )
    }

		return (
			<TableRow> 
       	<TableRowColumn><button onClick={(event) => {this.handleRemove(event, this.props.currentProduct)}} className="close" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button> {this.props.product.title}</TableRowColumn> 
      	<TableRowColumn>{this.props.product.price}</TableRowColumn> 
      	<TableRowColumn> <CreateDropDownMenu item={this.props.product} /></TableRowColumn> 
      	<TableRowColumn>{this.state.msg}</TableRowColumn> 
      	
      </TableRow> 
		)
	}
}

const mapStateToProps = function(state) {
	return {
		currentProduct: state.currentProduct, 
		cart: state.cart
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		getProduct: function(id) {
			return dispatch(getProduct(id)); 
		}, 
		updateCartQuantiy: function(product, qty) {
			return dispatch(editCart(product.id, qty)); 
		},
		removeItemFromCart: function (productId) {
      dispatch(removeItemFromCart(productId))
    }
	}	
} 

const CartRowContainer = connect(mapStateToProps, mapDispatchToProps)(CartRow); 
export default CartRowContainer; 