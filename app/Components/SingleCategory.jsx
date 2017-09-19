import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Category from './Category';

export class SingleCategory extends Component {
	constructor(props) {
		super(props);
		

	}

	

	render() {
        const products = this.props.products;
        

		return (
			<div className='all-products'>
        <Category />
        <div>
          {products && products.map( product => (
            <Card className='single-product col-lg-4 col-md-4 col-sm-4' key={product.id}>
              <br />
              <NavLink value={product.id} to={`/products/${product.id}`}>
                <CardMedia>
                  <img src={`/images/${product.imageName}`}
                      className='card-image'/>

                </CardMedia>
                <CardTitle title={product.title} subtitle={`Price: $${product.price}`} />
                <CardText>
                  { product.description }
                </CardText>
              </NavLink>
            </Card>
          ) )}
        </div>
      </div>
		)
	}

	
}



const mapStateToProps = (state, ownProps) => {
    
  const categoryId = Number(ownProps.match.params.categoryId)
  
  return {
    products: state.products.filter(product => {
    
       return product.categories.find(category => category.id === categoryId)
      
    }
      ),
    categories: state.categories
  }
}

const mapDispatchToProps = function (dispatch) {
  return {}
    
}


const SingleCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCategory);

export default SingleCategoryContainer;
