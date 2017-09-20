import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {checkoutCart, fetchProducts, reviseUserAddress} from '../reducers';
import Dialog from 'material-ui/Dialog';

export class Checkout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      address: props.currentUser.address || '',
      zipcode: props.currentUser.zipcode || '',
      email: props.currentUser.email || ''
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCheckoutSubmit = this.handleCheckoutSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleOpen(event) {
    this.setState({open: true});
  }

  handleCheckoutSubmit(e) {
    e.preventDefault();
    const user = {address: this.state.address, zipcode: Number(this.state.zipcode), id: this.props.currentUser.id};
    const email = {email: this.state.email};
    if (Object.keys(this.props.currentUser).length) this.props.updateAddress(user);
    this.props.handlePurchase(this.state.email);
  }

  onChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }


  render() {
    const paperStyle={ marginBottom: "20px", marginTop:"20px"}

    return (

      <div>
        <Paper zDepth={2} style={paperStyle}>
          <form onSubmit={this.handleCheckoutSubmit} style={{marginLeft:"20px"}}>
            <TextField
              hintText="Address"
              floatingLabelText="Address"
              underlineShow={false}
              onChange={this.onChange}
              name="address"
              defaultValue={this.props.currentUser.address}
            />
            <Divider />
            <TextField
              hintText="Zipcode"
              floatingLabelText="Zipcode"
              underlineShow={false}
              onChange={this.onChange}
              name="zipcode"
              defaultValue={this.props.currentUser.zipcode}
            />
            <Divider />
            <TextField
              hintText="Email Address"
              floatingLabelText="Email"
              underlineShow={false}
              onChange={this.onChange}
              name="email"
              defaultValue={this.props.currentUser.email}
            />
            <Divider />
            <br />
            <RaisedButton type="submit" primary={true} label="Purchase" onClick={this.handleOpen} />
            <Dialog modal={false} open={this.state.open} modal={false} onClick={this.handleClose} >
              <RaisedButton onClick={this.props.handleKeepShopping} type="submit" label="Keep Shopping!" primary={true} />
            </Dialog>
            <br />
            <br />
          </form>
        </Paper>
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
    handlePurchase: function(email) {
      dispatch(checkoutCart(email))
      dispatch(fetchProducts())
    },

    handleKeepShopping: function() {
      ownProps.history.push('/')
    },

    updateAddress: function(user) {
      ownProps.history.push('/');
      dispatch(reviseUserAddress(user));
    }
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutContainer;
