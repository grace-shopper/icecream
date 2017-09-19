import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartRow from './CartRow';
import { connect } from 'react-redux';
import axios from 'axios';
import { editCart, removeItemFromCart, getCart } from '../reducers';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';



export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenQty: 1,
      disable: false
    }
    this.createInventoryArr = this.createInventoryArr.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
  }

  createInventoryArr(product) {
    let inventoryArr = [];
    for (let i = 1; i <= product.inventory; i++) {
      inventoryArr.push(i);
    }
    return inventoryArr;
  }

  purchaseHandler(e) {
    this.props.history.push(`/Checkout`);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      //checking product has been set from state to props -- error with .length off of null
      if(nextProps.cart.products) {
        for(var i=0; i<nextProps.cart.products.length; i++) {
          if(nextProps.cart.products[i].inventory < nextProps.cart.products[i].order_products.quantity) {
            return this.setState({disable: true});
          }
        }
        return this.setState({disable: false});
      }

    }
  }

  getTotalPrice() {
    const products = this.props.cart.products
    const priceArr = products && products.map((product) => {
      let semitotal = 0
      let quantity = product.order_products.quantity
      while (quantity) {
        semitotal = semitotal + Number(product.price)
        quantity--
      }
      return semitotal
    })

    const total = priceArr && priceArr.reduce((acc, price) => {
      return acc + price
    }, 0);

    return parseFloat(total).toFixed(2)
  }

  render() {
    const cartProducts = this.props.cart.products
    const CreateTable = (props) => {
      return (
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Quantity</TableHeaderColumn>
            <TableHeaderColumn>Options</TableHeaderColumn>
          </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {props.items && props.items.map((item, index) => {
                return <CartRow key={index} product={item} />
            })
            }
          </TableBody>
          <TableFooter style={{backgroundColor:'#F0F0F0', paddingBottom:'20px'}}>
            <TableRow>
              <TableRowColumn>
              </TableRowColumn>
              <TableRowColumn style={{textAlign: 'right'}}>
                <b>Total : ${this.getTotalPrice()}   </b>
                <RaisedButton type="submit" disabled={this.state.disable} label="Checkout" primary={true} onClick={this.purchaseHandler}/>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      )
    }

    return (
      <div>
        <Toolbar>
          <ToolbarTitle text="Shopping Cart" />
        </Toolbar>
          {
            (this.props.cart.products && this.props.cart.products.length === 0)
            ? <h4>There are no items in your cart</h4>
            : <CreateTable items={cartProducts} />
          }

      </div>
    )
  }

}

const mapStateToProps = function (state) {

  return {
    cart: state.cart,
    currentUser: state.currentUser,
    products: state.products
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    getCart: function() {
      dispatch(getCart());
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
