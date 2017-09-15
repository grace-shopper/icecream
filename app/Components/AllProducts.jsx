import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {Card, CardActions, CardMedia, CardTitle, CardText, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import {fetchProducts, getProduct} from '../reducers';



export class AllProducts extends Component {

  render() {

    const products = this.props.products;
    const style = {minHeight: "150px", maxHeight: "200px"}
    return (
      <div className='all-products'>
        {products && products.map( product => (
          <Card key={product.id} className='single-product col-lg-4 col-md-4 col-sm-4'>
            <CardHeader
              title={product.title}
              subtitle={`Price: $${product.price}`}
              showExpandableButton={true}
              style={style}
            />
            <br />
            <CardText>
                  { product.description }
                </CardText>
            <NavLink onClick = {this.props.handleClick} value={product.id} to={`/products/${product.id}`}>
              <CardMedia>
                <img src={`/images/${product.imageName}`}
                    alt={`tasty image for ${product.title}`}
                    className='card-image'/>
              </CardMedia>
              <CardActions>
                <FlatButton label="Add to Cart" className='buy-button'/>
              </CardActions>
            </NavLink>
          </Card>
        ) )}

      </div>
    )
  }
}


const mapStateToProps = function (state) {
  return {
    products: state.products,
    currentUser: state.currentUser
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
