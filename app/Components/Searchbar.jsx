import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import {fetchProducts, getProduct} from '../reducers';
import RaisedButton from 'material-ui/RaisedButton';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productNames: [],
      query: ''
    }
    this.getProductNames = this.getProductNames.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateQuery(evt){
		const query = evt.target.value
		this.setState({
			query: query
		})
    console.log('query is ...', this.state.query)
	}
  handleSubmit(evt){
    evt.preventDefault()
    console.log('pressed submit!! and query is...', this.state.query)
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
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <AutoComplete
            hintText="Type in a product name here"
            type="text"
            value = { this.state.query }
            onChange = { this.updateQuery }
            filter={ AutoComplete.fuzzyFilter }
            dataSource={productNames}
            floatingLabelText="Search"
            fullWidth={ true }
          />
          <RaisedButton label="GO" primary={true}/>
        </form>
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
