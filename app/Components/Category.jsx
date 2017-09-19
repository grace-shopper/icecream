import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


class Category extends Component {
  render() {
    const categories = this.props.categories;
    const size = 12 / categories.length
    return (
      <div className="table">
        <table>
          <tbody>
          <tr>
            <th>
            <NavLink  to={`/products`}> 
              All
            </NavLink>  
            </th>
          {categories && categories.map( category => (
            <th  key={category.id}>
              <NavLink value={category.id} to={`/categories/${category.id}`}>
               {category.name}  
              </NavLink>
            </th>
          ) )}
          
          </tr>
          </tbody>
        </table>
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