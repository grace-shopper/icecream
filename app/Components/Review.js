import React, { Component } from 'react';

import {fetchProducts, getProduct} from '../reducers';


export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews = [];
    }
  }

  render() {
    return (
      <div>
        <p> This is a review </p>
      </div>
    )
  }

}
