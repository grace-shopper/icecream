import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import {fetchProducts, getProduct} from '../reducers';
import RaisedButton from 'material-ui/RaisedButton';
import SearchedProducts from './SearchedProducts';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productNames: [],
      query: ''
    }
    this.getProductNames = this.getProductNames.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
  }

  handleUpdateInput(query) {
    this.setState({
      query: query
    });
  }

  handleNewRequest() {
    this.setState({
      query: ''
    });
  }

  clearQuery() {
    this.setState({
      query: ''
    })
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
    const filteredProducts = this.props.products.filter(
              product => product.title.match(this.state.query));
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <AutoComplete
            hintText="Type in a product name here"
            filter={ AutoComplete.fuzzyFilter }
            dataSource={ productNames }
            floatingLabelText="Search"
            searchText={this.state.query}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            fullWidth={ true }
          />
        </form>
        {
          filteredProducts.length !== this.props.products.length && (
            <div className='showing-search-results'>
              <span>Now showing {filteredProducts.length} of {this.props.products.length} total</span>
              <button onClick={this.clearQuery}>Show all</button>
            </div>
          )
        }
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
    // do nothing for now
  }
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Searchbar);

export default SearchContainer;
