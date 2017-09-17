import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'; 

import {fetchOrders, getUser} from '../reducers';

export class OrderHistory extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // will change this so get user from store
    const userId = this.props.currentUser.id; 
    console.log("orderhistory userid", userId); 
    //const userId = this.props.currentUser.id;
    this.props.getOrders(userId); 

  };

  render() {
    const orders = this.props.orders.filter(order => {return order.status === 'Purchased'});
    const purchases = []; 
    for(let i=0; i<orders.length; i++){
      let order = orders[i]; 
      for(let j=0; j<order.products.length; j++) {
        purchases.push(order.products[j]); 
      }
    } 
    console.log("users orders", orders); 
    console.log(purchases); 
    const CreateTable = (props) => {
      console.log("in table create", props); 
      return (
        <Table> 
          <TableHeader> 
          <TableRow selectable={false}> 
            <TableHeaderColumn> Name </TableHeaderColumn> 
            <TableHeaderColumn> Price </TableHeaderColumn> 
            <TableHeaderColumn> Description </TableHeaderColumn> 
          </TableRow> 
          </TableHeader> 
          <TableBody> 
            {props.purchases && props.purchases.map(product => {
              return (<TableRow> 
                <TableRowColumn>{product.title}</TableRowColumn> 
                <TableRowColumn>{product.price}</TableRowColumn> 
                <TableRowColumn>{product.description}</TableRowColumn> 
              </TableRow> 
              )
            })
            }
          </TableBody> 
        </Table> 
      ) 
    }
  	return (
      <div>
        <h2>Order History</h2>
      <ul>
        {
          (orders.length === 0) 
          ? <h4>There are no orders</h4> 
          : <CreateTable purchases={purchases} /> 
        }
      </ul>
      </div>
    )
  }

}

const mapStateToProps = function (state) {
  return {
    orders: state.orders,
    cart: state.cart, 
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
