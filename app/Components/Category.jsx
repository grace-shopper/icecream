import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class Category extends Component {
  render() {
    const categories = this.props.categories;
    
    return (
      <div className='all-products'>
        <div>
          {categories && categories.map( category => (
            <Card className='single-category col-lg-4 col-md-4 col-sm-4' key={category.id}>
              <br />
              <NavLink value={category.id} to={`/categories/${category.id}`}>
                
                <CardTitle title={category.name} />
                
              </NavLink>
            </Card>
          ) )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = function (state) {
  return {
   
    categories: state.categories
  }
}

const mapDispatchToProps = function (dispatch) {
  return {}
    
}

const CategoryContainer = connect(mapStateToProps, mapDispatchToProps)(Category);

export default CategoryContainer;