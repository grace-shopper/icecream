import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {checkoutCart, fetchProducts} from '../reducers';
import Dialog from 'material-ui/Dialog';

export class Checkout extends Component {

  constructor() {
    super()
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen(event) {
    this.setState({open: true});
    this.props.handlePurchase();
  }


  render() {

    return (
      <div>
      <RaisedButton label="Purchase" onClick={this.handleOpen} />
      <Dialog modal={false} open={this.state.open} modal={false} onClick={this.handleClose} >
        <RaisedButton onClick={this.props.handleKeepShopping} type="submit" label="Keep Shopping!" primary={true} />
      </Dialog>
    </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    cart: state.cart,
    products: state.products,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handlePurchase: function() {
      dispatch(checkoutCart())
      dispatch(fetchProducts())
    },

    handleKeepShopping: function() {
      ownProps.history.push('/')
    }
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutContainer;
