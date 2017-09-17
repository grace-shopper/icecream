import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {fetchOrders, getUser} from '../reducers';

export class OrderHistory extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // will change this so get user from store
    const userId = this.props.currentUser.id; 
    //const userId = this.props.currentUser.id;
    this.props.getOrders(userId)

  };

  render() {
    const orders = this.props.orders;
  	return (
      <div>
        <h2>Order History</h2>
      <ul>
        {this.props.orders && this.props.orders.map( order => (
          <li key={order.id}>
            <h4>Order on {order.purchasedAt}</h4>
            <ul>
            {order.products.map(product => {
              return (
                <li key={order.id + ',' + product.id}>
              <h2> { product.title } </h2>
              <img src={`/images/${product.imageName}`} alt={`tasty image for ${product.title}`}/>
              <p>  { product.description } </p>
              <p>  Price: { product.order_products.originalPrice } </p>
              <p>  Quantity: {product.order_products.quantity} </p>
              </li>
              )
            }
            )}
          </ul>
          </li>
        ) )}
      </ul>
      </div>
    )
  }

}

const mapStateToProps = function (state) {
  return {
    orders: state.orders,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    // updateCurrentUser: function(userId) {
    //   return dispatch(getUser(userId))
    // },
    getOrders: function(userId) {
      return dispatch(fetchOrders(userId))
    }
  }
}

const OrderHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

export default OrderHistoryContainer;
