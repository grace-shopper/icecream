import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import {fetchProducts, getProduct} from '../reducers';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productNames: []
    }
    this.getProductNames = this.getProductNames.bind(this);
  }

  /*
  This function will pull in all of our ice cream names so that
  the search can autocomplete when they type
  */
  getProductNames(products) {
  	let productNames = [];
		for(let i=0; i<products.length; i++) {
			productNames.push(products[i].title);
		}
		return productNames;
  };


  render() {
    const productNames = this.getProductNames(this.props.products)
    return (
      <div>
        <AutoComplete
          hintText="Type in a product name here"
          filter={AutoComplete.fuzzyFilter}
          dataSource={productNames}
          floatingLabelText="Search"
          fullWidth={true}
        />
        <br />
        <br />
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    products: state.products
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    handleClick: function(e) {
      dispatch(getProduct(e.value))
    }
  }
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Searchbar);

export default SearchContainer;
