import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

export class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // get ID
  };

  render() {
  	return (
  		<div>
  		Cart
  		</div>
  	)
  }

}

const mapStateToProps = function (state) {
  return {
    cart: state.cart,
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
