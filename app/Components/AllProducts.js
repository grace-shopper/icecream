import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class AllProducts extends Component {

  constructor() {
    super();
    this.state = {
      allProducts: []
    }
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    axios.get(`/api/products`)
      .then(res => res.data)
      .then(allProducts => this.setState({
        allProducts
      }));
  }

  render() {
    const products = this.state.allProducts;
    return (
      <ul>
        {products && products.map( product => (
          <li key={product.id}>
            <NavLink to={`/products/${product.id}`}>
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
