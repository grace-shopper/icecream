import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class AllProducts extends Component {

  constructor() {
    super();
    this.state = {
      AllProducts: []
    }
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    axios.get(`/api/products`)
      .then(res => res.data)
      .then(AllProducts => this.setState({
        AllProducts
      }));
  }

  render() {
    const products = this.state.AllProducts;
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
