import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {fetchProducts, getProduct} from '../reducers';

export class AllProducts extends Component {

  render() {
    const products = this.props.products;
    console.log('products', products)
    return (
      <ul>
        {products && products.map( product => (
          <li key={product.id}>
            <NavLink onClick = {this.props.handleClick} value={product.id} to={`/products/${product.id}`}>
              <h2> { product.title } </h2>
              <img src={`/images/${product.imageName}`} alt={`tasty image for ${product.title}`}/>
              <p>  { product.description } </p>
              <p>  Price: { product.price } </p>
            </NavLink>
          </li>
        ) )}
      </ul>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    products: state.products,
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    handleClick: function(e) {
      dispatch(getProduct(e.value))
    }
  }
}

const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(AllProducts);

export default ProductsContainer;
