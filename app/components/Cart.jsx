import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { editCart, removeItemFromCart } from '../reducers';
export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenQty: 1
    }
    this.createInventoryArr = this.createInventoryArr.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.getTotalPrice = this.getTotalPrice.bind(this)
  }

  createInventoryArr(product) {
    let inventoryArr = [];
    for (let i = 1; i <= product.inventory; i++) {
      inventoryArr.push(i);
    }
    return inventoryArr;
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

    return total
  }

  componentDidMount() {
    // get ID

  };

  render() {
    const products = this.props.cart.products

    return (
      <div>
        <h3>Shopping Cart</h3>
        <div>

          {products && products.length > 0 && (
            <ul>
              {products.map(product => (
                <li key={product.id}>
                  <table className='table'>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Edit</th>
                      </tr>
                      <tr>
                        <th>{product.title}</th>
                        <th>{product.price}</th>

                        <th>

                          <form
                            id={product.id}
                            onSubmit={this.handleSubmit}>
                            <div >


                              <select
                                className="form-control"
                                name="qty"
                                defaultValue={product.order_products.quantity}
                                onChange={this.handleChange}>
                                {
                                  this.createInventoryArr(product).map(num => {
                                    return (
                                      <option key={num} value={num} >{num}</option>
                                    )
                                  })
                                }
                              </select>

                            </div>
                            <div >
                              <button type="submit"
                                className="btn btn-success">
                                Update
                        </button>

                            </div>
                          </form>


                        </th>
                        <th>
                          <button type="submit"
                            className="btn btn-success"
                            id={product.id}
                            onClick={this.handleRemove}>
                            Remove
                    </button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div>

                  </div>
                </li>
              ))}
            </ul>
          )}
          {products && products.length === 0 && (
            <div >Cart is empty</div>
          )}
          <div >Total: ${this.getTotalPrice()} </div>
          <button type="submit"
            className="btn btn-success"
          >
            <NavLink to="/Checkout">Checkout</NavLink>

          </button>
        </div>
      </div>
    )
  }

  handleChange(event) {
    this.setState({ chosenQty: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    const currentProductId = event.target.id

    this.props.editCart(currentProductId, this.state.chosenQty)
  }

  handleRemove(event) {
    event.preventDefault();
    const currentProductId = event.target.id
    this.props.removeItemFromCart(currentProductId)
  }

}

const mapStateToProps = function (state) {

  return {
    cart: state.cart,
    currentUser: state.currentUser

  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    editCart: function (productId, qty) {
      dispatch(editCart(productId, qty))
    },
    removeItemFromCart: function (productId) {
      dispatch(removeItemFromCart(productId))
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
