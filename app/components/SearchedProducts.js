import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export default class SearchedProducts extends Component {
  render() {
    const showProducts = this.props.filteredProducts;
    console.log('SHOWING PRODUCTS...', showProducts, typeof showProducts)
    return (
      <div className='all-products'>
        <div>
          {showProducts && showProducts.map( product => (
            <Card className='single-product col-lg-4 col-md-4 col-sm-4' key={product.id}>
              <br />
              <NavLink value={product.id} to={`/products/${product.id}`}>
                <CardMedia>
                  <img src={`/images/${product.imageName}`}
                      alt={`tasty image for ${product.title}`}
                      className='card-image'/>
                </CardMedia>
                <CardTitle title={product.title} subtitle={`Price: $${product.price}`} />
                <CardText>
                  { product.description }
                </CardText>
                <CardActions>
                  <FlatButton label="Add to Cart" className='buy-button'/>
                </CardActions>
              </NavLink>
            </Card>
          ) )}
        </div>
      </div>
    )
  }
}
