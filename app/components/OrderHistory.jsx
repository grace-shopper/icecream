import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'; 
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
    const orders = this.props.orders.filter(order => {return order.status !== 'In Cart'});
    const purchases = []; 
    for(let i=0; i<orders.length; i++){
      let order = orders[i]; 
      for(let j=0; j<order.products.length; j++) {
        order.products[j].status = order.status; 
        order.products[j].purchasedAt = order.purchasedAt; 
        purchases.push(order.products[j]); 
      }
    }  
    const CreateTable = (props) => {
      return (
        <Table> 
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}> 
          <TableRow selectable={false}> 
            <TableHeaderColumn> Name </TableHeaderColumn> 
            <TableHeaderColumn> Original Price </TableHeaderColumn> 
            <TableHeaderColumn> Description </TableHeaderColumn> 
            <TableHeaderColumn> Quantity </TableHeaderColumn> 
            <TableHeaderColumn> Total Price </TableHeaderColumn> 
            <TableHeaderColumn> Status </TableHeaderColumn> 
            <TableHeaderColumn> Purchased On </TableHeaderColumn> 
          </TableRow> 
          </TableHeader> 
          <TableBody displayRowCheckbox={false}> 
            {props.purchases && props.purchases.map(product => {
              return (<TableRow> 
                <TableRowColumn><NavLink to={`/products/${product.id}`}>{product.title}</NavLink></TableRowColumn> 
                <TableRowColumn>{product.order_products.originalPrice}</TableRowColumn> 
                <TableRowColumn>{product.description}</TableRowColumn>
                <TableRowColumn>{product.order_products.quantity}</TableRowColumn>
                <TableRowColumn>{product.order_products.quantity * product.order_products.originalPrice} </TableRowColumn>
                <TableRowColumn>{product.status}</TableRowColumn>
                <TableRowColumn>{product.purchasedAt}</TableRowColumn>
                
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
       <Toolbar>
        <ToolbarTitle text="Order History" />
       </Toolbar> 
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
